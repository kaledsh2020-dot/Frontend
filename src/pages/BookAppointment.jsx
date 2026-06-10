
import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import API                     from "../api/axios";
import toast                   from "react-hot-toast";

const BookAppointment = () => {
  const [services, setServices] = useState([]);
  const [form, setForm]         = useState({ service:"", date:"", time:"", notes:"" });
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/services").then((res) => setServices(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/appointments", form);
      toast.success("Appointment booked!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Service</label>
          <select name="service" value={form.service} onChange={handleChange} style={styles.input} required>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>{s.title} — ${s.price}</option>
            ))}
          </select>

          <label style={styles.label}>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} style={styles.input} required />

          <label style={styles.label}>Time</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} style={styles.input} required />

          <label style={styles.label}>Notes (optional)</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} style={{ ...styles.input, height:"100px", resize:"vertical" }} placeholder="Any special requests..." />

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page:  { minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc", padding:"2rem" },
  card:  { background:"#fff", padding:"2.5rem", borderRadius:"16px", width:"100%", maxWidth:"500px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" },
  title: { color:"#1e1b4b", marginBottom:"1.5rem" },
  label: { display:"block", marginBottom:"0.3rem", color:"#475569", fontSize:"0.9rem", fontWeight:"600" },
  input: { width:"100%", padding:"0.75rem 1rem", marginBottom:"1.2rem", border:"1px solid #e2e8f0", borderRadius:"8px", fontSize:"1rem", boxSizing:"border-box" },
  btn:   { width:"100%", padding:"0.85rem", background:"#6366f1", color:"#fff", border:"none", borderRadius:"8px", fontSize:"1rem", cursor:"pointer" },
};

export default BookAppointment;