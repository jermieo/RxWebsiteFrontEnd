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
import PettyCash from "./component/UserPage/UserComponent/PettyCash";
import Home from "./component/UserPage/Home";
import Profile from "./component/UserPage/UserComponent/Profile";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CreateEx from "./component/UserPage/UserComponent/CreateEx";
import ViewEx from "./component/UserPage/UserComponent/ViewEx";
import ExpenseDetails from "./component/UserPage/UserComponent/ExpenseDetails";
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
          <Route path="PettyCash" element={<PettyCash />} />
          <Route path="profile" element={<Profile />} />
          <Route path="expensive">
            <Route path="create" element={<CreateEx />} />
            <Route path="view" element={<ViewEx />} />
          </Route>
        </Route>
        <Route path="/expenseDetails/:date" element={<ExpenseDetails />} />
        <Route path="/resetpwpage" element={<ResetPasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
