import React, { useState } from "react";
import axios from "axios"; 
import img1 from "../assets/img1.jpg"; 
import "./login.css"; 
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        
        console.log(response);
        if (response.data.success) {
          setMessage("Login successful!");
          setIsModalOpen(true); 
        } else {
          setMessage("Invalid credentials, please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={img1} alt="Login Illustration" />
      </div>

      <div className="auth-box">
        <h2>Login to Your Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          
              Don't have an account? <Link to="/">Sign up here</Link>
          </p>

        {message && <p className="message">{message}</p>}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Success!</h3>
              <p>Login successful!</p>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
