import "./BackButton.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button 
            className="back-button"
            startIcon={<ArrowLeft size={24}/>}
            color='inherit'
            onClick={() => navigate(-1)} 
          >Back
          </Button>
    );
}

export default BackButton;