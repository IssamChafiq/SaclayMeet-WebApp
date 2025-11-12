import './CreateActivity.css';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import placeholder from "../assets/placeholder.png";
import NavButtons from "../components/NavButtons";

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

// Must match backend enum names exactly
const ALL_TAGS = ["Study", "Party", "Outing", "Movie", "Games", "Sport", "Cultural"];

// limits for client-side image handling
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_DIM = 1920;

const dataUrlSizeBytes = (dataUrl) => {
  if (!dataUrl) return 0;
  const comma = dataUrl.indexOf(',');
  const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  return Math.floor((b64.length * 3) / 4);
};

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error("Failed to read file"));
    fr.onload = () => resolve(String(fr.result || ""));
    fr.readAsDataURL(file);
  });

const downscaleImageDataUrl = (dataUrl, mime, maxDim = MAX_DIM, jpegQuality = 0.85) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      if (Math.max(width, height) > maxDim) {
        const ratio = width > height ? maxDim / width : maxDim / height;
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const isPng = mime?.startsWith('image/png');
      let out;
      try {
        out = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : jpegQuality);
      } catch {
        out = dataUrl; // fallback
      }
      resolve(out);
    };
    img.onerror = () => reject(new Error("Invalid image data"));
    img.src = dataUrl;
  });

const CreateActivity = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [startTimeStr, setStartTimeStr] = useState("16:00");
  const [endTimeStr, setEndTimeStr] = useState("18:00");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [imagePreview, setImagePreview] = useState(placeholder);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const openSnack = (message, severity = 'error') =>
    setSnackbar({ open: true, message, severity });

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      openSnack("Only PNG/JPG images are allowed.");
      return;
    }

    try {
      // read original
      let dataUrl = await readFileAsDataURL(file);
      // pass through canvas to cap dimensions and size
      dataUrl = await downscaleImageDataUrl(dataUrl, file.type, MAX_DIM, 0.85);
      // if still huge and not PNG, try stronger JPEG
      if (dataUrlSizeBytes(dataUrl) > MAX_BYTES && !file.type.startsWith('image/png')) {
        dataUrl = await downscaleImageDataUrl(dataUrl, 'image/jpeg', MAX_DIM, 0.7);
      }
      if (dataUrlSizeBytes(dataUrl) > MAX_BYTES) {
        openSnack("Image still larger than 10MB after compression. Pick a smaller one.");
        return;
      }

      setImagePreview(dataUrl);
      setImageDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
      openSnack("Failed to process image.");
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const buildDateTime = (d, hhmm) => {
    if (!d || !hhmm) return null;
    const day = d.format("YYYY-MM-DD");
    const time = `${hhmm}:00`;
    return `${day}T${time}`;
  };

  // Try to upload the base64 to backend image endpoint.
  // If the endpoint doesn't exist or fails, return null so we proceed without image.
  const uploadImageIfPossible = async () => {
    if (!imageDataUrl || !imageDataUrl.startsWith("data:image")) return null;

    try {
      const resp = await fetch("http://localhost:8080/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl: imageDataUrl })
      });

      if (!resp.ok) {
        // Show but don't block activity creation
        const txt = await resp.text();
        openSnack(`Image upload failed: ${txt || resp.status}`, 'warning');
        return null;
      }

      const payload = await resp.json(); // { id, url }
      return payload?.url || null;
    } catch (e) {
      openSnack(`Image upload failed: ${e?.message || 'network'}`, 'warning');
      return null;
    }
  };

  const handleCreateActivity = async () => {
    const organizerId = Number(sessionStorage.getItem("userId"));
    if (!organizerId) {
      openSnack("Please sign in again.");
      return;
    }

    if (!title.trim()) return openSnack("Title is required.");
    if (!location.trim()) return openSnack("Place is required.");
    if (!date) return openSnack("Date is required.");
    if (!startTimeStr || !endTimeStr) return openSnack("Start and end time are required.");

    const startTime = buildDateTime(date, startTimeStr);
    const endTime = buildDateTime(date, endTimeStr);

    try {
      // 1) Try to upload image (non-blocking)
      const shortUrl = await uploadImageIfPossible();

      // 2) Build payload. If image upload failed, send empty imageUrl to avoid DB column limit
      const payload = {
        title,
        description,
        location,
        imageUrl: shortUrl || "", // IMPORTANT: never send huge data URLs
        startTime,
        endTime,
        capacity: capacity ? Number(capacity) : null,
        organizerId,
        tags: selectedTags,
      };

      // 3) Create activity
      const res = await fetch("http://localhost:8080/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // surface real backend error for debugging
        const msg = await res.text();
        throw new Error(msg || "Failed to create activity");
      }

      setSnackbar({ open: true, message: "Activity created successfully!", severity: "success" });
      setTimeout(() => navigate("/viewActivities"), 800);
    } catch (err) {
      console.error(err);
      openSnack(String(err.message || "Failed to create activity"));
    }
  };

  const handleCloseSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  return (
    <ThemeProvider theme={theme}>
      <div className="create-activity">
        {/* Header */}
        <div className="header">
          <div className="logo-box">
            <img
              className="logo-saclay-meet"
              alt="Logo saclay meet"
              src={logoSaclayMeet1}
              onClick={() => navigate("/viewActivities")}
            />
          </div>
          
          <NavButtons
            name1="Profile" 
            name2="View activities" 
            name3="Create activity" 
            path1="/userProfile" 
            path2="/viewActivities" 
            path3="/createActivity" 
            current="third"
            inline={true}
          />
        </div>

        {/* Content */}
        <div className="main-content">
          <div className="content-wrapper">
            {/* Image upload */}
            <div className="image-upload-container">
              <img className="image-placeholder" src={imagePreview} alt="Activity preview" />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload-input"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload-input">
                <Button variant="contained" color="salmon" component="span" className="upload-button">
                  Upload Image
                </Button>
              </label>
            </div>

            {/* Form */}
            <div className="form-container">
              <div className="form-section">
                <TextField
                  label="Title"
                  fullWidth
                  variant="outlined"
                  placeholder="Tutoring help"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                  label="Place"
                  fullWidth
                  variant="outlined"
                  placeholder="Bat 620"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>

                <TextField
                  label="Event time start"
                  fullWidth
                  variant="outlined"
                  type="time"
                  value={startTimeStr}
                  onChange={(e) => setStartTimeStr(e.target.value)}
                />

                <TextField
                  label="Event time end"
                  fullWidth
                  variant="outlined"
                  type="time"
                  value={endTimeStr}
                  onChange={(e) => setEndTimeStr(e.target.value)}
                />

                <TextField
                  label="Capacity (optional)"
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />

                <TextField
                  label="Description"
                  variant="outlined"
                  placeholder="Please help with tutoring !"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </div>
            </div>

            {/* Tags sidebar */}
            <div className="tags-container">
              <h2 className="tags-title">Tags :</h2>
              <div className="filter-category">
                {ALL_TAGS.map((tag) => (
                  <FormControlLabel
                    key={tag}
                    control={
                      <Checkbox
                        color="salmon"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                    }
                    label={tag}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create button */}
        <div className="button-container">
          <Button
            variant="contained"
            color="salmon"
            className="create-button"
            onClick={handleCreateActivity}
          >
            Create activity
          </Button>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default CreateActivity;
