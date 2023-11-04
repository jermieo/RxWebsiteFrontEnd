import React from "react";
import * as Yup from "yup";
export const EmailValidation = Yup.object({
  gmail: Yup.string()
    .email("please Enter Valid email")
    .required("Please Enter email "),
});
