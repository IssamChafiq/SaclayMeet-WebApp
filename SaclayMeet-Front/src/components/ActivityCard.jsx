// src/components/ActivityCard.jsx
import React from "react";
import "./ActivityCard.css"; // your CSS from the message

/**
 * Props:
 * - title: string (required)
 * - description?: string
 * - tags?: string[]      // e.g. ["Study","Sport"]
 * - imageUrl?: string    // base64 data-URL or http(s) URL
 * - onClick?: () => void // card click handler (navigate to details)
 * - actions?: ReactNode  // optional right/bottom actions (buttons). Use to render Delete/Unsubscribe, etc.
 * - maxTags?: number     // how many tags to show before "+N"
 */
const ActivityCard = ({
  title,
  description = "",
  tags = [],
  imageUrl = "",
  onClick,
  actions,
  maxTags = 3,
}) => {
  const visibleTags = Array.isArray(tags) ? tags.slice(0, maxTags) : [];
  const hiddenCount =
    Array.isArray(tags) && tags.length > maxTags ? tags.length - maxTags : 0;

  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="activity-card"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {/* Image area: if no image, keep the gray box */}
      {imageUrl ? (
        <img
          className="activity-image"
          src={imageUrl}
          alt={title || "Activity image"}
          // prevent drag ghost
          draggable={false}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="activity-image" />
      )}

      {/* Content */}
      <div className="activity-content">
        <h3 className="activity-title">{title}</h3>

        {description && (
          <p className="activity-description">{description}</p>
        )}

        {/* Tags */}
        <div className="activity-tags">
          {visibleTags.map((t, i) => (
            <span key={`${t}-${i}`} className="tag">
              {t}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className="tag-more">+{hiddenCount}</span>
          )}
        </div>

        {/* Optional actions (e.g., Delete / Unsubscribe buttons).
            Make sure buttons call e.stopPropagation() so card click doesn't fire. */}
        {actions ? (
          <div
            className="activity-actions"
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: 12, display: "flex", gap: 8 }}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityCard;
