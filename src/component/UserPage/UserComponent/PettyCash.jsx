import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isToday } from "date-fns";

const PettyCash = () => {
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "date", headerName: "DATE", width: 250 },
    { field: "amount", headerName: "AMOUNT", width: 180 },
    { field: "expense", headerName: "EXPENSE", width: 200 },
    { field: "totalamt", headerName: "TOTAL AMOUNT", width: 170 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 200,
      renderCell: (params) => {
        const currentDate = new Date(params.row.date);
        const today = new Date();

        let isEditable = false;
        let isDeletable = false;

        // Compare currentDate with today or yesterday using toDateString()
        if (currentDate.toDateString() === today.toDateString()) {
          isEditable = true;
          isDeletable = true;
        }
        return (
          <>
            <Button
              variant="outline-warning"
              onClick={() => isEditable && handleEdit(params.row._id)}
              style={{ marginRight: 5 }}
              disabled={!isEditable}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => isDeletable && handleDelete(params.row._id)}
              disabled={!isDeletable}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [check, setCheck] = useState(false);
  const [Edit_id, updateID] = useState("");
  const [checkbutton, checkButton] = useState(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // edit
  const handleEdit = (id) => {
    checkButton(true);
    updateID(id);
    transactions.filter((value) => {
      if (value._id === id) {
        setAmount(value.amount);
        const dateObject = new Date(value.date);
        const currentDate = dateObject.toISOString().split("T")[0];
        setDate(currentDate);
        setCheck(true);
      }
    });
  };
  // Update call
  const handleUpdateCall = async (newTransaction) => {
    let data = {
      _id: Edit_id,
      amount: parseInt(newTransaction.amount),
      date: newTransaction.date,
      totalamt: parseInt(newTransaction.amount),
    };
    await axios
      .put("http://localhost:4000/api/registration/pettycash/update", data)
      .then((res) => {
        if (res.status == 200) {
          Getcall();
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
  // Delete Call
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/registration/pettycash/delete/${id}`)
      .then((res) => {
        if (res.status == 200) {
          Getcall();
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
  // Post Call
  const postcall = async (values) => {
    await axios
      .post("http://localhost:4000/api/registration/create/pettycash", values)
      .then((res) => {
        if (res.status == 200) {
          Getcall();
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

  const handleSubmit = () => {
    if (amount && date) {
      if (check == false) {
        const newTransaction = {
          id: transactions.length + 1,
          amount: amount,
          date: date,
          totalamt: amount,
        };
        postcall(newTransaction);
      } else if (check == true) {
        const newTransaction = {
          amount: amount,
          date: date,
          totalamt: amount,
        };
        checkButton(false);
        handleUpdateCall(newTransaction);
      }
      // Clear form fields after submission
      setAmount("");
      setDate("");
    } else {
      toast.warning("Amount and date are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  useEffect(() => {
    Getcall();
  }, []);
  // Getcall Api;
  const Getcall = async () => {
    await axios
      .get("http://localhost:4000/api/registration/get/pettycash")
      .then((res) => {
        if (res.status == 200) {
          // <ToastContainer />;
          setTransactions(res.data.GetallData);
          // toast.success(res.data.message, {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
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
          disabled={checkbutton}
        />

        <div className="text-center mb-3">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>{" "}
          <ToastContainer />
        </div>
      </div>
      <div
        style={{
          height: 400,
          width: "100%",
          backgroundColor: "white",
          marginLeft: "150px",
        }}
      >
        <DataGrid
          rows={transactions}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default PettyCash;
