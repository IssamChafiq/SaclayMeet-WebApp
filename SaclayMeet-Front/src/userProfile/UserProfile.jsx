import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import './UserProfile.css';
import NavButtons from '../components/NavButtons';

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

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'TestMan',
    lastName: 'McTest',
    email: 'testtesttest@gmail.com',
    age: '21',
    school: 'Polytech Paris-Saclay',
    level: 'M2',
    bio: 'Nam pellentesque sollicitudin lorem, a malesuada velit suscipit vel. Sed faucibus lobortis nibh, quis sollicitudin justo vulputate et. Morbi dignissim, nisi sit amet posuere dictum, libero dui scelerisque ante, eleifend viverra sapien lorem quis odio. In dignissim nec ligula at congue. Fusce quis scelerisque augue. Aenean sollicitudin nibh vel placerat vulputate. Proin sed purus magna.',
    facebook: '@TestMan',
    snapchat: '@TestMan',
    instagram: '@TestMan',
    linkedin: '@TestMan'
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="profile-page">
        {/* Header */}
        <div className="header">
          <div className="logo-box">
            <img
              className="logo-saclay-meet"
              alt="Logo saclay meet"
              src={logoSaclayMeet1}
            />
          </div>
          
          <NavButtons
            name1="Profile" 
            name2="View activities" 
            name3="Create activity" 
            path1="/userProfile" 
            path2="/ViewActivities" 
            path3="/createActivity" 
            current="first"
            inline={true}
          />
        </div>

        <div className="profile-content">
          {/* Navigation sidebar */}
          <NavButtons
            name1="Profile" 
            name2="Activities created" 
            name3="Upcoming activities" 
            path1="/userProfile" 
            path2="/activitiesCreated" 
            path3="/upcomingActivities" 
            current="first"
            inline={false}
          />

          {/* Main content */}
          <div className="profile-main">
            {/* Avatar section */}
            <div className="profile-header">
              <Avatar
                className="profile-avatar"
                alt="TestMan McTest"
                sx={{ width: 100, height: 100 }}
              />
              <h1 className="profile-name">TestMan McTest</h1>
              <p className="profile-email">testtesttest@gmail.com</p>
            </div>

            {/* Form fields */}
            <div className="profile-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">First name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="TestMan"
                    className="input-field"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Last name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="McTest"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">Email</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="testtesttest@gmail.com"
                    className="input-field"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Age</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="21"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="field-label">School</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="Polytech Paris-Saclay"
                    className="input-field"
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Level</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue="M2"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="bio-section">
                <label className="field-label">Bio</label>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue="Nam pellentesque sollicitudin lorem, a malesuada velit suscipit vel. Sed faucibus lobortis nibh, quis sollicitudin justo vulputate et. Morbi dignissim, nisi sit amet posuere dictum, libero dui scelerisque ante, eleifend viverra sapien lorem quis odio. In dignissim nec ligula at congue. Fusce quis scelerisque augue. Aenean sollicitudin nibh vel placerat vulputate. Proin sed purus magna."
                  className="input-field"
                />
              </div>

              {/* Social media links */}
              <div className="social-section">
                <div className="social-row">
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                      alt="Facebook"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      defaultValue="@TestMan"
                      className="input-field"
                    />
                  </div>
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                      alt="Instagram"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      defaultValue="@TestMan"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="social-row">
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg" 
                      alt="Snapchat"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      defaultValue="@TestMan"
                      className="input-field"
                    />
                  </div>
                  <div className="social-field">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                      alt="LinkedIn"
                      className="social-icon"
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      defaultValue="@TestMan"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserProfile;