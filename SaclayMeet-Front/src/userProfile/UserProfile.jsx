import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './UserProfile.css';
import NavButtons from '../components/NavButtons';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Facebook, Instagram, Linkedin, Camera } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

function getAgeFromBirthDate(birthDateStr) {
  if (!birthDateStr) return "";
  const today = new Date();
  const [y,m,d] = birthDateStr.split("-").map(Number);
  const bd = new Date(y, (m||1)-1, d||1);
  let age = today.getFullYear() - bd.getFullYear();
  const mm = today.getMonth() - bd.getMonth();
  if (mm < 0 || (mm === 0 && today.getDate() < bd.getDate())) age--;
  return String(age);
}

const UserProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    firstName: "", lastName: "", email: "",
    birthDate: "", schoolName: "", level: "", bio: "",
    facebook: "", instagram: "", snapchat: "", linkedin: "",
    profileImageUrl: null,
  });

  const [imagePreview, setImagePreview] = useState(null);   // dataUrl or server URL
  const [imageDataUrl, setImageDataUrl] = useState("");     // new image (if chosen)
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          birthDate: data.birthDate || "",
          schoolName: data.schoolName || "",
          level: data.level || "",
          bio: data.bio || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          snapchat: data.snapchat || "",
          linkedin: data.linkedin || "",
          profileImageUrl: data.profileImageUrl || null
        });
        setImagePreview(data.profileImageUrl || null);
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' }));
  }, []);

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result);
      setImagePreview(dataUrl);
      setImageDataUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    const payload = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      birthDate: profileData.birthDate || "",
      schoolName: profileData.schoolName,
      level: profileData.level,
      bio: profileData.bio,
      facebook: profileData.facebook,
      instagram: profileData.instagram,
      snapchat: profileData.snapchat,
      linkedin: profileData.linkedin
    };

    try {
      // 1) Update plain fields
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text() || 'Failed to update profile');
      const updated = await res.json();

      // 2) If new image was chosen, upload it as data URL (same pattern as activities)
      if (imageDataUrl) {
        const ir = await fetch(`http://localhost:8080/api/users/${userId}/profile-image`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl: imageDataUrl })
        });
        if (!ir.ok) throw new Error(await ir.text() || 'Failed to update profile image');
        const imgResp = await ir.json();
        updated.profileImageUrl = imgResp.profileImageUrl || null;
      }

      setProfileData(prev => ({ ...prev, ...updated }));
      setImageDataUrl("");
      setIsEditing(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Failed to update profile', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

  const handleDisconnect = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  const age = getAgeFromBirthDate(profileData.birthDate);

  return (
    <ThemeProvider theme={theme}>
      <div className="profile-page">
        <div className="header">
          <div className="logo-box">
            <img className="logo-saclay-meet" alt="Logo saclay meet"
                 src={logoSaclayMeet1}
                 onClick={() => navigate("/viewActivities")} />
          </div>
          <NavButtons
            name1="Profile" name2="View activities" name3="Create activity"
            path1="/userProfile" path2="/viewActivities" path3="/createActivity"
            current="first" inline={true}
          />
        </div>

        <div className="profile-content">
          <NavButtons
            name1="Profile" name2="Activities created" name3="Upcoming activities"
            path1="/userProfile" path2="/activitiesCreated" path3="/upcomingActivities"
            current="first" inline={false}
          />

          <div className="profile-main">
            <div className="profile-header">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <Avatar sx={{ width: 100, height: 100 }} />
              )}

              {isEditing && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onPickFile}
                  />
                  <Button
                    variant="outlined" color="salmon" size="small"
                    onClick={() => fileInputRef.current?.click()}
                    sx={{ mt: 1 }} startIcon={<Camera size={18} />}
                  >
                    Change photo
                  </Button>
                </>
              )}

              <h1 className="profile-name">{profileData.firstName} {profileData.lastName}</h1>
              <p className="profile-email">{profileData.email}</p>
            </div>

            <div className="profile-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">First name</label>
                  <TextField fullWidth variant="outlined" value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    disabled={!isEditing} />
                </div>
                <div className="form-field">
                  <label className="field-label">Last name</label>
                  <TextField fullWidth variant="outlined" value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    disabled={!isEditing} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">Email</label>
                  <TextField fullWidth variant="outlined" value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing} />
                </div>
                <div className="form-field">
                  <label className="field-label">{isEditing ? 'Birth Date' : 'Age'}</label>
                  {isEditing ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={profileData.birthDate ? dayjs(profileData.birthDate) : null}
                        onChange={(v) => setProfileData({ ...profileData, birthDate: v ? v.format('YYYY-MM-DD') : '' })}
                        slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                      />
                    </LocalizationProvider>
                  ) : (
                    <TextField fullWidth variant="outlined" value={age} disabled />
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">School</label>
                  <TextField fullWidth variant="outlined" value={profileData.schoolName}
                    onChange={(e) => setProfileData({ ...profileData, schoolName: e.target.value })}
                    disabled={!isEditing} />
                </div>
                <div className="form-field">
                  <label className="field-label">Level</label>
                  <TextField fullWidth variant="outlined" value={profileData.level}
                    onChange={(e) => setProfileData({ ...profileData, level: e.target.value })}
                    disabled={!isEditing} />
                </div>
              </div>

              <div className="bio-section">
                <label className="field-label">Bio</label>
                <TextField fullWidth multiline rows={4} variant="outlined" value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing} />
              </div>

              <div className="social-section">
                <div className="social-row">
                  <div className="social-field">
                    <Facebook size={24} className="social-icon" />
                    <TextField fullWidth variant="outlined" value={profileData.facebook}
                      onChange={(e) => setProfileData({ ...profileData, facebook: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                  <div className="social-field">
                    <Instagram size={24} className="social-icon" />
                    <TextField fullWidth variant="outlined" value={profileData.instagram}
                      onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                </div>
                <div className="social-row">
                  <div className="social-field">
                    <TextField fullWidth label="Snapchat" variant="outlined" value={profileData.snapchat}
                      onChange={(e) => setProfileData({ ...profileData, snapchat: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                  <div className="social-field">
                    <Linkedin size={24} className="social-icon" />
                    <TextField fullWidth variant="outlined" value={profileData.linkedin}
                      onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <Button color="salmon" variant="contained" size="large" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                  <Button color="salmon" variant="outlined" size="large"
                          onClick={() => { setIsEditing(false); setImageDataUrl(""); setImagePreview(profileData.profileImageUrl || null); }}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button color="salmon" variant="contained" size="large" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}

              <Button color="error" variant="contained" size="large" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onPickFile} />
      </div>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default UserProfile;
