import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./ActivitiesCreated.css";
import ActivityCard from "../components/ActivityCard";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                        />
                    </div>
                    
                    <div className="nav-buttons">
                        <Button color="salmon" variant="contained">Profile</Button>
                        <Button color="inherit">View Activities</Button>
                        <Button color="inherit">Create Activity</Button>
                    </div>
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
                        <Button color="inherit">Profile</Button>
                        <Button color="salmon" variant="contained">Activities created</Button>
                        <Button color="inherit">Upcoming activities</Button>
                    </div>

                    <div className="activities-list">
                        {activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                title={activity.title}
                                description={activity.description}
                                tags={activity.tags}
                                type="owned"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default ViewActivities;
