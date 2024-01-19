import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";

import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const ViewEx = () => {
  const [transactions, setTransactions] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    Getcall();
  }, []);

  const handleViewDetails = (date) => {
    // Navigate to "/expenseDetails" route with the selected date
    navigation(`/expenseDetails/${date}`);
  };

  const columns = [
    { field: "_id", headerName: "DATE", width: 250 },
    { field: "totalAmount", headerName: "TOTAL EXPENSE AMOUNT", width: 250 },
    { field: "count", headerName: "TOTAL COUNT", width: 250 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 200,
      renderCell: (params) => {
        const date = params.row._id; // Assuming '_id' is the date field
        return (
          <>
            <Button
              onClick={() => handleViewDetails(date)}
              style={{ marginRight: 5 }}
            >
              <FaEye />
            </Button>
          </>
        );
      },
    },
  ];

  // GET Expense Data
  const Getcall = async () => {
    await axios
      .get("http://localhost:4000/api/registration/get/expense")
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
    <>
      <div
        style={{
          height: 500,
          width: "100%",
          backgroundColor: "white",
          marginLeft: "150px",
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
    </>
  );
};

export default ViewEx;
