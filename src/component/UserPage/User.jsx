import React, { useState } from "react";
import "./User.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Products from "./UserComponent/Products";
import Setting from "./UserComponent/Setting";
import Profile from "./UserComponent/Profile";

const User = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </>
  );
};

export default User;
