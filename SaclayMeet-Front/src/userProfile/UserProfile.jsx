import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './UserProfile.css';
import NavButtons from '../components/NavButtons';

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
  // state qui contiendra les vraies infos venant du back
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    schoolName: "",
    level: "",
    bio: "",
    // réseaux sociaux pas encore dans le back, donc on les garde vides
    facebook: "",
    snapchat: "",
    instagram: "",
    linkedin: ""
  });

  // aller chercher l'utilisateur dans le back dès que la page charge
  useEffect(() => {
    // 1. récupérer l'id stocké après register / login
    const userId = localStorage.getItem("userId");

    // 2. appeler le backend pour récupérer les infos de cet utilisateur
    //    correspond à GET /api/users/{id} dans ton UserController
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        // 3. stocker la réponse dans le state pour afficher dans l'UI
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
          linkedin: "mepty for now"
        });
      });
  }, []); // [] = ne le faire qu'une seule fois au chargement

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
                    // readOnly UI for now
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
                    disabled={true}
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Age</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={age}
                    className="input-field"
                    disabled={true}
                  />
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
                />
              </div>

              {/* Social media links (pas encore dans le back, donc valeurs locales seulement) */}
              <div className="social-section">
                <div className="social-row">
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                      alt="Facebook"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.facebook}
                      className="input-field"
                    />
                  </div>
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                      alt="Instagram"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.instagram}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="social-row">
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg" 
                      alt="Snapchat"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.snapchat}
                      className="input-field"
                    />
                  </div>
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                      alt="LinkedIn"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={profileData.linkedin}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Example: you could later add an "Edit profile" button here 
            <div style={{ marginTop: "2rem" }}>
              <Button
                color="salmon"
                variant="contained"
                size="large"
                disabled
              >
                Edit (coming soon)
              </Button>
            </div>*/}

          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserProfile;
