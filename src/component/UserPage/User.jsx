import React, { useState } from "react";
import "./User.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import PettyCash from "./UserComponent/PettyCash";
import Profile from "./UserComponent/Profile";
import CreateEx from "./UserComponent/CreateEx";
import ViewEx from "./UserComponent/ViewEx";

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
          <Route path="/PettyCash" element={<PettyCash />} />
          <Route path="/expensive">
            <Route path="create" element={<CreateEx />} />
            <Route path="view" element={<ViewEx />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default User;
