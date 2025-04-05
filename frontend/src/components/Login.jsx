import React from "react";
import "../styles/styles.css";

const Login = () => {
  return (
    <div className="container">
      <div className="left-section">
        <h1>HYPER</h1>
        <div className="dashboard-preview"></div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Login</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          <button className="btn">Login</button>
          <p>
            Don’t have an account? <a href="/signup">Sign-up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
