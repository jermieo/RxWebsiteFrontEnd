import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
const initialValues = {
  address1: "",
  address2: "",
  country: "",
  state: "",
  city: "",
  language: "",
  mobileNumber: "",
};

const Profile = () => {
  const [data, setData] = useState([]);
  const [forms, StateValue] = useState(initialValues);
  const navigation = useNavigate();
  // Dropdown
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [cityValue, setCity] = useState(0);
  const [languageValue, setlanguage] = useState(0);
  const [countryValue, setCountryValue] = useState(0);
  const [StatesValue, setStateValue] = useState(0);
  // token
  const [token, setToken] = useState(0);

  //token
  useEffect(() => {
    let token = localStorage.getItem("AuthorizationJwt");
    setToken(token);
    getdata(token);
  }, []);
  // Form update
  const onchange = (e) => {
    const { name, value } = e.target;
    StateValue({ ...forms, [name]: value });
  };
  // data assign
  forms.city = cityValue;
  forms.language = languageValue;
  forms.country = countryValue;
  forms.state = StatesValue;
  // Form Submit
  const formsubmit = (e) => {
    e.preventDefault();
    updateProfile(forms);
  };
  // get data form profile
  const getdata = async (token) => {
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    try {
      await axios
        .post("http://localhost:4000/api/registration/get/Profiledata", headers)
        // .post(
        //   "https://rxwebsitebackend.onrender.com/api/registration/get/Profiledata",
        //   headers
        // )
        .then((res) => {
          if (res.status == 200) {
            setData(res.data.userdetails);
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
  // update call from profile
  const updateProfile = async (forms) => {
    const headers = {
      "Content-Type": "application/json",
      token: token,
      forms: forms,
    };
    try {
      await axios
        .put("http://localhost:4000/api/registration/update/profile", headers)
        .then((res) => {
          if (res.status == 200) {
            <ToastContainer />;
            toast.success(res.data.message, {
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
    } catch (error) {
      <ToastContainer />;
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "84vw",
        height: "100%",
        padding: "70px",
      }}
    >
      <h1>Profile update</h1>
      <Form>
        {/* First Name */} {/* LastName */}
        {/* Phone Number */}
        <Row>
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder={data.firstname} disabled={true} />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control placeholder={data.lastname} disabled={true} />
          </Col>
          <Col>
            <Form.Label>phone Number</Form.Label>
            <Form.Control
              placeholder={
                data.mobileNumber ? data.mobileNumber : "Enter Mobile Number"
              }
              name="mobileNumber"
              value={forms.mobileNumber}
              onChange={onchange}
              maxLength={10}
            />
          </Col>
        </Row>
        <Row className="mb-3 pt-2">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={data.gmail}
              disabled={true}
            />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group> */}
        </Row>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              placeholder={data.address1 ? data.address1 : "NIl"}
              as="textarea"
              name="address1"
              rows={3}
              value={forms.address1}
              onChange={onchange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder={data.address2 ? data.address2 : "Nil"}
              as="textarea"
              name="address2"
              rows={3}
              value={forms.address2}
              onChange={onchange}
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <h6>Country</h6>
            <CountrySelect
              onChange={(e) => {
                setCountryid(e.id);
                setCountryValue(e.name);
              }}
              placeHolder={
                data.country == "0" || "" ? "Select country" : data.country
              }
            />
          </div>
          <div>
            <h6>State</h6>
            <StateSelect
              countryid={countryid}
              onChange={(e) => {
                setstateid(e.id);
                setStateValue(e.name);
              }}
              placeHolder={
                data.state == "0" || "" ? "Select state" : data.state
              }
            />
          </div>
          <div>
            <h6>City</h6>
            <CitySelect
              countryid={countryid}
              stateid={stateid}
              onChange={(e) => {
                setCity(e.name);
              }}
              placeHolder={data.city == "0" || "" ? "Select city" : data.city}
            />
          </div>
          <div>
            <h6>Language</h6>
            <LanguageSelect
              onChange={(e) => {
                setlanguage(e.name);
              }}
              placeHolder={
                data.language == "0" || "" ? "Select Language" : data.language
              }
            />
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <div>
            <Button
              variant="success"
              type="submit"
              style={{ border: "2px", borderRadius: "15px" }}
              onClick={formsubmit}
            >
              Update
            </Button>
            <ToastContainer />
          </div>
          <div>
            <Button
              style={{ border: "2px", borderRadius: "15px" }}
              onClick={() => {
                navigation("/user/dashboard");
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
