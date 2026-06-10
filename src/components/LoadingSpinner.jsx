const LoadingSpinner = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
    <div style={{
      width: "48px", height: "48px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #6366f1",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
    }}/>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingSpinner;