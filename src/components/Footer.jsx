const Footer = () => (
  <footer style={styles.footer}>
    <p style={styles.text}>© 2025 Evaesthetic Smart Clinic. All rights reserved.</p>
  </footer>
);

const styles = {
  footer: { background:"#1e1b4b", color:"#c7d2fe", textAlign:"center", padding:"1.5rem", marginTop:"4rem" },
  text:   { margin:0, fontSize:"0.9rem" },
};

export default Footer;