import React, { useState, useEffect } from "react";
import "../../styles/global_styles.css";
import Axios from "axios";
import Navbar from "../Navbar";

export default function UpcomingAppointment(props) {
  const [appointmentList, setappointmentList] = useState([]);

  const cancelAppointment = (id) => {
    Axios.post("http://localhost:3001/api/appointments/cancel", {
      id: id,
      pat_id: props.user_id,
    }).then((response) => {
      console.log(response.statusText);
      if (response.statusText === "OK") {
        if (response.data.message === "Appointment Cancelled") {
          alert("Appointment Cancelled Successfully");
          getAppointmentList();
        }
      } else {
        alert("Appointment Cancelling Failed");
      }
    });
  };

  const getAppointmentList = () => {
    Axios.post("http://localhost:3001/api/appointments/getuserappointments", {
      pat_id: props.user_id,
      is_completed: "false",
    }).then((response) => {
      setappointmentList(response.data);
    });
  };

  useEffect(() => {
    getAppointmentList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar name={props.name} />
      <div className="page-body">
        <hr />
        <h3>Upcoming Appointment</h3>
        <hr />
        <br />
        <div className="tab-container">
          <table className="table table-striped">
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
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Cancel Appointment on: " +
                                val.date +
                                " at: " +
                                val.time
                            )
                          ) {
                            cancelAppointment(val.id);
                          }
                        }}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
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
