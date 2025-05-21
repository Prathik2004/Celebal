import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/RegisterForm.css";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
};

const countries = Object.keys(countryCityMap);

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation function
  const validate = () => {
    const errs = {};

    if (!form.firstName.trim()) errs.firstName = "First Name is required";
    if (!form.lastName.trim()) errs.lastName = "Last Name is required";
    if (!form.username.trim()) errs.username = "Username is required";

    if (!form.email.trim()) errs.email = "E-mail is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    )
      errs.email = "Invalid E-mail address";

    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";

    if (!form.phoneNumber.trim()) errs.phoneNumber = "Phone number is required";
    else if (!/^\d{7,15}$/.test(form.phoneNumber.trim()))
      errs.phoneNumber = "Invalid phone number";

    if (!form.country) errs.country = "Country is required";
    if (!form.city) errs.city = "City is required";

    if (!form.panNo.trim()) errs.panNo = "PAN No. is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNo.trim().toUpperCase()))
      errs.panNo = "Invalid PAN format";

    if (!form.aadharNo.trim()) errs.aadharNo = "Aadhar No. is required";
    else if (!/^\d{12}$/.test(form.aadharNo.trim()))
      errs.aadharNo = "Aadhar must be 12 digits";

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field on change
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Reset city if country changes
    if (name === "country") {
      setForm((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // On success, navigate to Success page passing form data via state
      navigate("/success", { state: { ...form } });
    }
  };

  return (
    <div className="register-form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>
            First Name<span className="required">*</span>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error-input" : ""}
            />
            {errors.firstName && (
              <span className="error-msg">{errors.firstName}</span>
            )}
          </label>

          <label>
            Last Name<span className="required">*</span>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error-input" : ""}
            />
            {errors.lastName && (
              <span className="error-msg">{errors.lastName}</span>
            )}
          </label>
        </div>

        <label>
          Username<span className="required">*</span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && (
            <span className="error-msg">{errors.username}</span>
          )}
        </label>

        <label>
          E-mail<span className="required">*</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </label>

        <label>
          Password<span className="required">*</span>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="show-hide-btn"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </label>

        <label>
          Phone Number<span className="required">*</span>
          <div className="phone-inputs">
            <select
              name="phoneCode"
              value={form.phoneCode}
              onChange={handleChange}
              className="phone-code"
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error-input" : ""}
              placeholder="Number"
            />
          </div>
          {errors.phoneNumber && (
            <span className="error-msg">{errors.phoneNumber}</span>
          )}
        </label>

        <label>
          Country<span className="required">*</span>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className={errors.country ? "error-input" : ""}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="error-msg">{errors.country}</span>
          )}
        </label>

        <label>
          City<span className="required">*</span>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className={errors.city ? "error-input" : ""}
            disabled={!form.country}
          >
            <option value="">Select City</option>
            {form.country &&
              countryCityMap[form.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && <span className="error-msg">{errors.city}</span>}
        </label>

        <label>
          PAN No.<span className="required">*</span>
          <input
            type="text"
            name="panNo"
            value={form.panNo}
            onChange={handleChange}
            className={errors.panNo ? "error-input" : ""}
            placeholder="ABCDE1234F"
            maxLength={10}
          />
          {errors.panNo && <span className="error-msg">{errors.panNo}</span>}
        </label>

        <label>
          Aadhar No.<span className="required">*</span>
          <input
            type="text"
            name="aadharNo"
            value={form.aadharNo}
            onChange={handleChange}
            className={errors.aadharNo ? "error-input" : ""}
            placeholder="123412341234"
            maxLength={12}
          />
          {errors.aadharNo && (
            <span className="error-msg">{errors.aadharNo}</span>
          )}
        </label>

        <button
          type="submit"
          className="submit-btn"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
