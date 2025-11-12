import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./CreateProfile.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/fr';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

const CreateProfile = () => {
  const navigate = useNavigate();

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [level, setLevel] = useState("");
  const [bio, setBio] = useState("");

  // UX state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    schoolName: "",
    level: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    setSubmitError("");

    // validate
    const newErrors = {
      firstName: firstName.trim() === "" ? "Veuillez rentrer un prénom" : "",
      lastName: lastName.trim() === "" ? "Veuillez rentrer un nom de famille" : "",
      birthDate: birthDate === null ? "Veuillez rentrer une date de naissance" : null,
      schoolName: schoolName.trim() === "" ? "Veuillez rentrer le nom de votre école" : "",
      level: level.trim() === "" ? "Veuillez rentrer votre niveau d'étude" : "",
    };
    setErrors(newErrors);

    // stop if any error
    const hasError =
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.birthDate ||
      newErrors.schoolName ||
      newErrors.level;
    if (hasError) return;

    // must have userId from session set during Register
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setSubmitError("Session utilisateur absente. Veuillez vous inscrire / reconnecter.");
      return;
    }

    // build payload
    const profileData = {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate ? birthDate.format("YYYY-MM-DD") : null,
      schoolName: schoolName,
      level: level,
      bio: bio,
    };

    setSubmitting(true);
    try {
      // FIX 1: correct endpoint = PUT /api/users/{id} (your backend UserController)
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const msg = await response.text();
        setSubmitError(msg || "Erreur lors de la sauvegarde du profil");
        setSubmitting(false);
        return;
        }

      // keep session in sync (use sessionStorage like your SignIn)
      sessionStorage.setItem("userName", `${firstName} ${lastName}`.trim());

      // go to feed
      navigate("/viewActivities");
    } catch (e) {
      console.error(e);
      setSubmitError("Erreur réseau. Réessayez.");
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="create-profile">
        <div className="create-profile-container">
          <div className="create-profile-logo">
            <img
              className="logo-saclay-meet"
              alt="Logo saclay meet"
              src={logoSaclayMeet1}
            />
          </div>

          <div className="create-profile-form-container">
            <TextField
              label="First name"
              variant="outlined"
              placeholder="Value"
              fullWidth
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              label="Last name"
              variant="outlined"
              placeholder="Value"
              fullWidth
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DatePicker
                label="Birth date"
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.birthDate,
                    helperText: errors.birthDate || "",
                  }
                }}
              />
            </LocalizationProvider>

            <TextField
              label="School name"
              variant="outlined"
              placeholder="Value"
              fullWidth
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              error={!!errors.schoolName}
              helperText={errors.schoolName}
            />

            <TextField
              label="Level"
              variant="outlined"
              placeholder="Value"
              fullWidth
              value={level}
              onChange={e => setLevel(e.target.value)}
              error={!!errors.level}
              helperText={errors.level}
            />

            <TextField
              label="Biography"
              variant="outlined"
              placeholder="Value"
              fullWidth
              multiline
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
            />

            {submitError && (
              <p style={{ color: "red", marginTop: 8 }}>{submitError}</p>
            )}

            <Button
              color="salmon"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Create profile"}
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CreateProfile;
