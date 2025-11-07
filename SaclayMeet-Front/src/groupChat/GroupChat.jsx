import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ArrowLeft, Send } from 'lucide-react';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './GroupChat.css';
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

const GroupChat = () => {
  const navigate = useNavigate();
  const currentUserId = 1; // ID de l'utilisateur actuellement connecté
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 2,
      userName: "Alice Martin",
      text: "Salut tout le monde ! J'ai hâte de participer à cette activité !",
      timestamp: "10:30"
    },
    {
      id: 2,
      userId: 1,
      userName: "TestMan McTest",
      text: "Moi aussi ! Quelqu'un sait où exactement dans le bâtiment 620 ?",
      timestamp: "10:32"
    },
    {
      id: 3,
      userId: 3,
      userName: "Jean Dupont",
      text: "C'est au 2ème étage, salle 205",
      timestamp: "10:35"
    },
    {
      id: 4,
      userId: 2,
      userName: "Alice Martin",
      text: "Merci Jean ! Est-ce qu'on doit apporter quelque chose ?",
      timestamp: "10:36"
    },
    {
      id: 5,
      userId: 1,
      userName: "TestMan McTest",
      text: "J'amène mon ordinateur portable comme demandé",
      timestamp: "10:38"
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        userId: currentUserId,
        userName: "TestMan McTest",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="group-chat">
        {/* Header */}
        <div className="header">
          <div className="logo-box">
            <img
              className="logo-saclay-meet"
              alt="Logo saclay meet"
              src={logoSaclayMeet1}
            />
          </div>
          
          <Button 
            className="back-button"
            startIcon={<ArrowLeft size={24}/>}
            color='inherit'
            onClick={() => navigate(-1)} 
          >
            Back
          </Button>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-card">
            {/* Chat Header */}
            <div className="chat-header">
              <h2 className="chat-title">Group Chat - Title</h2>
              <p className="chat-subtitle">Discussion about the activity</p>
            </div>

            {/* Messages Area */}
            <div className="messages-area">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message-wrapper ${message.userId === currentUserId ? 'own-message' : 'other-message'}`}
                >
                  {message.userId !== currentUserId && (
                    <Avatar className="message-avatar">
                      {message.userName.charAt(0)}
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
                      {message.userName.charAt(0)}
                    </Avatar>
                  )}
                </div>
              ))}
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
                onKeyPress={handleKeyPress}
                className="message-input"
              />
              <IconButton 
                color="salmon"
                onClick={handleSendMessage}
                className="send-button"
                disabled={!newMessage.trim()}
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