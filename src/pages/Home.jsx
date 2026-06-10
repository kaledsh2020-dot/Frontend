import { useEffect, useState } from "react";
import { useNavigate }         from "react-router-dom";
import API                     from "../api/axios";
import ServiceCard             from "../components/ServiceCard";
import ReviewCard              from "../components/ReviewCard";
import LoadingSpinner          from "../components/LoadingSpinner";

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews,  setReviews]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([API.get("/services"), API.get("/reviews")])
      .then(([s, r]) => { setServices(s.data); setReviews(r.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* ── Hero Section ── */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>✦ Premium Hair Clinic</span>
          <h1 style={styles.heroTitle}>
            Restore Your Hair,<br />Restore Your Confidence
          </h1>
          <p style={styles.heroSub}>
            World-class DHI & FUE hair transplant with the latest technology.
            Trusted by 5,000+ patients across Turkey.
          </p>
          <div style={styles.heroButtons}>
            <button onClick={() => navigate("/book")}     style={styles.btnPrimary}>Book Appointment</button>
            <button onClick={() => navigate("/services")} style={styles.btnOutline}>View Services</button>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.stat}><strong>5,000+</strong><span>Patients</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong>10+</strong><span>Years</span></div>
            <div style={styles.statDivider} />
            <div style={styles.stat}><strong>98%</strong><span>Success Rate</span></div>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.heroImageInner}>
            <span style={{ fontSize: "6rem" }}>💆</span>
            <p style={{ color: "#c7d2fe", margin: "1rem 0 0" }}>Before / After</p>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <p style={styles.sectionSub}>Advanced treatments tailored to your needs</p>
        <div style={styles.grid}>
          {services.slice(0, 3).map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button onClick={() => navigate("/services")} style={styles.btnSecondary}>
            View All Services →
          </button>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={styles.whySection}>
        <h2 style={styles.sectionTitle}>Why Choose Evaesthetic?</h2>
        <p style={styles.sectionSub}>What makes us different</p>
        <div style={styles.whyGrid}>
          {whyItems.map((item, i) => (
            <div key={i} style={styles.whyCard}>
              <span style={styles.whyIcon}>{item.icon}</span>
              <h4 style={styles.whyTitle}>{item.title}</h4>
              <p style={styles.whySub}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Before / After ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Real Results</h2>
        <p style={styles.sectionSub}>Actual patient transformations</p>
        <div style={styles.beforeAfterGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={styles.baCard}>
              <div style={styles.baImg}>
                <span style={{ fontSize: "3rem" }}>👤</span>
                <p style={{ margin: "0.5rem 0 0", color: "#ef4444", fontSize: "0.8rem", fontWeight: "600" }}>BEFORE</p>
              </div>
              <div style={styles.baArrow}>→</div>
              <div style={{ ...styles.baImg, background: "#f0fdf4" }}>
                <span style={{ fontSize: "3rem" }}>💆</span>
                <p style={{ margin: "0.5rem 0 0", color: "#10b981", fontSize: "0.8rem", fontWeight: "600" }}>AFTER</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      {reviews.length > 0 && (
        <section style={{ ...styles.section, background: "#f8fafc", padding: "4rem 1.5rem" }}>
          <h2 style={styles.sectionTitle}>Patient Reviews</h2>
          <p style={styles.sectionSub}>What our patients say</p>
          <div style={styles.grid}>
            {reviews.slice(0, 3).map((r) => (
              <ReviewCard key={r._id} review={r} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Transform Your Look?</h2>
        <p style={styles.ctaSub}>Book your free consultation today</p>
        <button onClick={() => navigate("/book")} style={styles.ctaBtn}>
          Book Free Consultation
        </button>
      </section>
    </div>
  );
};

const whyItems = [
  { icon: "🏥", title: "Expert Surgeons",      desc: "Board-certified specialists with 10+ years of experience" },
  { icon: "🔬", title: "Latest Technology",    desc: "DHI & Sapphire FUE with the most advanced equipment" },
  { icon: "💊", title: "Full Aftercare",        desc: "Complete post-op support and follow-up program" },
  { icon: "⭐", title: "Proven Results",        desc: "98% success rate across 5,000+ satisfied patients" },
];

const styles = {
  // Hero
  hero:          { display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", background:"linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding:"5rem 3rem", gap:"2rem" },
  heroContent:   { flex:1, minWidth:"280px" },
  heroBadge:     { background:"rgba(99,102,241,0.3)", color:"#c7d2fe", padding:"6px 16px", borderRadius:"20px", fontSize:"0.85rem", fontWeight:"600" },
  heroTitle:     { color:"#fff", fontSize:"clamp(1.8rem, 4vw, 2.8rem)", fontWeight:"800", lineHeight:1.2, margin:"1rem 0" },
  heroSub:       { color:"#a5b4fc", fontSize:"1rem", lineHeight:1.7, maxWidth:"480px" },
  heroButtons:   { display:"flex", gap:"1rem", marginTop:"2rem", flexWrap:"wrap" },
  btnPrimary:    { background:"#6366f1", color:"#fff", padding:"0.85rem 2rem", border:"none", borderRadius:"8px", fontSize:"1rem", cursor:"pointer", fontWeight:"600" },
  btnOutline:    { background:"transparent", color:"#c7d2fe", padding:"0.85rem 2rem", border:"2px solid #4f46e5", borderRadius:"8px", fontSize:"1rem", cursor:"pointer" },
  heroStats:     { display:"flex", alignItems:"center", gap:"1.5rem", marginTop:"2.5rem" },
  stat:          { display:"flex", flexDirection:"column", color:"#fff", gap:"2px" },
  statDivider:   { width:"1px", height:"36px", background:"rgba(255,255,255,0.2)" },
  heroImage:     { flex:1, minWidth:"250px", display:"flex", justifyContent:"center" },
  heroImageInner:{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"3rem", textAlign:"center" },
  // Sections
  section:       { maxWidth:"1100px", margin:"0 auto", padding:"4rem 1.5rem" },
  sectionTitle:  { textAlign:"center", color:"#1e1b4b", fontSize:"1.8rem", fontWeight:"700" },
  sectionSub:    { textAlign:"center", color:"#64748b", marginBottom:"2.5rem" },
  grid:          { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.5rem" },
  btnSecondary:  { background:"transparent", color:"#6366f1", border:"2px solid #6366f1", padding:"0.75rem 2rem", borderRadius:"8px", fontSize:"1rem", cursor:"pointer", fontWeight:"600" },
  // Why
  whySection:    { background:"#f8fafc", padding:"4rem 1.5rem" },
  whyGrid:       { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"1.5rem", maxWidth:"1100px", margin:"0 auto" },
  whyCard:       { background:"#fff", borderRadius:"12px", padding:"2rem 1.5rem", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" },
  whyIcon:       { fontSize:"2.5rem" },
  whyTitle:      { color:"#1e1b4b", margin:"0.75rem 0 0.5rem", fontWeight:"700" },
  whySub:        { color:"#64748b", fontSize:"0.9rem", lineHeight:1.5 },
  // Before/After
  beforeAfterGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.5rem", maxWidth:"1100px", margin:"0 auto" },
  baCard:        { display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", background:"#fff", borderRadius:"12px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  baImg:         { flex:1, background:"#fef2f2", borderRadius:"8px", padding:"1.5rem", textAlign:"center" },
  baArrow:       { fontSize:"1.5rem", color:"#6366f1", fontWeight:"700" },
  // CTA
  ctaSection:    { background:"linear-gradient(135deg, #6366f1, #4f46e5)", padding:"5rem 2rem", textAlign:"center" },
  ctaTitle:      { color:"#fff", fontSize:"2rem", fontWeight:"800", margin:"0 0 1rem" },
  ctaSub:        { color:"#c7d2fe", marginBottom:"2rem" },
  ctaBtn:        { background:"#fff", color:"#6366f1", padding:"1rem 3rem", border:"none", borderRadius:"8px", fontSize:"1.1rem", cursor:"pointer", fontWeight:"700" },
};

export default Home;