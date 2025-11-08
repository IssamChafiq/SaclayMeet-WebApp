import './CreateActivity.css';
import logoSaclayMeet1 from "../assets/Logo_Saclay-meet.png";
import placeholder from "../assets/placeholder.png";
import NavButtons from "../components/NavButtons";

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const CreateActivity = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Tutoring help',
    place: 'Bat 620',
    date: null,
    startTime: null,
    endTime: null,
    description: 'Please help with tutoring !',
    educationTags: [true, true, true],
    entertainmentTags: [true, true, true]
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="create-activity">
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
            path2="/ViewActivities" 
            path3="/createActivity" 
            current="third"
            inline={true}
          />
        </div>

        {/* Content */}
        <div className="main-content">
          <div className="content-wrapper">
            {/* Image placeholder */}
            <img className="image-placeholder" src={placeholder}/>

            {/* Form */}
            <div className="form-container">
              <div className="form-section">
                <TextField
                  label="Title"
                  fullWidth
                  variant="outlined"
                  placeholder="Tutoring help"
                  defaultValue="Tutoring help"
                />

                <TextField
                  label="Place"
                  fullWidth
                  variant="outlined"
                  placeholder="Bat 620"
                  defaultValue="Bat 620"
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                    label="Date"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      }
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  label="Event time start"
                  fullWidth
                  variant="outlined"
                  type="time"
                  defaultValue="16:00"
                />

                <TextField
                  label="Event time end"
                  fullWidth
                  variant="outlined"
                  type="time"
                  defaultValue="18:00"
                />

                <TextField
                  label="Description"
                  variant="outlined"
                  placeholder="Please help with tutoring !"
                  defaultValue="Please help with tutoring !"
                  fullWidth
                  multiline
                  rows={4}
                />
              </div>
            </div>

            {/* Tags sidebar */}
            <div className="tags-container">
              <h2 className="tags-title">Tags :</h2>
              
              <div className="tag-category">
                <p className="category-title">• Education</p>
                <FormControlLabel 
                  control={<Checkbox color="salmon" defaultUnchecked />} 
                  label="Label" 
                />
                <FormControlLabel 
                  control={<Checkbox color="salmon" defaultUnchecked />} 
                  label="Label" 
                />
                <FormControlLabel 
                  control={<Checkbox color="salmon" defaultUnchecked />} 
                  label="Label" 
                />
              </div>

              <div className="tag-category">
                <p className="category-title">• Entertainement</p>
                <FormControlLabel 
                  control={<Checkbox color="salmon" defaultUnchecked />} 
                  label="Label" 
                />
                <FormControlLabel 
                  control={<Checkbox color="salmon" defaultUnchecked />} 
                  label="Label" 
                />
                <FormControlLabel 
                  control={<Checkbox color="salmon" defaultUnchecked />} 
                  label="Label" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Create button */}
        <div className="button-container">
          <Button 
            variant="contained" 
            color="salmon"
            className="create-button"
          >
            Create activity
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CreateActivity;