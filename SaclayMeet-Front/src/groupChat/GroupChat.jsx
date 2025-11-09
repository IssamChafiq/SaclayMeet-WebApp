import { useEffect, useMemo, useRef, useState } from 'react';
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

const GroupChat = () => {
  const navigate = useNavigate();
  const { activityId } = useParams(); // MUST be routed as /groupChat/:activityId

  // user id from localStorage (string -> number)
  const stored = localStorage.getItem("userId");
  const currentUserId = stored ? Number(stored) : NaN; // if null -> NaN

  const [activityTitle, setActivityTitle] = useState("Group Chat");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const messagesEndRef = useRef(null);
  const headerSubtitle = useMemo(() => "Discussion about the activity", []);

  // scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial load
  useEffect(() => {
    let canceled = false;

    (async () => {
      // If the route param is missing, stop loading and show message
      if (!activityId) {
        setLoading(false);
        setErrorMsg("Missing activity id in route. Navigate via /groupChat/:activityId.");
        return;
      }

      try {
        // ensure conversation exists (ignore response errors)
        await fetch(`http://localhost:8080/api/messages/ensure-conversation/${activityId}`, { method: "POST" }).catch(() => {});

        // load activity title
        const aRes = await fetch(`http://localhost:8080/api/activities/${activityId}`);
        if (aRes.ok) {
          const a = await aRes.json();
          if (!canceled) setActivityTitle(a?.title || "Group Chat");
        } else if (!canceled) {
          setErrorMsg("Unable to load activity details.");
        }

        // load messages
        const res = await fetch(`http://localhost:8080/api/messages/activity/${activityId}`);
        if (res.ok) {
          const data = await res.json();
          const mapped = (Array.isArray(data) ? data : []).map(m => ({
            id: m.id,
            userId: m.userId,
            userName: m.userName || "Unknown",
            text: m.body,
            timestamp: fmtTime(m.sentAt),
          }));
          if (!canceled) setMessages(mapped);
        } else if (!canceled) {
          setErrorMsg("Unable to load messages.");
        }
      } catch (e) {
        if (!canceled) setErrorMsg("Network error while loading chat.");
        console.error(e);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => { canceled = true; };
  }, [activityId]);

  // Optional polling (every 5s)
  useEffect(() => {
    if (!activityId) return;
    const t = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/messages/activity/${activityId}`);
        if (!res.ok) return;
        const data = await res.json();
        const mapped = (Array.isArray(data) ? data : []).map(m => ({
          id: m.id,
          userId: m.userId,
          userName: m.userName || "Unknown",
          text: m.body,
          timestamp: fmtTime(m.sentAt),
        }));
        setMessages(mapped);
      } catch {}
    }, 5000);
    return () => clearInterval(t);
  }, [activityId]);

  const canSend = newMessage.trim().length > 0 && !Number.isNaN(currentUserId);

  const handleSendMessage = async () => {
    const body = newMessage.trim();
    if (!body) return;

    if (Number.isNaN(currentUserId)) {
      setErrorMsg("You must be signed in to send messages.");
      return;
    }
    if (!activityId) {
      setErrorMsg("Invalid activity id.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/messages/activity/${activityId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId, body })
      });

      if (!res.ok) {
        setErrorMsg(`Send failed (status ${res.status}).`);
        return;
      }

      const saved = await res.json(); // {id,userId,userName,body,sentAt}
      setMessages(prev => [
        ...prev,
        {
          id: saved.id,
          userId: saved.userId,
          userName: saved.userName || "Me",
          text: saved.body,
          timestamp: fmtTime(saved.sentAt),
        }
      ]);
      setNewMessage('');
    } catch (e) {
      console.error(e);
      setErrorMsg("Network error while sending.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const notLoggedIn = Number.isNaN(currentUserId);

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

        {/* Warnings */}
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {errorMsg && <Alert severity="warning" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          {notLoggedIn && <Alert severity="info" sx={{ mb: 2 }}>You’re not logged in. Sign in to send messages.</Alert>}
          {!activityId && <Alert severity="info" sx={{ mb: 2 }}>Open chat via a specific activity (e.g. “Activity group chat” button).</Alert>}
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-card">
            {/* Chat Header */}
            <div className="chat-header">
              <h2 className="chat-title">Group Chat – {activityTitle}</h2>
              <p className="chat-subtitle">Discussion about the activity</p>
            </div>

            {/* Messages Area */}
            <div className="messages-area">
              {loading && <div style={{ opacity: 0.7 }}>Loading…</div>}

              {!loading && messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-wrapper ${message.userId === currentUserId ? 'own-message' : 'other-message'}`}
                >
                  {message.userId !== currentUserId && (
                    <Avatar className="message-avatar">
                      {message.userName?.charAt(0) || "?"}
                    </Avatar>
                  )}

                  <div className="message-content">
                    {message.userId !== currentUserId && (
                      <p className="message-author">{message.userName}</p>
                    )}
                    <div className={`message-bubble ${message.userId === currentUserId ? 'own-bubble' : 'other-bubble'}`}>
                      <p className="message-text">{message.text}</p>
                    </div>
                    <p className="message-time">{message.timestamp}</p>
                  </div>

                  {message.userId === currentUserId && (
                    <Avatar className="message-avatar own-avatar">
                      {message.userName?.charAt(0) || "M"}
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-area">
              <TextField
                fullWidth
                multiline
                maxRows={3}
                placeholder="Type your message..."
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="message-input"
              />
              <IconButton
                color="salmon"
                onClick={handleSendMessage}
                className="send-button"
                disabled={!canSend}
                title={notLoggedIn ? "Sign in to send" : "Send"}
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
