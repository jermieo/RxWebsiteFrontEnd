import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("AuthorizationJwt");
    getdata(token);
  }, []);
  const getdata = async (token) => {
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    try {
      await axios
        .post("http://localhost:4000/api/registration/get/Profiledata", headers)
        .then((res) => {
          console.log(res, "res");
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
        <Row>
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder={data.firstname} disabled={true} />
          </Col>
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control placeholder={data.lastname} disabled={true} />
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

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <br />
        <div className="d-flex justify-content-around">
          <div>
            {/* <Button
              variant="success"
              type="submit"
              style={{ border: "2px", borderRadius: "15px" }}
            >
              Submit
            </Button> */}
            {/* <ToastContainer /> */}
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
