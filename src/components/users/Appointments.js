import React, { useState, useEffect } from "react";
import "../../styles/global_styles.css";
import Axios from "axios";
import Navbar from "../Navbar";

export default function Appointments(props) {
  const [userId, setUserId] = useState("");
  const [appointmentList, setappointmentList] = useState([]);

  const getUserId = () => {
    Axios.post("http://localhost:3001/api/appointments/getuser", {
      email: props.email,
      password: props.password,
    }).then((response) => {
      setUserId(response.data[0].id);
    });
  };
  const bookAppointment = (id) => {
    Axios.post("http://localhost:3001/api/appointments/book", {
      id: id,
      pat_id: userId,
    }).then((response) => {
      console.log(response.statusText);
      if (response.statusText === "OK") {
        if (response.data.message === "Appointment Booked") {
          alert("Appointment Booked Successfully");
          getAppointmentList();
        }
      } else {
        alert("Appointment Booking Failed");
      }
    });
    // setUserList([...userList, { email: email, password: password }]);
  };

  const getAppointmentList = () => {
    Axios.get("http://localhost:3001/api/appointments/get").then((response) => {
      setappointmentList(response.data);
      console.log(response);
    });
  };

  useEffect(() => {
    console.log("Name " + props.name);
    getAppointmentList();
    getUserId();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar name={props.name} />
      <div className="page-body">
        <hr />
        <h3>Book Appointment</h3>
        <hr />
        <br />
        <div className="tab-container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.map((val) => {
                return (
                  <tr>
                    <td>{val.date}</td>
                    <td>{val.time}</td>
                    <td>
                      {val.is_available === "true" ? (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Book Appointment on: " +
                                  val.date +
                                  " at: " +
                                  val.time
                              )
                            ) {
                              bookAppointment(val.id);
                            }
                          }}
                          className="btn btn-success"
                        >
                          Available
                        </button>
                      ) : (
                        <button className="btn btn-danger">Booked</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
