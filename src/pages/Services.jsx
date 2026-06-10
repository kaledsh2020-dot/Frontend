import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import API                     from "../api/axios";
import ServiceCard             from "../components/ServiceCard";
import LoadingSpinner          from "../components/LoadingSpinner";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Our Services</h1>
      <p style={styles.sub}>World-class hair transplant treatments</p>
      <div style={styles.grid}>
        {services.map((s) => (
          <ServiceCard key={s._id} service={s} />
        ))}
      </div>
      <div style={{ textAlign:"center", marginTop:"2rem" }}>
        <button onClick={() => navigate("/book")} style={styles.btn}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

const styles = {
  page:    { maxWidth:"1100px", margin:"0 auto", padding:"3rem 1.5rem" },
  heading: { textAlign:"center", color:"#1e1b4b", fontSize:"2rem" },
  sub:     { textAlign:"center", color:"#64748b", marginBottom:"2.5rem" },
  grid:    { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.5rem" },
  btn:     { background:"#6366f1", color:"#fff", padding:"0.85rem 2.5rem", border:"none", borderRadius:"8px", fontSize:"1rem", cursor:"pointer" },
};

export default Services;