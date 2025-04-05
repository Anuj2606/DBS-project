import React from "react";
import "../styles/styles.css";

const Signup = () => {
  return (
    <div className="container">
      <div className="left-section">
        <h1>HYPER</h1>
        <div className="dashboard-preview"></div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Sign-up</h2>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Create password" />
          <button className="btn">Create account</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
