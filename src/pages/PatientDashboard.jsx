import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import { useAuth }             from "../context/AuthContext";
import API                     from "../api/axios";
import LoadingSpinner          from "../components/LoadingSpinner";
import toast                   from "react-hot-toast";

const statusColor = { pending:"#f59e0b", approved:"#10b981", cancelled:"#ef4444" };

const PatientDashboard = () => {
  const { user }                          = useAuth();
  const [appointments, setAppointments]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/appointments")
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    try {
      await API.put(`/appointments/${id}`, { status: "cancelled" });
      setAppointments((prev) =>
        prev.map((a) => a._id === id ? { ...a, status: "cancelled" } : a)
      );
      toast.success("Appointment cancelled");
    } catch {
      toast.error("Failed to cancel");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Welcome, {user?.name} 👋</h2>

      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1.5rem" }}>
        <button onClick={() => navigate("/book")} style={styles.btn}>+ Book Appointment</button>
      </div>

      {appointments.length === 0 ? (
        <p style={styles.empty}>No appointments yet.</p>
      ) : (
        <div style={styles.list}>
          {appointments.map((a) => (
            <div key={a._id} style={styles.card}>
              <div>
                <h4 style={styles.service}>{a.service?.title}</h4>
                <p style={styles.info}>📅 {new Date(a.date).toLocaleDateString()} at {a.time}</p>
                {a.notes && <p style={styles.notes}>{a.notes}</p>}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                <span style={{ ...styles.badge, background: statusColor[a.status] + "22", color: statusColor[a.status] }}>
                  {a.status}
                </span>
                {a.status === "pending" && (
                  <button onClick={() => handleCancel(a._id)} style={styles.cancelBtn}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page:      { maxWidth:"900px", margin:"0 auto", padding:"3rem 1.5rem" },
  heading:   { color:"#1e1b4b", marginBottom:"1rem" },
  btn:       { background:"#6366f1", color:"#fff", padding:"0.65rem 1.5rem", border:"none", borderRadius:"8px", cursor:"pointer" },
  empty:     { textAlign:"center", color:"#94a3b8", marginTop:"3rem" },
  list:      { display:"flex", flexDirection:"column", gap:"1rem" },
  card:      { background:"#fff", border:"1px solid #e2e8f0", borderRadius:"12px", padding:"1.25rem 1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center" },
  service:   { margin:"0 0 0.3rem", color:"#1e1b4b" },
  info:      { margin:0, color:"#64748b", fontSize:"0.9rem" },
  notes:     { margin:"0.3rem 0 0", color:"#94a3b8", fontSize:"0.85rem" },
  badge:     { padding:"4px 14px", borderRadius:"20px", fontSize:"0.8rem", fontWeight:"600" },
  cancelBtn: { background:"#fee2e2", color:"#ef4444", border:"none", padding:"0.4rem 1rem", borderRadius:"6px", cursor:"pointer", fontSize:"0.85rem" },
};

export default PatientDashboard;