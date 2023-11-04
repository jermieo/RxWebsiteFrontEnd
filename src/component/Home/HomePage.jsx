import React from "react";
import "../Home/Home.css";
import { Link, NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="hero">
        <nav className="nav">
          <h2 className="logo">
            <i class="fa fa-spinner fa-spin" style={{ color: "red" }}></i>
            RX<span> Website</span>
          </h2>
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Registration</NavLink>
            </li>
            <li>
              <NavLink to="">about</NavLink>
            </li>
          </ul>
        </nav>
        <div className="div2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            debitis excepturi quos est, dolore ipsum repellat delectus ipsam?
            Quaerat, ipsum? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Cumque debitis excepturi quos est, dolore ipsum repellat
            delectus ipsam? Quaerat, ipsum?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Cumque debitis excepturi quos est,
            dolore ipsum repellat delectus ipsam? Quaerat, ipsum? Cumque debitis
            excepturi quos est, dolore ipsum repellat delectus ipsam? Quaerat,
            ipsum? ipsum repellat delectus ipsam? Quaerat, ipsum? Cumque debitis
            excepturi quos est, dolore ipsum repellat delectus ipsam? Quaerat,
            ipsum?
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
