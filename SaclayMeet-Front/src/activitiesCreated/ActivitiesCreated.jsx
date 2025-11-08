import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./ActivitiesCreated.css";
import ActivityCard from "../components/ActivityCard";
import NavButtons from "../components/NavButtons";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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

const ViewActivities = () => {
    const navigate = useNavigate();
    const activities = [
        {
            id: 1,
            title: "Title",
            description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
            tags: ["Tag", "Tag", "Tag"]
        },
        {
            id: 2,
            title: "Title",
            description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
            tags: ["Tag", "Tag", "Tag"]
        },
        {
            id: 3,
            title: "Title",
            description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
            tags: ["Tag", "Tag", "Tag"]
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <div className="view-activities">
                <div className="header">
                    <div className="logo-box">
                        <img
                            className="logo-saclay-meet"
                            alt="Logo saclay meet"
                            src={logoSaclayMeet1}
                            onClick={() => navigate("/viewActivities")}
                        />
                    </div>
                    
                    <NavButtons
                        name1="Profile" 
                        name2="View activities" 
                        name3="Create activity" 
                        path1="/userProfile" 
                        path2="/ViewActivities" 
                        path3="/createActivity" 
                        current="first"
                        inline={true}
                    />
                </div>

                <div className="search-container">
                    <TextField
                        placeholder="Search"
                        variant="outlined"
                        className="search-field"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div className="content">
                    <div className="sidebar">
                        <NavButtons
                            name1="Profile" 
                            name2="Activities created" 
                            name3="Upcoming activities" 
                            path1="/userProfile" 
                            path2="/activitiesCreated" 
                            path3="/upcomingActivities" 
                            current="second"
                            inline={false}
                        />
                    </div>

                    <div className="activities-list">
                        {activities.map((activity) => (
                            // We need a specific activityDetails page for people who created them, this one is for viewers
                            <ActivityCard
                                key={activity.id}
                                title={activity.title}
                                description={activity.description}
                                tags={activity.tags}
                                type="owned"
                                onClick={() => navigate("/activityDetails")} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default ViewActivities;
