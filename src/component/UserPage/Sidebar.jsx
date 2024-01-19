import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/user/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/user/PettyCash">
            <BsFillArchiveFill className="icon" />
            PettyCash
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link>
            <BsFillGearFill className="icon" /> Expense
            <ul>
              <li className="sidebar-list-item">
                <Link to="/user/expensive/create">
                  <BsMenuButtonWideFill className="icon" />
                  Create
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/user/expensive/view">
                  <BsPeopleFill className="icon" />
                  View
                </Link>
              </li>
            </ul>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
