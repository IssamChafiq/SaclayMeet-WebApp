import "./ActivityCard.css";
import placeholder from "../assets/placeholder.png";

// Normalize an image value into an absolute URL the <img> can use.
// - data URLs: pass through
// - absolute http(s): pass through
// - backend path like "/api/images/12": prefix your backend host
// - falsy/empty: use placeholder
const normalizeImageSrc = (image) => {
  if (!image) return placeholder;
  const s = String(image);

  if (s.startsWith("data:image/")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  // Backend-served relative path
  if (s.startsWith("/api/images")) return `http://localhost:8080${s}`;

  return s;
};

const ActivityCard = ({
  image,
  title = "Title",
  description = "",
  tags = [],
  onClick,
}) => {
  const imgSrc = normalizeImageSrc(image);

  const tagList = Array.isArray(tags)
    ? tags.map((t) => (t == null ? "" : String(t)))
    : [];

  const MAX_TAGS = 3;
  const visibleTags = tagList.slice(0, MAX_TAGS);
  const overflow = tagList.length > MAX_TAGS ? tagList.length - MAX_TAGS : 0;

  return (
    <div
      className="activity-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      style={{ cursor: "pointer" }}
    >
      <img
        src={imgSrc}
        alt={title || "Activity"}
        className="activity-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />
      <div className="activity-content">
        <h2 className="activity-title">{title || "Untitled"}</h2>
        <p
          className="activity-description"
          title={description || ""}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description || ""}
        </p>
        <div className="activity-tags">
          {visibleTags.map((tag, index) => (
            <span key={`${tag}-${index}`} className="tag">
              {tag}
            </span>
          ))}
          {overflow > 0 && <span className="tag-more">+{overflow}</span>}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
