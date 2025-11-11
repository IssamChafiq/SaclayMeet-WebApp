import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './ProfileView.css';
import BackButton from '../components/BackButton';
import { Facebook, Instagram, Linkedin, Camera } from 'lucide-react';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

// normalize an image value like in ActivityCard
const normalizeImageSrc = (image) => {
  if (!image) return "";
  const s = String(image);
  if (s.startsWith("data:image/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/api/images")) return `http://localhost:8080${s}`;
  return s;
};

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

    // socials
    const facebook  = user.facebook  || "";
    const instagram = user.instagram || "";
    const snapchat  = user.snapchat  || "";
    const linkedin  = user.linkedin  || "";

    // image
    const avatarSrc = normalizeImageSrc(user.profileImageUrl);

    return { firstName, lastName, email, school, level, bio, age, facebook, instagram, snapchat, linkedin, avatarSrc };
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

  const { firstName, lastName, email, age, school, level, bio, facebook, instagram, snapchat, linkedin, avatarSrc } = profile;
  const fullName = `${firstName} ${lastName}`.trim();
  const fallbackLetter = (firstName || lastName) ? (firstName?.[0] || lastName?.[0] || "?") : "?";

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
              {avatarSrc ? (
                <img
                  className="profile-photo"
                  src={avatarSrc}
                  alt={fullName || "User photo"}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <Avatar
                  className="profile-avatar"
                  alt={fullName || "User"}
                  sx={{ width: 100, height: 100, fontSize: 36 }}
                >
                  {fallbackLetter}
                </Avatar>
              )}
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

              {/* Socials */}
              {(facebook || instagram || snapchat || linkedin) && (
                <div className="social-section">
                  <div className="social-row">
                    <div className="social-field">
                      <Facebook size={24} className="social-icon" color="#1877F2" />
                      <a
                        className="social-link"
                        href={facebook || "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!facebook}
                        onClick={(e) => { if (!facebook) e.preventDefault(); }}
                        title={facebook ? "Open Facebook" : "No Facebook provided"}
                      >
                        {facebook || "Not provided"}
                      </a>
                    </div>

                    <div className="social-field">
                      <Instagram size={24} className="social-icon" color="#E4405F" />
                      <a
                        className="social-link"
                        href={instagram || "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!instagram}
                        onClick={(e) => { if (!instagram) e.preventDefault(); }}
                        title={instagram ? "Open Instagram" : "No Instagram provided"}
                      >
                        {instagram || "Not provided"}
                      </a>
                    </div>
                  </div>

                  <div className="social-row">
                    <div className="social-field">
                      <Camera size={24} className="social-icon" color="#FFFC00" />
                      <span className="social-link" title={snapchat ? "Snapchat" : "No Snapchat provided"}>
                        {snapchat || "Not provided"}
                      </span>
                    </div>

                    <div className="social-field">
                      <Linkedin size={24} className="social-icon" color="#0A66C2" />
                      <a
                        className="social-link"
                        href={linkedin || "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!linkedin}
                        onClick={(e) => { if (!linkedin) e.preventDefault(); }}
                        title={linkedin ? "Open LinkedIn" : "No LinkedIn provided"}
                      >
                        {linkedin || "Not provided"}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProfileView;
