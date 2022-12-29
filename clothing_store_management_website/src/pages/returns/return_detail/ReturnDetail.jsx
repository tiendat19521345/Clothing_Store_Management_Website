import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import "./ReturnDetail.css";
import axios from "axios";

const headCells = [
  {
    id: "ProductsID",
    numeric: false,

    label: "Mã sản phẩm",
  },
  {
    id: "Products",
    numeric: true,

    label: "Tên sản phẩm",
  },
  {
    id: "Prices",
    numeric: true,

    label: "Giá (VNĐ)",
  },
  {
    id: "Number",
    numeric: true,

    label: "Số lượng",
  },
  {
    id: "NumberReturns",
    numeric: true,

    label: "Số lượng trả",
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={index === 0 ? { paddingLeft: "30px" } : {}}
            key={headCell.id}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ReturnForm({ returnOrderId }) {
  const [returnOrder, setReturnOrder] = useState([]);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    console.log(returnOrderId);
    axios
      .get(
        `http://localhost:5000/api/returnOrder/${returnOrderId}`
      )
      .then((res) => {
        setReturnOrder(res.data);
      })
      .catch(() => {
        alert("Lỗi call api");
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  console.log(returnOrderId);
  return (
    <div className="form">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <div className="return-detail-heading">
            <p>
              Mã hoá đơn: <b>{returnOrder.order?._id}</b>
            </p>
            <p>
              Tên khách hàng: {returnOrder?.order?.customer?.name || "Khách lẻ"}
            </p>
            <p>
              Số điện thoại: {returnOrder?.order?.customer?.phone || "Không có"}{" "}
            </p>
          </div>
          <TableContainer>
            <Table
              className="return-detail-table"
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                rowCount={returnOrder?.returnOrderDetails?.length}
              />
              <TableBody>
                {returnOrder?.returnOrderDetails
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((returnOrderItem, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        cursor={"pointer"}
                        sx={{ cursor: "pointer" }}
                        hover
                        key={returnOrderItem?._id}
                      >
                        <TableCell
                          sx={{ paddingLeft: "30px" }}
                          component="th"
                          id={labelId}
                        >
                          {returnOrderItem?.orderDetail?.product?._id.substr(
                            returnOrderItem?.orderDetail?.product?._id.length -
                              10
                          )}
                        </TableCell>
                        <TableCell>
                          {returnOrderItem?.orderDetail?.product?.name}
                        </TableCell>
                        <TableCell>
                          {returnOrderItem?.orderDetail?.product.salePrice.toLocaleString(
                            "en"
                          )}
                        </TableCell>
                        <TableCell> {returnOrderItem?.oldQuantity}</TableCell>
                        <TableCell>
                          {returnOrderItem?.returnedQuantity}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Số hàng hiển thị"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={returnOrder.returnOrderDetails?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Thu nhỏ "
        />
      </Box>
    </div>
  );
}
