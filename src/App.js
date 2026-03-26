import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://auth-project-xlxv.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        alert("Login successful 🔥");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  // PROFILE
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://auth-project-xlxv.onrender.com/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Profile error", error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    alert("Logged out ❌");
  };

  // BUTTON STYLE
  const btnStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const logoutStyle = {
    ...btnStyle,
    backgroundColor: "red",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>Auth App 🔐</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button onClick={handleLogin} style={btnStyle}>
          Login
        </button>

        <button onClick={getProfile} style={btnStyle}>
          Get Profile
        </button>

        {user && (
          <div style={{ marginTop: "20px" }}>
            <h3>Profile</h3>
            <p>
              <b>Name:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>

            <button onClick={handleLogout} style={logoutStyle}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;