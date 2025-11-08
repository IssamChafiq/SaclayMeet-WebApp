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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
  const [imagePreview, setImagePreview] = useState(placeholder); // URL de l'image à afficher
  const [imageFile, setImageFile] = useState(null); // objet file de l'image sélectionnée
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleImageUpload = (event) => {
    // Récupérer le premier fichier sélectionné
    const file = event.target.files[0];
    if (file) {
      // Stocker le fichier dans le state
      setImageFile(file);
      // Créer une URL de prévisualisation localement
      const reader = new FileReader();
      reader.onloadend = () => {
        // Contient la data URL de l'image
        setImagePreview(reader.result);
      };
      // Lecture du fichier comme dataURL
      reader.readAsDataURL(file);
    }
  };

  const handleCreateActivity = async () => {
    const formDataToSend = new FormData();
    
    // Ajouter les données du formulaire
    formDataToSend.append('title', formData.title);
    formDataToSend.append('place', formData.place);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('startTime', formData.startTime);
    formDataToSend.append('endTime', formData.endTime);
    formDataToSend.append('description', formData.description);
    
    // Ajouter l'image si elle existe
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    
    try {
      const response = await fetch('http://localhost:8080/api/activities', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (!response.ok) throw new Error('Failed to create activity');
      
      setSnackbar({
        open: true,
        message: 'Activity created successfully!',
        severity: 'success'
      });
      
      // Rediriger après 1.5 secondes pour laisser le temps de voir le message
      setTimeout(() => navigate('/viewActivities'), 1500);
    } catch (error) {
      console.error('Error creating activity:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create activity',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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
            {/* Image upload */}
            <div className="image-upload-container">
              <img className="image-placeholder" src={imagePreview} alt="Activity preview"/>
              <input
                accept="image/*" // accepte que les images
                style={{ display: 'none' }} // On le cache parce que c'est moche
                id="image-upload-input"
                type="file"
                onChange={handleImageUpload}
              />
              {/*Label qui agit comme bouton pour l'input caché*/}
              <label htmlFor="image-upload-input">
                <Button
                  variant="contained"
                  color="salmon"
                  component="span"
                  className="upload-button"
                >
                  Upload Image
                </Button>
              </label>
            </div>

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
              
              <div className="filter-category">
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Study" 
                  />
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Party" 
                  />
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Outing" 
                  />
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Movie" 
                  />
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Games" 
                  />
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Sport" 
                  />
                  <FormControlLabel 
                      control={<Checkbox color="salmon" defaultUnchecked />} 
                      label="Cultural" 
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
            onClick={handleCreateActivity}
          >
            Create activity
          </Button>
        </div>
      </div>

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default CreateActivity;