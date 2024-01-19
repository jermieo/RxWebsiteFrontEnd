import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import { isToday } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const ExpenseDetails = () => {
  const [transactions, setTransactions] = useState([]);
  const { date } = useParams();

  useEffect(() => {
    Getcall();
  }, []);

  const columns = [
    { field: "date", headerName: "DATE", width: 250 },
    { field: "expense", headerName: "EXPENSE", width: 200 },
    { field: "amount", headerName: "AMOUNT", width: 250 },

    {
      field: "actions",
      headerName: "ACTIONS",
      width: 200,
      renderCell: (params) => {
        const currentDate = new Date(params.row.date);
        const today = new Date();

        let isDeletable = false;

        // Compare currentDate with today or yesterday using toDateString()
        if (currentDate.toDateString() === today.toDateString()) {
          isDeletable = true;
        }
        return (
          <>
            <Button
              variant="outline-danger"
              onClick={() => isDeletable && handleDelete(params.row._id)}
              disabled={!isDeletable}
            >
              Delete
            </Button>
            <ToastContainer />
          </>
        );
      },
    },
  ];
  const Getcall = async () => {
    await axios
      .get(`http://localhost:4000/api/registration/get/expensedate/${date}`)
      .then((res) => {
        if (res.status == 200) {
          // <ToastContainer />;
          setTransactions(res.data.records);
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

  // Delete Call
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/api/registration/expense/delete/${id}`)
      .then((res) => {
        console.log(res, "res");
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
  return (
    <>
      <div>
        <div
          style={{
            height: 500,
            width: "1400px",
            backgroundColor: "white",
            marginLeft: "350px",
            marginTop: "150px",
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
    </>
  );
};

export default ExpenseDetails;
