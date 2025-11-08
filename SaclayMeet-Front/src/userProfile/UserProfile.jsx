import { useState, useEffect } from 'react';
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
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Camera } from 'lucide-react'; // Pour Snapchat (pas d'icône officielle)
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // importer la locale française

let theme = createTheme({});

theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#6E003C',
      },
      name: 'salmon',
    }),
  },
});

// petite fonction utilitaire pour calculer l'âge à partir de birthDate ("YYYY-MM-DD")
function getAgeFromBirthDate(birthDateStr) {
  if (!birthDateStr) return "";
  const today = new Date();
  const [year, month, day] = birthDateStr.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return String(age);
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
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
    linkedin: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success' | 'error' | 'warning' | 'info', success par défaut
  });

  // aller chercher l'utilisateur dans le back dès que la page charge
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        // stocker la réponse dans le state pour afficher dans l'UI
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          birthDate: data.birthDate || "",
          schoolName: data.schoolName || "",
          level: data.level || "",
          bio: data.bio || "",
          facebook: "empty for now",
          snapchat: "empty for now",
          instagram: "empty for now",
          linkedin: "empty for now"
        });
      });
  }, []); // [] = ne le faire qu'une seule fois au chargement

  const handleSaveProfile = async () => {
    const userId = localStorage.getItem("userId");
    
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) throw new Error('Server error');
      
      const data = await response.json();
      localStorage.setItem("userName", `${data.firstName} ${data.lastName}`);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error:', err);
      setSnackbar({
        open: true,
        message: 'Failed to update profile',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDisconnect = () => {
    // effacer les données de session
    localStorage.removeItem("userId");
    // rediriger vers la page d'accueil
    navigate("/");
  };

  const age = getAgeFromBirthDate(profileData.birthDate);

  return (
    <ThemeProvider theme={theme}>
      <div className="profile-page">
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
            path2="/ViewActivities" 
            path3="/createActivity" 
            current="first"
            inline={true}
          />
        </div>

        <div className="profile-content">
          {/* Navigation sidebar */}
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

          {/* Main content */}
          <div className="profile-main">
            {/* Avatar section */}
            <div className="profile-header">
              <Avatar
                className="profile-avatar"
                alt={`${profileData.firstName} ${profileData.lastName}`}
                sx={{ width: 100, height: 100 }}
              />
              <h1 className="profile-name">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
            </div>

            {/* Form fields */}
            <div className="profile-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">First name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={profileData.firstName}
                    className="input-field"
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Last name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={profileData.lastName}
                    className="input-field"
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">Email</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={profileData.email}
                    className="input-field"
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">
                    {isEditing ? 'Birth Date' : 'Age'}
                  </label>
                  {isEditing ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                      <DatePicker
                        value={profileData.birthDate ? dayjs(profileData.birthDate) : null}
                        onChange={(newValue) => {
                          setProfileData({
                            ...profileData,
                            birthDate: newValue ? newValue.format('YYYY-MM-DD') : ''
                          });
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: 'outlined',
                            className: 'input-field'
                          }
                        }}
                      />
                    </LocalizationProvider>
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={age}
                      className="input-field"
                      disabled={!isEditing}
                    />
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">School</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={profileData.schoolName}
                    className="input-field"
                    onChange={(e) => setProfileData({ ...profileData, schoolName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Level</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={profileData.level}
                    className="input-field"
                    onChange={(e) => setProfileData({ ...profileData, level: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="bio-section">
                <label className="field-label">Bio</label>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={profileData.bio}
                  className="input-field"
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              {/* Social media links */}
              <div className="social-section">
                <div className="social-row">
                  <div className="social-field">
                    <Facebook size={24} className="social-icon" color="#1877F2" />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.facebook}
                      className="input-field"
                      onChange={(e) => setProfileData({ ...profileData, facebook: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="social-field">
                    <Instagram size={24} className="social-icon" color="#E4405F" />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.instagram}
                      className="input-field"
                      onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="social-row">
                  <div className="social-field">
                    <Camera size={24} className="social-icon" color="#FFFC00" />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.snapchat}
                      className="input-field"
                      onChange={(e) => setProfileData({ ...profileData, snapchat: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="social-field">
                    <Linkedin size={24} className="social-icon" color="#0A66C2" />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.linkedin}
                      className="input-field"
                      onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons Edit Profile et Disconnect */}
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <Button
                    color="salmon"
                    variant="contained"
                    size="large"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                  <Button
                    color="salmon"
                    variant="outlined"
                    size="large"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  color="salmon"
                  variant="contained"
                  size="large"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
              
              <Button
                color="error"
                variant="contained"
                size="large"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default UserProfile;
