import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./ViewActivities.css";
import ActivityCard from "../components/ActivityCard";
import NavButtons from "../components/NavButtons";

import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
                        name2="View Activities" 
                        name3="Create Activity" 
                        path1="/userProfile" 
                        path2="/viewActivities" 
                        path3="/createActivity" 
                        current="second"
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

                <div className="activities-content">
                    <div className="sidebar">
                        <div className="filters-box">
                            <h3 className="filters-title">Filters :</h3>

                            <div className="filter-category">
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Study" 
                                />
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Party" 
                                />
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Outing" 
                                />
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Movie" 
                                />
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Games" 
                                    />
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Sport" 
                                />
                                <FormControlLabel 
                                    control={<Checkbox color="salmon" defaultUnchecked />} 
                                    label="Cultural" 
                                />
                            </div>

                            <div className="date-filter">
                                <p className="date-label">After</p>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                                    <DatePicker 
                                        label="Start date"
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="date-filter">
                                <p className="date-label">Before</p>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                                    <DatePicker 
                                        label="End date"
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>

                    <div className="activities-list">
                        {/* Pour naviguer vers une activité en particulier : onClick={() => navigate(`/activity/${activity.id}`)} */}
                        {activities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                title={activity.title}
                                description={activity.description}
                                tags={activity.tags}
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
