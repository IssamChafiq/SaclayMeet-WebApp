import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './ProfileView.css';
import BackButton from '../components/BackButton';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

// birthDate from backend is "YYYY-MM-DD"
function getAgeFromBirthDate(birthDateStr) {
  if (!birthDateStr) return "";
  const today = new Date();
  const [y, m, d] = birthDateStr.split("-").map(Number);
  const birth = new Date(y, (m || 1) - 1, d || 1);
  let age = today.getFullYear() - birth.getFullYear();
  const mm = today.getMonth() - birth.getMonth();
  if (mm < 0 || (mm === 0 && today.getDate() < birth.getDate())) age--;
  return String(age);
}

const ProfileView = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // /profileView/:userId

  const [user, setUser] = useState(null);   // raw user from backend
  const [loading, setLoading] = useState(true);

  // load user by id
  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!userId) { setLoading(false); return; }
      try {
        const res = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!ignore) {
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
          setLoading(false);
        }
      } catch {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [userId]);

  const profile = useMemo(() => {
    if (!user) return null;
    const firstName = user.firstName || "";
    const lastName  = user.lastName  || "";
    const email     = user.email     || "";
    const school    = user.schoolName || "";
    const level     = user.level || "";
    const bio       = user.bio || "";
    const birthDate = user.birthDate || ""; // "YYYY-MM-DD"
    const age       = getAgeFromBirthDate(birthDate);

    return { firstName, lastName, email, school, level, bio, age };
  }, [user]);

  if (loading) {
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
            <BackButton />
          </div>
          <div style={{ padding: 24 }}>Loading…</div>
        </div>
      </ThemeProvider>
    );
  }

  if (!profile) {
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
            <BackButton />
          </div>
          <div style={{ padding: 24 }}>User not found.</div>
        </div>
      </ThemeProvider>
    );
  }

  const { firstName, lastName, email, age, school, level, bio } = profile;
  const fullName = `${firstName} ${lastName}`.trim();
  const avatarLetter = (firstName || lastName) ? (firstName?.[0] || lastName?.[0] || "?") : "?";

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
          <BackButton />
        </div>

        <div className="profile-content">
          {/* Main content */}
          <div className="profile-main">
            {/* Avatar section */}
            <div className="profile-header">
              <Avatar
                className="profile-avatar"
                alt={fullName || "User"}
                sx={{ width: 100, height: 100, fontSize: 36 }}
              >
                {avatarLetter}
              </Avatar>
              <h1 className="profile-name">{fullName || "Unknown"}</h1>
              <p className="profile-email">{email}</p>
            </div>

            {/* Read-only fields */}
            <div className="profile-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">First name</label>
                  <TextField fullWidth variant="filled" value={firstName} disabled />
                </div>
                <div className="form-field">
                  <label className="field-label">Last name</label>
                  <TextField fullWidth variant="filled" value={lastName} disabled />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">Email</label>
                  <TextField fullWidth variant="filled" value={email} disabled />
                </div>
                <div className="form-field">
                  <label className="field-label">Age</label>
                  <TextField fullWidth variant="filled" value={age} disabled />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">School</label>
                  <TextField fullWidth variant="filled" value={school} disabled />
                </div>
                <div className="form-field">
                  <label className="field-label">Level</label>
                  <TextField fullWidth variant="filled" value={level} disabled />
                </div>
              </div>

              <div className="bio-section">
                <label className="field-label">Bio</label>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="filled"
                  value={bio}
                  disabled
                />
              </div>

              {/* optional socials later */}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProfileView;
