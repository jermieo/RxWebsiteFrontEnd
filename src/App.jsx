import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./component/ErrorPage";
import HomePage from "./component/Home/HomePage";
import LoginPage from "./component/login/LoginPage";
import RegistrationPage from "./component/Registration/RegistrationPage";
import User from "./component/UserPage/User";
import ResetPasswordPage from "./component/ResetPassword/ResetPasswordPage";
import EmailLink from "./component/EmailResetlink/EmailLink";
import Products from "./component/UserPage/UserComponent/Products";
import Home from "./component/UserPage/Home";
import Setting from "./component/UserPage/UserComponent/Setting";
import Profile from "./component/UserPage/UserComponent/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/emaillink" element={<EmailLink />} />
        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Setting />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/resetpwpage" element={<ResetPasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
