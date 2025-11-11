import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import "./ActivitiesCreated.css";
import ActivityCard from "../components/ActivityCard";
import NavButtons from "../components/NavButtons";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

const ActivitiesCreated = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const userId = Number(sessionStorage.getItem("userId"));
    if (!userId) return;

    fetch(`http://localhost:8080/api/activities/organizer/${userId}`)
      .then(res => res.json())
      .then(data => setActivities(Array.isArray(data) ? data : []));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activities;
    return activities.filter(a => {
      const t = (a.title || "").toLowerCase();
      const d = (a.description || "").toLowerCase();
      return t.includes(q) || d.includes(q);
    });
  }, [activities, search]);

  return (
    <ThemeProvider theme={theme}>
      <div className="view-activities">
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

          <NavButtons
            name1="Profile" 
            name2="View activities" 
            name3="Create activity" 
            path1="/userProfile" 
            path2="/viewActivities" 
            path3="/createActivity" 
            current="second"
            inline={true}
          />
        </div>

        {/* Search */}
        <div className="search-container">
          <TextField
            placeholder="Search"
            variant="outlined"
            className="search-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Content */}
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
            {filtered.map((activity) => {
              const isCanceled = activity.status === "CANCELED";
              const title = isCanceled ? `(CANCELED) ${activity.title || ""}` : activity.title;
              return (
                <ActivityCard
                  key={activity.id}
                  image={activity.imageUrl}            
                  title={title}
                  description={activity.description}
                  tags={Array.isArray(activity.tags) ? activity.tags : []}
                  onClick={() => navigate(`/activity/${activity.id}`)}
                />
              );
            })}
            {filtered.length === 0 && (
              <div style={{ opacity: 0.7, padding: "1rem" }}>
                You haven’t created any activity yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ActivitiesCreated;
