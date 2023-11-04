import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { EmailValidation } from "../EmailResetlink/EmailValidation";
import axios from "axios";
const initialValues = {
  gmail: "",
};

const EmailLink = () => {
  // UseNavigate
  const navigation = useNavigate();
  // UseFormik
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: EmailValidation,
    onSubmit: (values) => {
      if (values) {
        if (values.gmail) {
          let mail = values.gmail;
          resetmailApiCall(mail);
        }
      }
    },
  });
  const resetmailApiCall = async (mail) => {
    const headers = {
      "Content-Type": "application/json",
      gmail: mail,
    };
    try {
      await axios
        .post("http://localhost:4000/api/registration/reset/password", headers)
        .then((res) => {
          if (res.status == 200) {
            <ToastContainer />;
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (res.status == 201) {
            <ToastContainer />;
            toast.warning(res.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      <ToastContainer />;
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
            Resetlink<span> Email</span>
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
                  navigation("/login");
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

export default EmailLink;
