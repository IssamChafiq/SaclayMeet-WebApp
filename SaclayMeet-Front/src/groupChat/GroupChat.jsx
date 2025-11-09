import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Send } from 'lucide-react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackButton from '../components/BackButton';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './GroupChat.css';

let theme = createTheme({});
theme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: { main: '#6E003C' },
      name: 'salmon',
    }),
  },
});

const fmtTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

// tiny helper to fetch with a 5s timeout and safe JSON
async function safeFetchJson(url, options = {}, timeoutMs = 5000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    if (!res.ok) return { ok: false, status: res.status, data: null };
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    return { ok: true, status: res.status, data };
  } catch (e) {
    return { ok: false, status: 0, data: null };
  } finally {
    clearTimeout(t);
  }
}

const fullName = (u) => {
  if (!u) return null;
  const fn = (u.firstName || "").trim();
  const ln = (u.lastName || "").trim();
  const combo = `${fn} ${ln}`.trim();
  return combo || (u.username || null) || null;
};

const GroupChat = () => {
  const navigate = useNavigate();
  const { activityId: rawActivityId } = useParams();

  // Guard against "null" / undefined / non-number
  const activityId = useMemo(() => {
    if (!rawActivityId || rawActivityId === 'null') return null;
    const n = Number(rawActivityId);
    return Number.isFinite(n) ? n : null;
  }, [rawActivityId]);

  // Use sessionStorage for per-tab login isolation
  const currentUserId = Number(sessionStorage.getItem("userId")); // NaN if not logged
  const notLoggedIn = Number.isNaN(currentUserId);

  const [activityTitle, setActivityTitle] = useState("Group Chat");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [warn, setWarn] = useState("");

  // name cache: { [userId]: "First Last" }
  const [nameById, setNameById] = useState({});
  const [pendingFetch, setPendingFetch] = useState(new Set());

  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const ensureUserName = async (userId) => {
    if (!userId || nameById[userId]) return;
    if (pendingFetch.has(userId)) return;
    setPendingFetch(prev => new Set(prev).add(userId));

    const res = await safeFetchJson(`http://localhost:8080/api/users/${userId}`);
    if (res.ok && res.data) {
      const label = fullName(res.data) || `User ${userId}`;
      setNameById(prev => ({ ...prev, [userId]: label }));
    } else {
      setNameById(prev => ({ ...prev, [userId]: `User ${userId}` }));
    }

    setPendingFetch(prev => {
      const next = new Set(prev);
      next.delete(userId);
      return next;
    });
  };

  // initial load
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (activityId == null) {
        setWarn("Missing or invalid activity id in the URL.");
        setLoading(false);
        return;
      }

      // ensure conversation (best-effort, now race-safe on backend)
      await safeFetchJson(`http://localhost:8080/api/messages/ensure-conversation/${activityId}`, { method: "POST" });

      // load activity title
      const a = await safeFetchJson(`http://localhost:8080/api/activities/${activityId}`);
      if (!cancelled && a.ok && a.data) {
        setActivityTitle(a.data.title || "Group Chat");
        if (a.data.organizer?.id) ensureUserName(a.data.organizer.id);
      }

      // load messages
      const m = await safeFetchJson(`http://localhost:8080/api/messages/activity/${activityId}`);
      if (cancelled) return;

      if (m.ok && Array.isArray(m.data)) {
        const mapped = m.data.map(x => ({
          id: x.id,
          userId: x.userId,
          text: x.body,
          timestamp: fmtTime(x.sentAt),
        }));
        setMessages(mapped);

        const uniqueIds = [...new Set(mapped.map(mm => mm.userId).filter(Boolean))];
        uniqueIds.forEach(uid => ensureUserName(uid));
        if (!Number.isNaN(currentUserId)) ensureUserName(currentUserId);
      } else {
        setWarn("Unable to load chat messages right now.");
      }
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [activityId]); // eslint-disable-line react-hooks/exhaustive-deps

  const canSend = newMessage.trim().length > 0 && !notLoggedIn && activityId != null;

  const myDisplayName = useMemo(() => {
    if (notLoggedIn) return null;
    return nameById[currentUserId] || `User ${currentUserId}`;
  }, [nameById, currentUserId, notLoggedIn]);

  const handleSend = async () => {
    const body = newMessage.trim();
    if (!body || notLoggedIn || activityId == null) return;

    ensureUserName(currentUserId);

    // optimistic add
    const tempId = `tmp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      userId: currentUserId,
      text: body,
      timestamp: fmtTime(new Date().toISOString()),
    };
    setMessages(prev => [...prev, optimistic]);
    setNewMessage('');

    const res = await safeFetchJson(
      `http://localhost:8080/api/messages/activity/${activityId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId, body }),
      }
    );

    if (!res.ok || !res.data) {
      // rollback optimistic if failed
      setMessages(prev => prev.filter(m => m.id !== tempId));
      setWarn("Send failed. Try again later.");
      return;
    }

    const saved = res.data;
    if (saved.userId) ensureUserName(saved.userId);

    // replace optimistic with real one
    setMessages(prev => prev.map(m => m.id === tempId ? ({
      id: saved.id,
      userId: saved.userId,
      text: saved.body,
      timestamp: fmtTime(saved.sentAt),
    }) : m));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const displayNameFor = (msg) => {
    if (!msg?.userId) return "Unknown";
    return nameById[msg.userId] || `User ${msg.userId}`;
  };

  const initialFor = (name) => (name && name.trim()[0]) ? name.trim()[0].toUpperCase() : "?";

  return (
    <ThemeProvider theme={theme}>
      <div className="group-chat">
        {/* Header */}
        <div className="header">
          <div className="logo-box" onClick={() => navigate("/viewActivities")} style={{ cursor: "pointer" }}>
            <img className="logo-saclay-meet" alt="Logo saclay meet" src={logoSaclayMeet1} />
          </div>
          <BackButton />
        </div>

        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {warn && <Alert severity="warning" sx={{ mb: 2 }}>{warn}</Alert>}
          {notLoggedIn && <Alert severity="info" sx={{ mb: 2 }}>You’re not logged in. Sign in to send messages.</Alert>}
          {activityId == null && <Alert severity="info" sx={{ mb: 2 }}>Open chat from an activity page.</Alert>}
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-card">
            {/* Chat Header */}
            <div className="chat-header">
              <h2 className="chat-title">Group Chat – {activityTitle}</h2>
              <p className="chat-subtitle">Discussion about the activity</p>
            </div>

            {/* Messages */}
            <div className="messages-area">
              {loading && <div style={{ opacity: 0.7 }}>Loading…</div>}
              {!loading && messages.map(m => {
                const name = displayNameFor(m);
                const isMe = m.userId === currentUserId;
                return (
                  <div key={m.id} className={`message-wrapper ${isMe ? 'own-message' : 'other-message'}`}>
                    {!isMe && <Avatar className="message-avatar">{initialFor(name)}</Avatar>}
                    <div className="message-content">
                      {!isMe && <p className="message-author">{name}</p>}
                      <div className={`message-bubble ${isMe ? 'own-bubble' : 'other-bubble'}`}>
                        <p className="message-text">{m.text}</p>
                      </div>
                      <p className="message-time">{m.timestamp}</p>
                    </div>
                    {isMe && <Avatar className="message-avatar own-avatar">{initialFor(myDisplayName)}</Avatar>}
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="input-area">
              <TextField
                fullWidth
                multiline
                maxRows={3}
                placeholder="Type your message..."
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={onKeyDown}
                className="message-input"
              />
              <IconButton
                color="salmon"
                onClick={handleSend}
                className="send-button"
                disabled={!canSend}
                title={notLoggedIn ? "Sign in to send" : (activityId == null ? "Open from activity" : "Send")}
              >
                <Send size={24} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default GroupChat;
