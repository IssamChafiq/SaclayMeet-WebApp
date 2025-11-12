import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import "./Home.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Calendar, Users, MessageCircle, Sparkles } from 'lucide-react';

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
                {/* Header */}
                <div className="header">
                    <div className="logo-container">
                        <img
                            className="logo-saclay-meet"
                            alt="Logo saclay meet"
                            src={logoSaclayMeet1}
                        />
                    </div>
                    <Stack spacing={2} direction="row">
                        <Button 
                            color="salmon" 
                            variant="contained" 
                            onClick={() => navigate("/signIn")}
                            className="header-btn-primary"
                        >
                            Sign in
                        </Button>
                        <Button 
                            color="salmon" 
                            variant="contained" 
                            onClick={() => navigate("/register")}
                            className="header-btn-primary"
                        >
                            Register
                        </Button>
                    </Stack>
                </div>
                
                <div className="body">
                    {/* Hero Section */}
                    <div className="hero-section">
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <h1 className="hero-title">SaclayMeet</h1>
                                <p className="hero-subtitle">
                                    The platform that connects students on the Saclay plateau
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="features-section">
                        <h2 className="section-title">Why SaclayMeet?</h2>
                        
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <Calendar size={32} />
                                </div>
                                <h3 className="feature-title">Create events</h3>
                                <p className="feature-description">
                                    Easily organize your activities and invite other students to join you
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <Users size={32} />
                                </div>
                                <h3 className="feature-title">Join groups</h3>
                                <p className="feature-description">
                                    Discover events that match your interests
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <MessageCircle size={32} />
                                </div>
                                <h3 className="feature-title">Chat in real-time</h3>
                                <p className="feature-description">
                                    Talk with participants before, during and after the event
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">
                                    <Sparkles size={32} />
                                </div>
                                <h3 className="feature-title">Expand your network</h3>
                                <p className="feature-description">
                                    Meet new people and enrich your student life
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Sections */}
                    <div className="content-section">
                        <div className="content-card left">
                            <div className="content-text">
                                <h2 className="content-title">Propose your ideas</h2>
                                <p className="content-description">
                                    Whether it's for tutoring, a sports tournament, a game night or a cultural outing, 
                                    create your dream event and find motivated participants!
                                </p>
                            </div>
                            <div className="content-image" style={{ backgroundImage: `url(${image2})` }} />
                        </div>
                    </div>

                    <div className="content-section alternate">
                        <div className="content-card right">
                            <div className="content-image" style={{ backgroundImage: `url(${image3})` }} />
                            <div className="content-text">
                                <h2 className="content-title">Join the community</h2>
                                <p className="content-description">
                                    Browse events proposed by other students, register with one click 
                                    and participate in a rich and diverse student life!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="cta-section">
                        <h2 className="cta-title">Ready to join SaclayMeet?</h2>
                        <p className="cta-subtitle">Sign up for free and discover all the opportunities</p>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Home;