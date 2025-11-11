// src/pages/ActivityDetails.jsx
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './ActivityDetails.css';
import { useNavigate, useParams } from "react-router-dom";
import BackButton from '../components/BackButton';
import { useEffect, useMemo, useRef, useState } from 'react';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

// ---------- helpers ----------
const API = "http://localhost:8080";

function fmtDateTime(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  const day = d.toLocaleDateString();
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${day} • ${time}`;
}

async function safeFetchJson(url, options = {}, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null };
  } finally {
    clearTimeout(t);
  }
}

async function tryLoadImageBlob(activityId) {
  try {
    const res = await fetch(`${API}/api/activities/${activityId}/image`);
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob || blob.size === 0) return null;
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

// ---------- component ----------
const ActivityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUserId = Number(sessionStorage.getItem("userId"));

  const [activity, setActivity] = useState(null);
  const [coverUrl, setCoverUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  const toastTimerRef = useRef(null);
  const showToast = (message, severity = "info") => {
    setToast({ open: true, message, severity });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(t => ({ ...t, open: false })), 3500);
  };

  // load activity
  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      const res = await safeFetchJson(`${API}/api/activities/${id}`);
      if (ignore) return;

      if (!res.ok) {
        setActivity(null);
        setLoading(false);
        showToast("Activity not found", "error");
        return;
      }

      const a = res.data || {};
      setActivity(a);
      setLoading(false);

      // resolve image:
      // 1) activity.imageUrl (string URL or data URL)
      // 2) activity.image?.url (backend-provided string)
      // 3) GET /api/activities/:id/image (blob)
      const direct =
        (typeof a.imageUrl === "string" && a.imageUrl.trim().length > 0 && a.imageUrl) ||
        (a.image && typeof a.image.url === "string" && a.image.url.trim().length > 0 && a.image.url) ||
        null;

      if (direct) {
        setCoverUrl(direct);
      } else {
        const blobUrl = await tryLoadImageBlob(id);
        if (!ignore) setCoverUrl(blobUrl);
      }
    })();

    return () => { ignore = true; };
  }, [id]);

  // classify user
  const userType = useMemo(() => {
    if (!activity) return "default";
    if (activity?.organizer?.id === currentUserId) return "owner";
    const subs = Array.isArray(activity?.participantIds) ? activity.participantIds : [];
    return subs.includes(currentUserId) ? "subscribed" : "default";
  }, [activity, currentUserId]);

  const isCanceled = activity?.status === "CANCELED";
  const showPlaceholderForSubscriber = isCanceled && userType !== "owner";

  const reload = async () => {
    const res = await safeFetchJson(`${API}/api/activities/${id}`);
    if (res.ok) {
      setActivity(res.data);
      // image could have changed; recompute cover
      const a = res.data;
      const direct =
        (typeof a.imageUrl === "string" && a.imageUrl.trim().length > 0 && a.imageUrl) ||
        (a.image && typeof a.image.url === "string" && a.image.url.trim().length > 0 && a.image.url) ||
        null;
      if (direct) {
        setCoverUrl(direct);
      } else {
        const blobUrl = await tryLoadImageBlob(id);
        setCoverUrl(blobUrl);
      }
    }
  };

  // actions
  const handleSubscribe = async () => {
    if (!currentUserId) {
      showToast("You must be signed in to subscribe.", "warning");
      return;
    }
    const res = await safeFetchJson(`${API}/api/activities/${id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    });
    if (!res.ok) {
      showToast("Failed to subscribe.", "error");
      return;
    }
    showToast("Subscribed.", "success");
    reload();
  };

  const handleUnsubscribe = async () => {
    if (!currentUserId) return;
    const res = await safeFetchJson(`${API}/api/activities/${id}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUserId }),
    });
    if (!res.ok) {
      showToast("Failed to unsubscribe.", "error");
      return;
    }
    showToast("Removed from your list.", "success");
    reload();
  };

  const handleDelete = async () => {
    if (!confirm("Cancel this activity?")) return;
    const res = await fetch(`${API}/api/activities/${id}`, { method: "DELETE" });
    if (!res.ok) {
      showToast("Failed to cancel.", "error");
      return;
    }
    showToast("Activity canceled.", "success");
    reload();
  };

  const handleAuthorClick = () => {
    const organizer = activity?.organizer;
    if (!organizer) return;
    if (currentUserId && organizer.id === currentUserId) {
      navigate("/userProfile");
    } else {
      navigate(`/profileView/${organizer.id}`);
    }
  };

  // ---------- render ----------
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
    tags = [],
    organizer,
  } = activity;

  const dateLine = [fmtDateTime(startTime), endTime ? `→ ${fmtDateTime(endTime)}` : ""]
    .filter(Boolean)
    .join(" ");

  const authorName = organizer
    ? `${organizer.firstName || ""} ${organizer.lastName || ""}`.trim() || "Unknown"
    : "Unknown";

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
                  backgroundImage: coverUrl && !showPlaceholderForSubscriber ? `url(${coverUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Info */}
              <div className="activity-info">
                <h1 className="activity-title">
                  {showPlaceholderForSubscriber
                    ? "This activity has been canceled"
                    : (isCanceled ? `(CANCELED) ${title || ""}` : (title || ""))}
                </h1>

                {!showPlaceholderForSubscriber && (
                  <>
                    <p className="activity-date">{dateLine}</p>
                    <p className="activity-place">{location || ""}</p>

                    <p
                      className="activity-author"
                      onClick={handleAuthorClick}
                      style={{ cursor: organizer ? "pointer" : "default" }}
                      title={organizer ? "View organizer profile" : ""}
                    >
                      By {authorName}
                    </p>

                    <div className="activity-tags">
                      {(Array.isArray(tags) ? tags : []).map((tag, i) => (
                        <Chip
                          key={`${tag}-${i}`}
                          label={String(tag)}
                          className="tag-chip"
                          style={{ backgroundColor: '#6E003C', color: '#fff', fontFamily: 'Roboto, Helvetica', fontWeight: 500 }}
                          size="small"
                        />
                      ))}
                    </div>

                    <p className="activity-description">{description || ""}</p>
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
                      sx={{ mt: 1 }}
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
                        sx={{ mt: 1 }}
                      >
                        Activity group chat
                      </Button>
                    )}
                  </>
                )}

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
                          sx={{ mt: 1 }}
                        >
                          Unsubscribe from activity
                        </Button>
                        <Button
                          variant="contained"
                          color="salmon"
                          fullWidth
                          className="chat-button"
                          onClick={() => navigate(`/groupChat/${id}`)}
                          sx={{ mt: 1 }}
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
                        sx={{ mt: 1 }}
                      >
                        Unsubscribe (remove from my list)
                      </Button>
                    )}
                  </>
                )}

                {userType === "default" && !isCanceled && (
                  <Button
                    variant="contained"
                    color="salmon"
                    fullWidth
                    className="subscribe-button"
                    onClick={handleSubscribe}
                    sx={{ mt: 1 }}
                  >
                    Subscribe to the activity
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Snackbar
          open={toast.open}
          autoHideDuration={3500}
          onClose={() => setToast(t => ({ ...t, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))}>
            {toast.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default ActivityDetails;
