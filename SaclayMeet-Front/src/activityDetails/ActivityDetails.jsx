import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './ActivityDetails.css';
import { useNavigate } from "react-router-dom";
import BackButton from '../components/BackButton';

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
  const activity = {
    title: "Title",
    date: "Date",
    place: "Place",
    author: "TestMan McTest",
    tags: ["Tag", "Tag", "Tag"],
    description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."
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
                <p className="activity-author" onClick={() => navigate("/profileView")} style={{ cursor: "pointer" }}>By {activity.author}</p>
                
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

                <Button 
                  variant="contained" 
                  color="salmon"
                  fullWidth
                  className="subscribe-button"
                >
                  Subscribe to the activity
                </Button>

                <Button 
                  variant="contained" 
                  color="salmon"
                  fullWidth
                  className="chat-button"
                  onClick={() => navigate("/groupChat")}
                  style={{ marginTop: '12px' }}
                >
                  Join Group Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ActivityDetails;