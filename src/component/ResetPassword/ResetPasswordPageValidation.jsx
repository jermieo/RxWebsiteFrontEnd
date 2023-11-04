import React from "react";
import * as Yup from "yup";
export const ResetValidation = Yup.object({
  gmail: Yup.string()
    .email("please Enter Valid email")
    .required("Please Enter email "),
  password: Yup.string().min(5).required("Please Enter password "),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password Not match"
  ),
});
