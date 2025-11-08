import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './ActivityDetails.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../components/BackButton';
import { useState, useEffect } from 'react';

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

const ActivityDetails = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("default"); // "owner" | "subscribed" | "default"
  
  const activity = {
    title: "Title",
    date: "Date",
    place: "Place",
    authorID: localStorage.getItem("userId"), // à retirer une fois l'API en place
    author: localStorage.getItem("userName"), // pareil
    tags: ["Tag", "Tag", "Tag"],
    description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."
  };

  // Vérifier si l'utilisateur actuel est le propriétaire
  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");

    if (currentUserId === activity.authorID) {
      setUserType("owner");
    }
  }, []); // On peut mettre activity.author dans les dépendances si l'activité peut changer, mais pour l'instant il me semble que ce n'est pas le cas

  const handleSubscribe = () => {
    // Appel API pour s'inscrire à l'activité
    // fetch(...).then(() => setUserType("subscribed"));
    setUserType("subscribed");
  };
  
  const handleUnsubscribe = () => {
    // Appel API pour se désinscrire
    // fetch(...).then(() => setUserType("default"));
    setUserType("default");
  };
  
  const handleDelete = () => {
    // Appel API pour supprimer l'activité
    // fetch(...).then(() => navigate("/viewActivities"));
    if (confirm("Are you sure you want to delete this activity?")) {
      navigate("/viewActivities");
    }
  };

  const handleAuthorClick = () => {
    const currentUserId = localStorage.getItem("userId");
    if (currentUserId === activity.authorID) {
      navigate("/userProfile");
    } else {
      navigate("/profileView");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="activity-details">
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

        {/* Content */}
        <div className="details-content">
          <div className="details-card">
            <div className="card-layout">
              {/* Image */}
              <div className="activity-image"></div>

              {/* Info section */}
              <div className="activity-info">
                <h1 className="activity-title">{activity.title}</h1>
                <p className="activity-date">{activity.date}</p>
                <p className="activity-place">{activity.place}</p>
                <p className="activity-author">
                  By {' '}
                  <span
                    className="author-link"
                    onClick={handleAuthorClick}
                  >
                    {activity.author}
                  </span>
                </p>
                
                
                <div className="activity-tags">
                  {activity.tags.map((tag, index) => (
                    <Chip 
                      key={index}
                      label={tag}
                      className="tag-chip"
                      style={{
                        backgroundColor: '#6E003C',
                        color: '#ffffff',
                        fontFamily: 'Roboto, Helvetica',
                        fontWeight: 500
                      }}
                    />
                  ))}
                </div>

                <p className="activity-description">
                  {activity.description}
                </p>

                {/* Boutons selon le type d'utilisateur */}
                {userType === "owner" && (
                  <>
                    <Button 
                      variant="contained" 
                      color="error"
                      fullWidth
                      className="delete-button"
                      onClick={handleDelete}
                    >
                      Delete activity
                    </Button>
                    <Button 
                      variant="contained" 
                      color="salmon"
                      fullWidth
                      className="chat-button"
                      onClick={() => navigate("/groupChat")}
                      style={{ marginTop: '12px' }}
                    >
                      Activity group chat
                    </Button>
                  </>
                )}

                {userType === "subscribed" && (
                  <>
                    <Button 
                      variant="contained" 
                      color="error"
                      fullWidth
                      className="unsubscribe-button"
                      onClick={handleUnsubscribe}
                    >
                      Unsubscribe from activity
                    </Button>
                    <Button 
                      variant="contained" 
                      color="salmon"
                      fullWidth
                      className="chat-button"
                      onClick={() => navigate("/groupChat")}
                      style={{ marginTop: '12px' }}
                    >
                      Activity group chat
                    </Button>
                  </>
                )}

                {userType === "default" && (
                  <Button 
                    variant="contained" 
                    color="salmon"
                    fullWidth
                    className="subscribe-button"
                    onClick={handleSubscribe}
                  >
                    Subscribe to the activity
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ActivityDetails;