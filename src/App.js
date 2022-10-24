import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/users/Home";
import { ProSidebarProvider } from "react-pro-sidebar";
import Appointments from "./components/users/Appointments";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <ProSidebarProvider>
                <Home />
              </ProSidebarProvider>
            }
          ></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/appointments" element={<Appointments />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
