import React from "react";
import * as Yup from "yup";
export const LoginValidation = Yup.object({
  gmail: Yup.string()
    .email("please Enter Valid email")
    .required("Please Enter email "),
  password: Yup.string().min(5).required("Please Enter password "),
});
