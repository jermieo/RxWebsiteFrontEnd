import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { FaMarker } from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ResetValidation } from "./ResetPasswordPageValidation";
import axios from "axios";
const initialValues = {
  gmail: "",
  password: "",
  confirmpassword: "",
};

const ResetPasswordPage = () => {
  // UseNavigate
  const navigation = useNavigate();
  // UseFormik
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: ResetValidation,
    onSubmit: (values) => {
      if (values) {
        postcall(values);
      }
    },
  });
  // PostCall update data
  const postcall = async (values) => {
    await axios
      .put(
        "https://rxwebsitebackend.onrender.com/api/registration/update",
        values
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          <ToastContainer />;
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigation("/login");
        } else if (res.status == 201) {
          <ToastContainer />;
          toast.warning(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        <ToastContainer />;
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div
      className="main"
      style={{
        width: "100vw",
        height: "70vh",
        position: "relative",
        bottom: "100px",
      }}
    >
      <div
        className="registrationpage"
        style={{ position: "relative", top: "155px" }}
      >
        <h2>
          <b>
            Reset<span> Password</span>
          </b>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Gmail */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaRegEnvelopeOpen />
            </InputGroup.Text>
            <Form.Control
              placeholder="Enter gmail"
              name="gmail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gmail}
            />
          </InputGroup>
          {errors.gmail && <b style={{ color: "red" }}>{errors.gmail}</b>}
          {/* Password */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaMarker />
            </InputGroup.Text>
            <Form.Control
              placeholder="Enter Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
          </InputGroup>
          {errors.password && <b style={{ color: "red" }}>{errors.password}</b>}
          {/* Confirm Password */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaPenFancy />
            </InputGroup.Text>
            <Form.Control
              placeholder="Enter Confirm Password"
              name="confirmpassword"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmpassword}
            />
          </InputGroup>
          {errors.confirmpassword && (
            <b style={{ color: "red" }}>{errors.confirmpassword}</b>
          )}
          <br />
          <div className="d-flex justify-content-around">
            <div>
              <Button
                variant="success"
                type="submit"
                style={{ border: "2px", borderRadius: "15px" }}
              >
                Submit
              </Button>
              <ToastContainer />
            </div>
            <div>
              <Button
                style={{ border: "2px", borderRadius: "15px" }}
                onClick={() => {
                  navigation("/");
                }}
              >
                Back
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
