import "./ActivityCard.css";
import placeholder from "../assets/placeholder.png";

const ActivityCard = ({ 
    image = placeholder, 
    title = "Title", 
    description ="", 
    tags = [], 
    type = "tag"}) => (
    <div className="activity-card">
        <img src={image} alt={title} className="activity-image" />
        <div className="activity-content">
            <h2 className="activity-title">{title}</h2>
            <p className="activity-description">{description}</p>
            {/* Affichage si on veut voir les tags de l'activité */}
            {type === "tag" && (
                <div className="activity-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                    {tags.length > 3 && (
                        <span className="tag-more">...</span>
                    )}
                </div>
            )}
            {/* Affichage si on est le créateur de l'activité, dans la fenêtre activities created */}
            {type === "owned" && (
                <div className="activity-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                    {tags.length > 3 && (
                        <span className="tag-more">...</span>
                    )}
                </div>
            )}
            {/* Affichage si on est abonné à l'activité, dans la fenêtre upcoming activities */}
            {type === "subscribed" && (
                <div className="activity-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                    {tags.length > 3 && (
                        <span className="tag-more">...</span>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default ActivityCard;