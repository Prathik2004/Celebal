import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/RegisterForm.css";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    // Redirect if no data present (e.g. direct access)
    navigate("/");
    return null;
  }

  return (
    <div className="success-container">
      <h2>Registration Successful!</h2>
      <div className="details">
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value}
          </p>
        ))}
      </div>
      <button onClick={() => navigate("/")}>Back to Register</button>
    </div>
  );
};

export default SuccessPage;
