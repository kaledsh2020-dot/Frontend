import { useState, useEffect } from "react";
import API                     from "../api/axios";
import BlogCard                from "../components/BlogCard";
import LoadingSpinner          from "../components/LoadingSpinner";

const Blog = () => {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/blogs")
      .then((res) => setBlogs(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Hair Transplant Blog</h1>
      <p style={styles.sub}>Medical articles and patient guides</p>
      <div style={styles.grid}>
        {blogs.length === 0
          ? <p style={styles.empty}>No articles yet.</p>
          : blogs.map((b) => <BlogCard key={b._id} blog={b} />)
        }
      </div>
    </div>
  );
};

const styles = {
  page:    { maxWidth:"1100px", margin:"0 auto", padding:"3rem 1.5rem" },
  heading: { textAlign:"center", color:"#1e1b4b", fontSize:"2rem" },
  sub:     { textAlign:"center", color:"#64748b", marginBottom:"2.5rem" },
  grid:    { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1.5rem" },
  empty:   { textAlign:"center", color:"#94a3b8", gridColumn:"1/-1" },
};

export default Blog;