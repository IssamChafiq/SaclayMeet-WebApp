import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import 'dayjs/locale/fr';
import ProfilePhoto from '../components/ProfilePhoto';

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

  const [profileData, setProfileData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    schoolName: "",
    level: "",
    bio: "",
    facebook: "",
    snapchat: "",
    instagram: "",
    linkedin: "",
    profileImageUrl: "", // data URL / http(s) / /api/images/..
  });

  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setProfileData(prev => ({
          ...prev,
          ...data,
          profileImageUrl: data.profileImageUrl || ""
        }));
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to load profile', severity: 'error' }));
  }, []);

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
      linkedin: profileData.linkedin,
      profileImageUrl: profileData.profileImageUrl || "", // key: send image string
    };

    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let msg = 'Failed to update profile';
        try {
          const t = await res.text();
          if (t) msg = t;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      sessionStorage.setItem("userName", `${data.firstName || ""} ${data.lastName || ""}`.trim());
      setProfileData(prev => ({
        ...prev,
        ...data,
        profileImageUrl: data.profileImageUrl || ""
      }));
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
  const initials =
    `${(profileData.firstName || "?")[0] || ""}${(profileData.lastName || "")[0] || ""}`.toUpperCase();

  return (
    <ThemeProvider theme={theme}>
      <div className="profile-page">
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
            current="first"
            inline={true}
          />
        </div>

        <div className="profile-content">
          <NavButtons
            name1="Profile"
            name2="Activities created"
            name3="Upcoming activities"
            path1="/userProfile"
            path2="/activitiesCreated"
            path3="/upcomingActivities"
            current="first"
            inline={false}
          />

          <div className="profile-main">
            <div className="profile-header">
              {/* Drop-in reusable photo picker/display (mirrors activity behavior) */}
              <ProfilePhoto
                value={profileData.profileImageUrl}
                onChange={(val) => setProfileData(prev => ({ ...prev, profileImageUrl: val || "" }))}
                editable={isEditing}
                size={110}
                initials={initials}
              />

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
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
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

              {/* Socials kept as requested */}
              <div className="social-section">
                <div className="social-row">
                  <div className="social-field">
                    <Facebook size={24} className="social-icon" color="#1877F2" />
                    <TextField fullWidth variant="outlined" value={profileData.facebook}
                      onChange={(e) => setProfileData({ ...profileData, facebook: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                  <div className="social-field">
                    <Instagram size={24} className="social-icon" color="#E4405F" />
                    <TextField fullWidth variant="outlined" value={profileData.instagram}
                      onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                </div>

                <div className="social-row">
                  <div className="social-field">
                    <Camera size={24} className="social-icon" color="#FFFC00" />
                    <TextField fullWidth variant="outlined" value={profileData.snapchat}
                      onChange={(e) => setProfileData({ ...profileData, snapchat: e.target.value })}
                      disabled={!isEditing} />
                  </div>
                  <div className="social-field">
                    <Linkedin size={24} className="social-icon" color="#0A66C2" />
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
                  <Button color="salmon" variant="outlined" size="large" onClick={() => setIsEditing(false)}>
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
