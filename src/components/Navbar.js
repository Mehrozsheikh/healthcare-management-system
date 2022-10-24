import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <div style={{ float: "right" }}></div>
          <div style={{ display: "flex" }}>
            <span className="navbar-brand mb-0 h4">Hi, {props.name}</span>
            <Link to="/">
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ fontSize: "34px", color: "black" }}
              ></i>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
