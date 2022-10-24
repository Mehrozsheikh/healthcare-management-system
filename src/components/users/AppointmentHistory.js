import React, { useState, useEffect } from "react";
import "../../styles/global_styles.css";
import Axios from "axios";
import Navbar from "../Navbar";

export default function AppointmentHistory(props) {
  const [appointmentList, setappointmentList] = useState([]);

  const getAppointmentList = () => {
    Axios.post(
      "http://localhost:3001/api/appointments/getuserappointmentshistory",
      {
        pat_id: props.user_id,
        is_completed: "false",
      }
    ).then((response) => {
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
        <h3>Appointment History</h3>
        <hr />
        <br />
        <div className="tab-container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.map((val) => {
                return (
                  <tr>
                    <td>{val.date}</td>
                    <td>{val.time}</td>

                    <td>
                      <button className="btn btn-success"> View Details</button>
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
