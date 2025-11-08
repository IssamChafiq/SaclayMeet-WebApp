import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./SignIn.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

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

const SignIn = () => {
  const navigate = useNavigate();

  // Champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion des erreurs (affichage sous les champs)
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Message d'erreur global (login incorrect)
  const [loginError, setLoginError] = useState("");

  // Fonction appelée quand on clique sur "Sign in"
  const handleSubmit = async () => {
    // Vérification basique des champs
    const newErrors = {
      email: email.trim() === "" ? "L'email est requis" : "",
      password: password.trim() === "" ? "Le mot de passe est requis" : "",
    };
    setErrors(newErrors);

    // Si pas d’erreurs → on envoie au backend
    if (!newErrors.email && !newErrors.password) {
      try {
        // a) Créer les données à envoyer
        const loginData = {
          email: email,
          password: password,
        };

        // b) Envoyer la requête POST vers l’API de connexion
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        // c) Vérifier la réponse du backend
        if (response.ok) {
          const data = await response.json();

          // Connexion réussie : on sauvegarde l'ID utilisateur
          localStorage.setItem("userId", data.id);

          // Et on redirige vers la page principale
          navigate("/viewActivities");
        } else if (response.status === 401) {
          // Mauvais email ou mot de passe
          setLoginError("Email ou mot de passe incorrect");
        } else {
          // Autre erreur (serveur, etc.)
          setLoginError("Erreur lors de la connexion");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        setLoginError("Impossible de se connecter au serveur");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="signin">
        <div className="signin-container">
          <div className="signin-logo-container">
            <img
              className="logo-saclay-meet"
              alt="Logo saclay meet"
              src={logoSaclayMeet1}
            />
          </div>

          <div className="signin-form-container">
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

            {/* Message d'erreur global */}
            {loginError && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}

            {/* Bouton de connexion */}
            <Button
              color="salmon"
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              Sign in
            </Button>

            {/* Lien vers Register */}
            <p className="signup-prompt">
              Don't have an account?{' '}
              <span
                className="register-link"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;

