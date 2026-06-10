const ReviewCard = ({ review }) => {
  const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

  return (
    <div style={styles.card}>
      <p style={styles.stars}>{stars}</p>
      <p style={styles.comment}>"{review.comment}"</p>
      <p style={styles.user}>— {review.user?.name || "Anonymous"}</p>
    </div>
  );
};

const styles = {
  card:    { background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" },
  stars:   { color:"#f59e0b", fontSize:"1.2rem", margin:"0 0 0.75rem" },
  comment: { color:"#334155", fontStyle:"italic", lineHeight:1.6, margin:"0 0 1rem" },
  user:    { color:"#94a3b8", fontSize:"0.85rem", margin:0, fontWeight:"600" },
};

export default ReviewCard;