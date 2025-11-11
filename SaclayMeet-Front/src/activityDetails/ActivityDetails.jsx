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

// Normalize image values like in ActivityCard/Profile
const normalizeImageSrc = (image) => {
  if (!image) return "";
  const s = String(image);
  if (s.startsWith("data:image/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("/api/images")) return `http://localhost:8080${s}`;
  return s;
};

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
  const currentUserId = Number(sessionStorage.getItem("userId"));

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load activity
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/activities/${id}`);
        if (!ignore) {
          if (res.ok) setActivity(await res.json());
          setLoading(false);
        }
      } catch {
        if (!ignore) setLoading(false);
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

  // Soft delete -> cancel
  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Cancel this activity?")) return;
    const res = await fetch(`http://localhost:8080/api/activities/${id}`, { method: "DELETE" });
    if (res.ok) reload(); // stay; list pages will hide it
  };

  const handleAuthorClick = () => {
    const organizer = activity?.organizer;
    if (currentUserId === organizer?.id) {
      navigate("/userProfile");
    } else {
      navigate(`/profileView/${organizer?.id}`)
    }
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

  const isCanceled = activity.status === "CANCELED";
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

  // Prefer imageUrl (string) then image?.url; normalize for backend-served paths
  const coverRaw = imageUrl || image?.url || "";
  const cover = normalizeImageSrc(coverRaw);

  // If canceled and viewer is NOT the owner, we hide the content (your prior behavior)
  const hideForSubscriber = isCanceled && userType !== "owner";

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

              {/* Image (uses normalized URL) */}
              <div
                className="activity-image"
                style={{
                  backgroundImage: (!hideForSubscriber && cover) ? `url(${cover})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#eee"
                }}
                aria-label="Activity cover image"
                role="img"
              />

              {/* Info */}
              <div className="activity-info">
                <h1 className="activity-title">
                  {hideForSubscriber
                    ? "This activity has been canceled"
                    : (isCanceled ? `(CANCELED) ${title || ""}` : (title || ""))}
                </h1>

                {!hideForSubscriber && (
                  <>
                    <p className="activity-date">{dateLine}</p>
                    <p className="activity-place">{location}</p>
                    <p className="activity-author">
                      By{' '}
                      <span
                        className="author-link"
                        onClick={handleAuthorClick}
                      >
                        {authorName}
                      </span>
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
                  </>
                )}

                {/* Actions */}
                {userType === "owner" && (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      className="delete-button"
                      onClick={handleDelete}
                      disabled={isCanceled}
                    >
                      {isCanceled ? "Already canceled" : "Cancel activity"}
                    </Button>

                    {!isCanceled && (
                      <Button
                        variant="contained"
                        color="salmon"
                        fullWidth
                        className="chat-button"
                        onClick={() => navigate(`/groupChat/${id}`)}
                        style={{ marginTop: 12 }}
                      >
                        Activity group chat
                      </Button>
                    )}
                  </>
                )}

                {/* Subscriber actions */}
                {userType === "subscribed" && (
                  <>
                    {!isCanceled && (
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
                          onClick={() => navigate(`/groupChat/${id}`)}
                          style={{ marginTop: 12 }}
                        >
                          Activity group chat
                        </Button>
                      </>
                    )}

                    {isCanceled && (
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        className="unsubscribe-button"
                        onClick={handleUnsubscribe}
                      >
                        Unsubscribe (remove from my list)
                      </Button>
                    )}
                  </>
                )}

                {/* Default user can’t subscribe if canceled */}
                {userType === "default" && !isCanceled && (
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
