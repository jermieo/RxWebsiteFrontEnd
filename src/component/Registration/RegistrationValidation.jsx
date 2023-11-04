import React from "react";
import * as Yup from "yup";
export const RegistrationValidation = Yup.object({
  firstname: Yup.string().min(3).required("Please Enter firstname "),
  lastname: Yup.string().min(3).required("Please Enter lastname "),
  gmail: Yup.string()
    .email("please Enter Valid email")
    .required("Please Enter email "),
  password: Yup.string().min(5).required("Please Enter password "),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password Not match"
  ),
});
