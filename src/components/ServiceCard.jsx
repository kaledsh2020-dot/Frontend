const ServiceCard = ({ service }) => (
  <div style={styles.card}>
    {service.image && <img src={service.image} alt={service.title} style={styles.img} />}
    <div style={styles.body}>
      <h3 style={styles.title}>{service.title}</h3>
      <p style={styles.desc}>{service.description}</p>
      <div style={styles.footer}>
        <span style={styles.price}>${service.price}</span>
        <span style={styles.duration}>{service.duration} min</span>
      </div>
    </div>
  </div>
);

const styles = {
  card:     { border:"1px solid #e2e8f0", borderRadius:"12px", overflow:"hidden", background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  img:      { width:"100%", height:"180px", objectFit:"cover" },
  body:     { padding:"1rem" },
  title:    { margin:"0 0 0.5rem", color:"#1e1b4b", fontSize:"1.1rem" },
  desc:     { color:"#64748b", fontSize:"0.9rem", lineHeight:"1.5" },
  footer:   { display:"flex", justifyContent:"space-between", marginTop:"1rem" },
  price:    { color:"#6366f1", fontWeight:"700", fontSize:"1.1rem" },
  duration: { color:"#94a3b8", fontSize:"0.85rem" },
};

export default ServiceCard;