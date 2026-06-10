import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>Evaesthetic</Link>

      <div style={styles.links}>
        <Link to="/services" style={styles.link}>Services</Link>
        <Link to="/blog"     style={styles.link}>Blog</Link>

        {user ? (
          <>
            <Link to={user.role === "admin" ? "/admin" : "/dashboard"} style={styles.link}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btnLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 2rem", background:"#1e1b4b", color:"#fff" },
  brand:   { color:"#fff", textDecoration:"none", fontSize:"1.4rem", fontWeight:"700" },
  links:   { display:"flex", alignItems:"center", gap:"1.5rem" },
  link:    { color:"#c7d2fe", textDecoration:"none", fontSize:"0.95rem" },
  btn:     { background:"transparent", border:"1px solid #c7d2fe", color:"#c7d2fe", padding:"0.4rem 1rem", borderRadius:"6px", cursor:"pointer" },
  btnLink: { background:"#6366f1", color:"#fff", padding:"0.4rem 1rem", borderRadius:"6px", textDecoration:"none" },
};

export default Navbar;