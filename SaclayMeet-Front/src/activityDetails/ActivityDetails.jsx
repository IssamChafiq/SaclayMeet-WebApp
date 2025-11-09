import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './ActivityDetails.css';
import { useNavigate, useParams } from "react-router-dom";
import BackButton from '../components/BackButton';
import { useEffect, useMemo, useState } from 'react';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

function formatDateTime(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  const day = d.toLocaleDateString();
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${day} • ${time}`;
}

const ActivityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // route: /activity/:id
  const currentUserId = Number(localStorage.getItem("userId"));

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load activity
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/activities/${id}`);
      if (!ignore) {
        if (res.ok) setActivity(await res.json());
        setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [id]);

  // user type: owner | subscribed | default
  const userType = useMemo(() => {
    if (!activity) return "default";
    if (activity?.organizer?.id === currentUserId) return "owner";
    const subs = activity?.participantIds || [];
    return subs.includes(currentUserId) ? "subscribed" : "default";
  }, [activity, currentUserId]);

  const reload = async () => {
    const res = await fetch(`http://localhost:8080/api/activities/${id}`);
    if (res.ok) setActivity(await res.json());
  };

  const handleSubscribe = async () => {
    await fetch(`http://localhost:8080/api/activities/${id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    });
    reload();
  };

  const handleUnsubscribe = async () => {
    await fetch(`http://localhost:8080/api/activities/${id}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    });
    reload();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this activity?")) return;
    const res = await fetch(`http://localhost:8080/api/activities/${id}`, { method: "DELETE" });
    if (res.ok) navigate("/viewActivities");
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <div className="activity-details">
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
          <div className="details-content"><div className="details-card">Loading…</div></div>
        </div>
      </ThemeProvider>
    );
  }

  if (!activity) {
    return (
      <ThemeProvider theme={theme}>
        <div className="activity-details">
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
          <div className="details-content"><div className="details-card">Not found</div></div>
        </div>
      </ThemeProvider>
    );
  }

  const {
    title,
    startTime,
    endTime,
    location,
    description,
    imageUrl,
    image,
    tags = [],
    organizer,
  } = activity;

  const dateLine = [formatDateTime(startTime), endTime ? `→ ${formatDateTime(endTime)}` : ""]
    .filter(Boolean)
    .join(" ");
  const authorName = organizer ? `${organizer.firstName || ""} ${organizer.lastName || ""}`.trim() : "Unknown";

  const cover = imageUrl || image?.url || null;

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
              <div
                className="activity-image"
                style={{
                  backgroundImage: cover ? `url(${cover})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Info */}
              <div className="activity-info">
                <h1 className="activity-title">{title}</h1>
                <p className="activity-date">{dateLine}</p>
                <p className="activity-place">{location}</p>
                <p
                  className="activity-author"
                  // inside ActivityDetails.jsx
                  onClick={() => navigate(`/profileView/${organizer?.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  By {authorName || "Unknown"}
                </p>

                <div className="activity-tags">
                  {(Array.isArray(tags) ? tags : []).map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      className="tag-chip"
                      style={{ backgroundColor: '#6E003C', color: '#fff', fontFamily: 'Roboto, Helvetica', fontWeight: 500 }}
                    />
                  ))}
                </div>

                <p className="activity-description">{description}</p>

                {/* Actions */}
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
                      onClick={() => navigate(`/groupChat/${id}`)}  // << route with id
                      style={{ marginTop: 12 }}
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
                      onClick={() => navigate(`/groupChat/${id}`)}  // << route with id
                      style={{ marginTop: 12 }}
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
