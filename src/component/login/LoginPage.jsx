import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { FaMarker } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoginValidation } from "./Login.Validation";
import "../login/Login.css";

const LoginPage = () => {
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("AuthorizationJwt")) {
      navigation("/user");
    }
  }, []);

  // UseFormik
  const initialValues = {
    gmail: "",
    password: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidation,
    onSubmit: (values) => {
      values.per;
      if (values) {
        postcall(values);
      }
    },
  });

  // Login user
  const postcall = async (values) => {
    await axios
      .post(
        "https://rxwebsitebackend.onrender.com/api/registration/login",
        values
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          <ToastContainer />;
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.setItem("AuthorizationJwt", res.data.token);
          alert("Successfully Login");
          navigation("/user");
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
    <>
      <div
        className="main"
        style={{
          width: "100vw",
          height: "70vh",
          position: "relative",
          bottom: "100px",
        }}
      >
        <div className="login" style={{ position: "relative", top: "155px" }}>
          <div className="registrationpage">
            <h2>
              <b>
                Login<span> Form</span>
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
              {errors.password && (
                <b style={{ color: "red" }}>{errors.password}</b>
              )}
              <div>
                <a
                  className="atag"
                  onClick={() => {
                    navigation("/emaillink");
                  }}
                >
                  Reset your password
                </a>
              </div>
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
      </div>
    </>
  );
};

export default LoginPage;
