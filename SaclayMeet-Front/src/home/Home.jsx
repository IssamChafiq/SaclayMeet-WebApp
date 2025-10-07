import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./Home.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const Home = () => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <div className="home">
                <div className="header">
                    <div className="image">
                        <img
                            className="logo-saclay-meet"
                            alt="Logo saclay meet"
                            src={logoSaclayMeet1}
                        />
                    </div>
                    <Stack spacing={2} direction="row">
                        <Button color="salmon" variant="contained" onClick={() => navigate("/signIn")}>Sign in</Button>
                        <Button color="salmon" variant="contained" onClick={() => navigate("/register")}>Register</Button>
                    </Stack>
                </div>
                
                
                <div className="body">
                    <div className="title">
                        <div className="hero-image">
                            <div className="text-title">
                                <div className="image-title">SaclayMeet</div>
                                <div className="image-subtitle">Pour une vie étudiante épanouie sur le plateau de Saclay</div>
                            </div>
                        </div>
                    </div>

                    <div className="description">
                        <p className="subtitle">
                            Organiser des évènements n’a jamais été aussi facile !
                        </p>
                    </div>

                    <div className="images">
                            <p className="desc">
                                Proposez des rencontres aux autres utilisateurs...
                            </p>

                            <div className="image-2" />
                    </div>

                    <div className="images">
                            <div className="image-3" />

                            <p className="desc">
                                ...ou inscrivez-vous aux évènements des autres en un clic !
                            </p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Home;



   