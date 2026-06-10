import { useState, useEffect } from "react";
import API                     from "../api/axios";
import DashboardCard           from "../components/DashboardCard";
import LoadingSpinner          from "../components/LoadingSpinner";
import toast                   from "react-hot-toast";

const statusColor = { pending:"#f59e0b", approved:"#10b981", cancelled:"#ef4444" };

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    API.get("/appointments")
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      setAppointments((prev) =>
        prev.map((a) => a._id === id ? { ...a, status } : a)
      );
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  const pending   = appointments.filter((a) => a.status === "pending").length;
  const approved  = appointments.filter((a) => a.status === "approved").length;
  const cancelled = appointments.filter((a) => a.status === "cancelled").length;

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <DashboardCard title="Total"     value={appointments.length} icon="📋" color="#6366f1" />
        <DashboardCard title="Pending"   value={pending}             icon="⏳" color="#f59e0b" />
        <DashboardCard title="Approved"  value={approved}            icon="✅" color="#10b981" />
        <DashboardCard title="Cancelled" value={cancelled}           icon="❌" color="#ef4444" />
      </div>

      {/* Appointments Table */}
      <h3 style={styles.subTitle}>All Appointments</h3>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id} style={styles.tr}>
                <td style={styles.td}>{a.user?.name}</td>
                <td style={styles.td}>{a.service?.title}</td>
                <td style={styles.td}>{new Date(a.date).toLocaleDateString()}</td>
                <td style={styles.td}>{a.time}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, color: statusColor[a.status], background: statusColor[a.status] + "22" }}>
                    {a.status}
                  </span>
                </td>
                <td style={styles.td}>
                  {a.status === "pending" && (
                    <>
                      <button onClick={() => updateStatus(a._id, "approved")}  style={styles.approveBtn}>Approve</button>
                      <button onClick={() => updateStatus(a._id, "cancelled")} style={styles.cancelBtn}>Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  page:       { maxWidth:"1100px", margin:"0 auto", padding:"3rem 1.5rem" },
  heading:    { color:"#1e1b4b", marginBottom:"1.5rem" },
  subTitle:   { color:"#1e1b4b", marginTop:"2.5rem", marginBottom:"1rem" },
  statsGrid:  { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"1rem" },
  tableWrap:  { overflowX:"auto" },
  table:      { width:"100%", borderCollapse:"collapse", background:"#fff", borderRadius:"12px", overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  thead:      { background:"#f1f5f9" },
  th:         { padding:"1rem", textAlign:"left", color:"#475569", fontSize:"0.85rem", fontWeight:"600" },
  tr:         { borderBottom:"1px solid #f1f5f9" },
  td:         { padding:"1rem", color:"#334155", fontSize:"0.9rem" },
  badge:      { padding:"3px 12px", borderRadius:"20px", fontSize:"0.78rem", fontWeight:"600" },
  approveBtn: { background:"#d1fae5", color:"#059669", border:"none", padding:"4px 10px", borderRadius:"6px", cursor:"pointer", marginRight:"6px", fontSize:"0.8rem" },
  cancelBtn:  { background:"#fee2e2", color:"#ef4444", border:"none", padding:"4px 10px", borderRadius:"6px", cursor:"pointer", fontSize:"0.8rem" },
};

export default AdminDashboard;