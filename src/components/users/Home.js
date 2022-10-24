import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/images/logo.png";
import Appointments from "./Appointments";
import UpcomingAppointment from "./UpcomingAppointment";
import AccountDetails from "./AccountDetails";
import UpdateProfile from "./UpdateProfile";
import AppointmentHistory from "./AppointmentHistory";
import AboutUs from "./AboutUs";
import Axios from "axios";

export default function Home(props) {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [activeList, setActiveList] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const setActive = (index) => {
    for (let i = 0; i < activeList.length; i++) {
      if (i === index) {
        activeList[i] = true;
        setActiveList([...activeList]);
      } else {
        activeList[i] = false;
        setActiveList([...activeList]);
      }
    }
  };

  const manageRoutes = (index) => {
    switch (index) {
      case 0:
        setActive(0);
        break;
      case 1:
        setActive(1);
        break;
      case 2:
        setActive(2);
        break;
      case 3:
        setActive(3);
        break;
      case 4:
        setActive(4);
        break;
      case 5:
        setActive(5);
        break;
      case 6:
        setActive(6);
        break;
      default:
        setActive(0);
    }
  };

  const getUserId = () => {
    Axios.post("http://localhost:3001/api/appointments/getuser", {
      email: location.state.email,
      password: location.state.password,
    }).then((response) => {
      setUserId(response.data[0].id);
      setUserName(response.data[0].name);
    });
  };

  useEffect(() => {
    getUserId();
    // eslint-disable-next-line
  }, []);

  const location = useLocation();
  return (
    <div style={{ display: "flex", height: "100vh", float: "left" }}>
      <Sidebar style={{ textAlign: "start" }}>
        <Menu>
          <div className="menu-header" style={{ textAlign: "center" }}>
            <img width="140px" src={logo} alt="logo" />
          </div>
          <hr />
          <MenuItem
            onClick={() => {
              manageRoutes(0);
            }}
            active={activeList[0]}
          >
            <i className="fa-solid fa-calendar-check fa-icons"></i> Book
            Appointment
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(1);
            }}
            active={activeList[1]}
          >
            <i className="fa-sharp fa-solid fa-calendar-days"></i> Upcoming
            Appointment
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(2);
            }}
            active={activeList[2]}
          >
            <i className="fa-solid fa-user"></i> Account Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(3);
            }}
            active={activeList[3]}
          >
            <i className="fa-solid fa-user-pen"></i> Update Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(4);
            }}
            active={activeList[4]}
          >
            <i className="fa-sharp fa-solid fa-clock-rotate-left"></i>{" "}
            Appointments History
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(5);
            }}
            active={activeList[5]}
          >
            <i className="fa-solid fa-circle-info"></i> About US{" "}
          </MenuItem>
          <Link to="/">
            <MenuItem
              onClick={() => {
                manageRoutes(6);
              }}
              active={activeList[6]}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </MenuItem>
          </Link>
        </Menu>
      </Sidebar>
      {activeList[0] ? (
        <div style={{ float: "right;", display: "block" }}>
          <Appointments
            email={location.state.email}
            password={location.state.password}
            name={userName}
          />
        </div>
      ) : null}
      {activeList[1] ? (
        <div style={{ float: "right;", display: "block" }}>
          <UpcomingAppointment user_id={userId} name={userName} />
        </div>
      ) : null}

      {activeList[2] ? (
        <div style={{ float: "right;", display: "block" }}>
          <AccountDetails />
        </div>
      ) : null}

      {activeList[3] ? (
        <div style={{ float: "right;", display: "block" }}>
          <UpdateProfile />
        </div>
      ) : null}
      {activeList[4] ? (
        <div style={{ float: "right;", display: "block" }}>
          <AppointmentHistory user_id={userId} name={userName} />
        </div>
      ) : null}
      {activeList[5] ? (
        <div style={{ float: "right;", display: "block" }}>
          <AboutUs />
        </div>
      ) : null}
    </div>
  );
}
