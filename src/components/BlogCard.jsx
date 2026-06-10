const BlogCard = ({ blog }) => (
  <div style={styles.card}>
    {blog.image && <img src={blog.image} alt={blog.title} style={styles.img} />}
    <div style={styles.body}>
      {blog.category && <span style={styles.badge}>{blog.category}</span>}
      <h3 style={styles.title}>{blog.title}</h3>
      <p style={styles.excerpt}>{blog.content?.substring(0, 120)}...</p>
      <p style={styles.author}>By {blog.author?.name || "Admin"}</p>
    </div>
  </div>
);

const styles = {
  card:    { border:"1px solid #e2e8f0", borderRadius:"12px", overflow:"hidden", background:"#fff" },
  img:     { width:"100%", height:"160px", objectFit:"cover" },
  body:    { padding:"1rem" },
  badge:   { background:"#ede9fe", color:"#6366f1", padding:"2px 10px", borderRadius:"20px", fontSize:"0.75rem" },
  title:   { margin:"0.5rem 0", color:"#1e1b4b" },
  excerpt: { color:"#64748b", fontSize:"0.88rem", lineHeight:"1.5" },
  author:  { color:"#94a3b8", fontSize:"0.8rem", marginTop:"0.5rem" },
};

export default BlogCard;