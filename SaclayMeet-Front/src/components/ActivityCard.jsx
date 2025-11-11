import "./ActivityCard.css";
import placeholder from "../assets/placeholder.png";
import Button from '@mui/material/Button';

const ActivityCard = ({ 
    image = placeholder, 
    title = "Title", 
    description ="", 
    tags = [],
    onClick
}) => (
    <div className="activity-card" onClick={onClick} style={{ cursor: "pointer" }}>
        <img src={image} alt={title} className="activity-image" />
        <div className="activity-content">
            <h2 className="activity-title">{title}</h2>
            <p className="activity-description">{description}</p>
            <div className="activity-tags">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
                {tags.length > 3 && (
                    <span className="tag-more">...</span>
                )}
            </div>
        </div>
    </div>
);

export default ActivityCard;