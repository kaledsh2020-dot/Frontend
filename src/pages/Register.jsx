import { useState }          from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth }           from "../context/AuthContext";
import API                   from "../api/axios";
import toast                 from "react-hot-toast";

const Register = () => {
  const [form, setForm]       = useState({ name:"", email:"", password:"", phone:"" });
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", form);
      login(data.token, data.user);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name"     placeholder="Full Name"     value={form.name}     onChange={handleChange} style={styles.input} required />
          <input name="email"    type="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
          <input name="password" type="password" placeholder="Password (min 6)" value={form.password} onChange={handleChange} style={styles.input} required />
          <input name="phone"    placeholder="Phone Number"  value={form.phone}    onChange={handleChange} style={styles.input} />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

const styles = {
  page:  { minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc" },
  card:  { background:"#fff", padding:"2.5rem", borderRadius:"16px", width:"100%", maxWidth:"420px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)" },
  title: { textAlign:"center", color:"#1e1b4b", marginBottom:"1.5rem" },
  input: { width:"100%", padding:"0.75rem 1rem", marginBottom:"1rem", border:"1px solid #e2e8f0", borderRadius:"8px", fontSize:"1rem", boxSizing:"border-box" },
  btn:   { width:"100%", padding:"0.85rem", background:"#6366f1", color:"#fff", border:"none", borderRadius:"8px", fontSize:"1rem", cursor:"pointer" },
  link:  { textAlign:"center", marginTop:"1rem", color:"#64748b", fontSize:"0.9rem" },
};

export default Register;