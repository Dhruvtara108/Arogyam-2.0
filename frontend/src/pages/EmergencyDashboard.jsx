export default function EmergencyDashboard() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1>🚑 Arogyam Emergency Dashboard</h1>

      <div
        style={{
          marginTop: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: "700px",
        }}
      >
        <h2>🚨 Active Emergency</h2>

        <p><strong>🩺 Injury:</strong> Deep Laceration</p>
        <p><strong>⚠️ Severity:</strong> Critical</p>
        <p><strong>🏥 Hospital:</strong> Apollo Hospital</p>
        <p><strong>👨‍⚕️ Doctor:</strong> Dr. Sarah</p>
        <p><strong>🚑 Ambulance:</strong> AMB-101</p>
        <p><strong>👤 Driver:</strong> Rahul</p>
        <p><strong>⏱ ETA:</strong> 4 minutes</p>

        <hr />

        <h3 style={{ color: "green" }}>
          ✅ Emergency Successfully Dispatched
        </h3>
      </div>
    </div>
  );
}