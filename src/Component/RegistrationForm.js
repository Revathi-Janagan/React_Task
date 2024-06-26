import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../Api Base URL/axios";
import "./Register.css";

const RegistrationForm = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [formDetails, setFormDetails] = useState([]);

  useEffect(() => {
    fetchFormDetails();
  }, []);

  const fetchFormDetails = async () => {
    try {
      const response = await axios.get("/api/list");
      const data = response.data;
      console.log("Form Details:", data); // Check console to verify data structure
      setFormDetails(data.result); // Update form details state with result array
    } catch (error) {
      console.error("Error fetching form details:", error);
      alert("Failed to fetch form details. Please try again.");
    }
  };

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword:""
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .required("Please Enter the Name!!!")
        .min(3, "Name Must be At least 3 Characters")
        .max(30, "Name Must not Exceed 30 Characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password Must be Minimum 8 Characters"),
        confirmPassword: Yup.string()
        .required("Please Conform your Password")
        .oneOf([Yup.ref("password"),null],"Passwords Must Match")

    }),
    onSubmit: async (values, { resetForm }) => {
      const {confirmPassword,...dataToSend} = values; 
      try {
        const response = await axios.post("/api/register", dataToSend);
        const data = response.data;
        alert(data.message); // Display success message

        // Update registered users state
        setRegisteredUsers([...registeredUsers, dataToSend]);

        // Reset form after successful submission
        resetForm();
        formik.setFieldValue("");
        fetchFormDetails(); // Refresh form details after submission
      } catch (error) {
        console.error("Error:", error);
        alert("Registration failed. Please try again."); // Display error message
      }
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="registration-form">
        <div className="form-row">
          <h1>Register Form</h1>
          <div className="form-group">
            <label htmlFor="full_name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className="form-control"
              {...formik.getFieldProps("full_name")}
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <div className="error-message">{formik.errors.full_name}</div>
            ) : null}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>
          
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
             Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-message">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          
        </div>

        <div className="d-grid">
          <button type="submit" className="register-btn">
            Register
          </button>
        </div>
      </form>

      <div className="form-details">
        <h2>Form Details</h2>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
             
            </tr>
          </thead>
          <tbody>
            {formDetails.map((formData) => (
              <tr key={formData.id}>
                <td>{formData.full_name}</td>
                <td>{formData.email}</td>
                <td>{formData.password}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationForm;
