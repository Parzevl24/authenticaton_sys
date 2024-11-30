import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import img2 from "../assets/img2.jpg";
import { Link } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.dateOfBirth);
      if (selectedDate >= today) {
        newErrors.dateOfBirth = "Date of Birth cannot be in the future.";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number. Must be 10 digits.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", formData);

        if (response.data.success) {
          setMessage("Signup successful!");
          setFormData({
            fullName: "",
            email: "",
            dateOfBirth: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
        } else {
          setMessage("Signup failed. Please try again.");
        }
      } catch (error) {
        setMessage("Error: " + error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={img2} alt="Background" className="signup-image" />
        <div className="signup-form-container">
          <h2>Create an account!</h2>
          <h3>Enter your details to create an account and get started!</h3>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form-row">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="signup-error">{errors.fullName}</p>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="signup-error">{errors.email}</p>}
            </div>

            <div className="signup-form-row">
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <p className="signup-error">{errors.dateOfBirth}</p>}

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="signup-error">{errors.phoneNumber}</p>}
            </div>

            <div className="signup-form-row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="signup-error">{errors.password}</p>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
            </div>

            <button className="signup-button" type="submit">Create Account</button>
          </form>
          {message && <p className={message.includes("success") ? "signup-success" : "signup-error"}>{message}</p>}
          <p className="signup-link">
          Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
