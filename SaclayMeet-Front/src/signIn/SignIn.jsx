import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./SignIn.css";
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

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({email: "", password: ""});
    
    const handleSubmit = () => {
        const newErrors = {
            email: email.trim() === "" ? "L'email est requis" : "", 
            password: password.trim() === "" ? "Le mot de passe est requis" : "",
        };
        setErrors(newErrors);
        if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
            navigate("/viewActivities");
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
                        <TextField 
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            error={!!errors.email}
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
                        
                        <Button 
                            color="salmon"
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleSubmit}
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SignIn;
