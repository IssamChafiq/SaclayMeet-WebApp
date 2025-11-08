import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./Register.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const Register = () => {
  const navigate = useNavigate();

  // Champs de formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Messages d'erreur pour chaque champ
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Fonction appelée quand on clique sur le bouton "Register"
  const handleSubmit = async () => {
    // Vérification basique des champs
    const newErrors = {
        email: email.trim() === "" ? "L'email est requis" : "", // On vérifie si l'email est vide
        password: password.trim() === "" ? "Le mot de passe est requis" : "", // idem mais pour le mdp
        confirmPassword:
            confirmPassword.trim() === "" ? "Veuillez confirmer votre mot de passe" :
            // On vérifie si le mdp est le même que celui du champ de confirmation
            (password !== confirmPassword ? "Les mots de passe ne correspondent pas" : "")
    };

    // Met à jour les erreurs dans l’état React
    setErrors(newErrors);

    // Si tout est bon (aucune erreur) → on envoie au backend
    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      try {
        // a) Préparer les données à envoyer
        const userData = {
          email: email,
          password: password,
        };

        // b) Envoyer la requête POST vers le backend
        const response = await fetch("http://localhost:8080/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), // Convertit l’objet JS en JSON
        });

        // c) Vérifie la réponse du backend
        if (response.ok) {
          const data = await response.json();

          // Sauvegarde l’ID de l’utilisateur dans localStorage
          localStorage.setItem("userId", data.id);

          // Passe à la page suivante
          navigate("/createProfile");
        } else if (response.status === 409) {
          // 409 = Conflit → email déjà utilisé
          setErrors({
            ...newErrors,
            email: "Cet email est déjà utilisé",
          });
        } else {
          alert("Erreur lors de l'inscription");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="register">
        <div className="register-container">
          <div className="register-logo-container">
            <img
              className="logo-saclay-meet"
              alt="Logo saclay meet"
              src={logoSaclayMeet1}
            />
          </div>

          <div className="register-form-container">
            {/* Champ Email */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="Value"
            />

            {/* Champ Mot de passe */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              placeholder="Value"
            />

            {/* Champ Confirmation mot de passe */}
            <TextField
              label="Confirm password"
              variant="outlined"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              placeholder="Value"
            />

            {/* Bouton d'inscription */}
            <Button
              color="salmon"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              Register
            </Button>

            {/* Lien vers Sign in */}
            <p className="signin-prompt">
              Already have an account?{' '}
              <span
                className="signin-link"
                onClick={() => navigate("/signIn")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Register;

