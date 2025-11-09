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

const CreateActivity = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("Tutoring help");
  const [location, setLocation] = useState("Bat 620");
  const [date, setDate] = useState(null);
  const [startTimeStr, setStartTimeStr] = useState("16:00");
  const [endTimeStr, setEndTimeStr] = useState("18:00");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("Please help with tutoring !");
  const [selectedTags, setSelectedTags] = useState([]);

  const [imagePreview, setImagePreview] = useState(placeholder);
  const [imageDataUrl, setImageDataUrl] = useState("");

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setImagePreview(String(dataUrl));
      setImageDataUrl(String(dataUrl));
    };
    reader.readAsDataURL(file);
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

  const handleCreateActivity = async () => {
    const organizerId = Number(localStorage.getItem("userId"));
    if (!organizerId) {
      console.error("No organizerId in localStorage. Make sure you set userId after login/register.");
      setSnackbar({ open: true, message: "Please sign in again.", severity: "error" });
      return;
    }

    const startTime = buildDateTime(date, startTimeStr);
    const endTime = buildDateTime(date, endTimeStr);

    const payload = {
      title,
      description,
      location,
      imageUrl: imageDataUrl || "",
      startTime,
      endTime,
      capacity: capacity ? Number(capacity) : null,
      organizerId,
      tags: selectedTags,
    };

    try {
      const res = await fetch("http://localhost:8080/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create activity");

      setSnackbar({ open: true, message: "Activity created successfully!", severity: "success" });
      setTimeout(() => navigate("/viewActivities"), 1200);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to create activity", severity: "error" });
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
