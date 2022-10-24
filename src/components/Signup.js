import React, { useState } from "react";
import Axios from "axios";
import "../styles/auth_styles.css";
import login_image from "../assets/images/login_image.png";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // const [userList, setUserList] = useState([]);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/api/get").then((response) => {
  //     setUserList(response.data);
  //     setRetrievedEmail(response.data[0].email);
  //     setRetrievedPassword(response.data[0].password);
  //     console.log(response);
  //   });
  // }, [email, password]);

  const registerUser = (event) => {
    Axios.post("http://localhost:3001/api/auth/register", {
      name: name,
      email: email,
      reg_no: regNo,
      password: password,
      gender: gender,
      phone: phone,
    }).then((response) => {
      console.log(response.statusText);
      if (
        email === "" ||
        password === "" ||
        name === "" ||
        regNo === "" ||
        phone === ""
      ) {
        alert("Please fill out all the fields");
      } else if (response.data.message === "Not-Found") {
        alert("User already exist");
      } else if (response.statusText === "OK") {
        alert("User Registered Successfully, Login with same credentials");
        navigate("/");
      }
    });
    event.preventDefault();
    // setUserList([...userList, { email: email, password: password }]);
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
            <h1>SIGN UP</h1>
            <br />
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                placeholder="Enter Registration Number"
                name="reg_no"
                onChange={(e) => {
                  setRegNo(e.target.value);
                }}
              />
              <br />
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <input
                type="tel"
                placeholder="Enter Phone"
                name="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <br />
              <select
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value="male" selected>
                  Male
                </option>
                <option value="female">Female</option>
                <option value="not-set">Rather Not To Say</option>
              </select>

              <br />
              <input
                type="password"
                placeholder="Enter Password"
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
                Sign Up
              </button>
              <br />
              <Link id="signup-text" to="/">
                Already have an Account? <b>Login</b>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
