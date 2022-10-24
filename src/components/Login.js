import React, { useState } from "react";
import Axios from "axios";
import "../styles/auth_styles.css";
import login_image from "../assets/images/login_image.png";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const loginUser = (event) => {
    Axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
      role: role,
    }).then((response) => {
      if (email === "" || password === "") {
        alert("Please enter your email and password");
      } else if (response.data.message === "Not-Found") {
        alert("Invalid Credentials");
      } else if (
        email === response.data[0].email &&
        password === response.data[0].password
      ) {
        alert("Logged In Successfully");
        navigate("/home", { state: { email: email, password: password } });
      }
    });
    event.preventDefault();
  };

  return (
    <>
      <div id="main-body">
        <div id="form-body">
          <div>
            <img width="330px" src={login_image} alt="login_image" />
          </div>
          <div id="vl"></div>
          <div>
            <h1>LOGIN</h1>
            <br />
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />

              <select
                onChange={(e) => {
                  setRole(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value="student" selected>
                  Student
                </option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>

              <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <br />
              <div style={{ width: "90%" }}>
                <a id="forgot-password" href="/">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" id="login-btn">
                Login
              </button>
              <br />
              <Link id="signup-text" to="/signup">
                Don't have an Account? <b>Register</b>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
