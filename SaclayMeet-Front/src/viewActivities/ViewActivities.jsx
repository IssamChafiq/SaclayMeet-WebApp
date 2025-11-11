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
import dayjs from "dayjs";
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

// Must match backend enum Tag values exactly
const ALL_TAGS = ["Study", "Party", "Outing", "Movie", "Games", "Sport", "Cultural"];

// helper: backend expects "YYYY-MM-DDTHH:mm:ss"
const toIsoSecs = (d) => (d ? dayjs(d).format("YYYY-MM-DD[T]HH:mm:ss") : null);

const ViewActivities = () => {
  const navigate = useNavigate();

  // filters
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [afterDate, setAfterDate] = useState(null);
  const [beforeDate, setBeforeDate] = useState(null);

  // data
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // build URL & fetch whenever filters change
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);

      // Always exclude past activities:
      const effectiveAfter = afterDate ? toIsoSecs(afterDate.startOf("day")) : toIsoSecs(dayjs());

      const params = new URLSearchParams();
      params.set("after", effectiveAfter);
      if (beforeDate) params.set("before", toIsoSecs(beforeDate.endOf("day")));
      if (selectedTags.length) params.set("tags", selectedTags.join(","));

      const res = await fetch(`http://localhost:8080/api/activities/search?${params.toString()}`);
      const data = await res.json();
      // server already excludes CANCELED, but double-guard here
      const visible = (Array.isArray(data) ? data : []).filter(a => a.status !== "CANCELED");
      setActivities(visible);
      setLoading(false);
    };

    fetchActivities();
  }, [selectedTags, afterDate, beforeDate]);

  // client-side search over title/description
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activities;
    return activities.filter(a => {
      const t = (a.title || "").toLowerCase();
      const d = (a.description || "").toLowerCase();
      return t.includes(q) || d.includes(q);
    });
  }, [activities, search]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

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
            name2="View Activities" 
            name3="Create Activity" 
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

        <div className="activities-content">
          {/* Sidebar filters */}
          <div className="sidebar">
            <div className="filters-box">
              <h3 className="filters-title">Filters :</h3>

              <div className="filter-category">
                {ALL_TAGS.map(tag => (
                  <FormControlLabel
                    key={tag}
                    control={
                      <Checkbox
                        color="salmon"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                    }
                    label={tag}
                  />
                ))}
              </div>

              <div className="date-filter">
                <p className="date-label">After</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start date"
                    value={afterDate}
                    onChange={(d) => setAfterDate(d)}
                  />
                </LocalizationProvider>
              </div>

              <div className="date-filter">
                <p className="date-label">Before</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End date"
                    value={beforeDate}
                    onChange={(d) => setBeforeDate(d)}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          {/* Activities list */}
          <div className="activities-list">
            {loading && <div style={{ opacity: 0.7, padding: "1rem" }}>Loading…</div>}
            {!loading && filtered.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                tags={Array.isArray(activity.tags) ? activity.tags : []}
                imageUrl={activity.imageUrl || (activity.image && activity.image.url) || ""}
                onClick={() => navigate(`/activity/${activity.id}`)}
              />
            ))}


            {!loading && filtered.length === 0 && (
              <div style={{ opacity: 0.7, padding: "1rem" }}>
                No activities match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ViewActivities;
