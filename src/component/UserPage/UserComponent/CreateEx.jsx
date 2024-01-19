import { React, useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEx = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expense, Expense] = useState("");
  const navigation = useNavigate();
  //  Expense State
  const handleExpenseChange = (e) => {
    Expense(e.target.value);
  };
  // Amount State
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  //  Date State
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  // Form Submit
  const handleSubmit = () => {
    if (!amount == "" && !date == "" && !expense == "") {
      const obj = {
        amount: parseFloat(amount),
        date: date,
        expense: expense,
      };
      postcall(obj);
      // navigation("/user/expensive/view");

      // Clear form fields after submission
      setAmount("");
      setDate("");
      Expense("");
    } else {
      <ToastContainer />;
      toast.warning("Form is Empty pls Enter the Amount or Date or Expense", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // Post Call
  const postcall = async (values) => {
    await axios
      .post("http://localhost:4000/api/registration/create/expense", values)
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
      .catch((error) => {
        <ToastContainer />;
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div>
      <div
        style={{
          marginLeft: "600px",
          marginTop: "100px",
          height: "200px",
          width: "500px",
        }}
      >
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">expense</InputGroup.Text>
          <Form.Control
            type="text"
            value={expense}
            onChange={handleExpenseChange}
            placeholder="Enter text"
            aria-label="text"
            required
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Amount</InputGroup.Text>
          <Form.Control
            type="Number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
            aria-label="Amount"
            required
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Form.Control
          type="date"
          value={date.toLocaleString()}
          onChange={handleDateChange}
          required
          className="mb-3"
        />

        <div className="text-center mb-3">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>{" "}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CreateEx;
