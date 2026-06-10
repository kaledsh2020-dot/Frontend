const DashboardCard = ({ title, value, icon, color = "#6366f1" }) => (
  <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
    <div style={styles.icon}>{icon}</div>
    <div>
      <p style={styles.value}>{value}</p>
      <p style={styles.title}>{title}</p>
    </div>
  </div>
);

const styles = {
  card:  { background:"#fff", borderRadius:"12px", padding:"1.5rem", display:"flex", alignItems:"center", gap:"1rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  icon:  { fontSize:"2rem" },
  value: { fontSize:"2rem", fontWeight:"700", margin:0, color:"#1e1b4b" },
  title: { color:"#64748b", margin:0, fontSize:"0.9rem" },
};

export default DashboardCard;