import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import "./Home.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const Home = () => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <div className="home">
                {/*Header, logos + boutons*/}
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
                    {/*Image principale et titre*/}
                    <div className="title">
                        <div className="hero-image">
                            <div className="text-title">
                                <div className="image-title">SaclayMeet</div>
                                <div className="image-subtitle">Pour une vie étudiante épanouie sur le plateau de Saclay</div>
                            </div>
                        </div>
                    </div>

                    {/*Description*/}
                    <div className="description">
                        <p className="subtitle">
                            Organiser des évènements n’a jamais été aussi facile !
                        </p>
                    </div>

                    {/*Images et descriptions*/}
                    <div className="images">
                            <p className="desc">
                                Proposez des rencontres aux autres utilisateurs...
                            </p>

                            <div className="image-2" style={{ backgroundImage: `url(${image2})` }} />
                    </div>

                    <div className="images">
                            <div className="image-3" style={{ backgroundImage: `url(${image3})` }} />

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



   