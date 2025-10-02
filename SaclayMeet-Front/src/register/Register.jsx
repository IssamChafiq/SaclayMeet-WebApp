import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./Register.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#6E003C',
      },
      name: 'salmon',
    }),
  },
});

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({email: "", password: "", confirmPassword: ""});

    const handleSubmit = () => {
        const newErrors = {
            email: email.trim() === "" ? "L'email est requis" : "", // On vérifie si l'email est vide
            password: password.trim() === "" ? "Le mot de passe est requis" : "", // idem mais pour le mdp
            confirmPassword:
                confirmPassword.trim() === "" ? "Veuillez confirmer votre mot de passe" :
                // On vérifie si le mdp est le même que celui du champ de confirmation
                (password !== confirmPassword ? "Les mots de passe ne correspondent pas" : "")
        };
        setErrors(newErrors);
        if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
            navigate("/createProfile");
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
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            // Double ! pour convertir en booléen puis inverser la valeur
                            error={!!errors.email}
                            // Si on a une erreur, on l'affiche, sinon on met un espace pour garder la hauteur
                            helperText={errors.email ? errors.email : " "}
                            placeholder="Value"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password : " "}
                            placeholder="Value"
                        />
                        <TextField
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword ? errors.confirmPassword : " "}
                            placeholder="Value"
                        />
                        <Button
                            color="salmon"
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Register;