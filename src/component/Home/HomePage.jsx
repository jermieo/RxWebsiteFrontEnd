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
            Hello, I'm JermieoRex, a dedicated professional with a Bachelor's
            degree in BCom(Computer Application) from St.Joseph's College and a
            Master's in Computer Applications (MCA). I am deeply passionate
            about coding and have honed my skills to become a proficient
            full-stack developer. Proficient in languages such as HTML, CSS,
            JavaScript and experienced with frameworks like React.js, Node.js, I
            thrive in both front-end and back-end development.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
