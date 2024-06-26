import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../Api Base URL/axios";
import "./Register.css";

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
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
    }),
    onSubmit: async (values) => {
      console.log("Form Values:", values);     

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("full_name", values.full_name);
        formDataToSend.append("email", values.email);
        formDataToSend.append("password", values.password);

        console.log("FormData to Send:", formDataToSend);
        
        const response = await axios.post(
          "/api/register", 
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = response.data;
        console.log(data);
        alert(data.message); // Display success message
      } catch (error) {
        console.error("Error:", error);
        // Handle registration failure here
        alert("Registration failed. Please try again."); // Display error message
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="registration-form"
        encType="multipart/form-data"
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="full_name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="full_name"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <div className="error-message" style={{ color: "red" }}>
                {formik.errors.full_name}
              </div>
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
              className="form-control"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message" style={{ color: "red" }}>
                {formik.errors.email}
              </div>
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
              className="form-control"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message" style={{ color: "red" }}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="register-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
