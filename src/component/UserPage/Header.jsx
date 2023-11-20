import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Header = ({ OpenSidebar }) => {
  const logout = () => {
    localStorage.removeItem("AuthorizationJwt");
    navigation("/");
  };
  const navigation = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("AuthorizationJwt")) {
      navigation("/login");
    }
  }, []);
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <a href="https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue%26pli%3D1&ec=GAlAwAE&hl=en&service=accountsettings&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S688754488%3A1700460952991838&theme=glif">
          <BsFillEnvelopeFill className="icon" />
        </a>

        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            <BsPersonCircle className="icon" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Profile</Dropdown.Item>
            <Dropdown.Item href="#" onClick={logout}>
              LogOut
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
