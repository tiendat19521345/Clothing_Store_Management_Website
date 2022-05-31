import React, { useState, useEffect } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "./returns.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ReturnDetail from "./return_detail/ReturnDetail";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import TextField from "@mui/material/TextField";
import { styled, Box } from "@mui/system";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ReturnOrder from "./returnorder/ReturnOrder";
import axios from "axios";
import moment from "moment";
const columns = [
  {
    id: "order._id",
    label: "Mã Hóa Đơn",
  },
  { id: "dateOrder", label: "Ngày tạo" },
  {
    id: "order.customer.name",
    label: "Tên khách hàng",
  },

  {
    id: "order.customer.phone",
    label: "Số điện thoại",
  },
  {
    id: "returnFee",
    label: "Phí trả hàng",
  },
  {
    id: "totalReturnPrice",
    label: "Tiền trả khách",
  },
];
const formateDate = (dateStr) => {
  var date = new Date(dateStr);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
const Returns = () => {
  const [listReturnOrders, setListReturnOrders] = useState([]);
  const [originReturnOrders, setOriginReturnOrders] = useState([]);

  const [returnOrderId, setReturnOrderId] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [showNewFormReturn, setNewFormReturn] = useState(false);
  const [showFormReturnOrder, setShowFormReturnOrder] = useState(false);
  const [filter, setFiler] = useState({
    searchText: "",
    date: "",
  });
  useEffect(() => {
    axios
      .get("https://clothesapp123.herokuapp.com/api/returnOrder")
      .then((res) => {
        setListReturnOrders(res.data);
        setOriginReturnOrders(res.data);
      });
  }, []);
  useEffect(() => {
    if (!filter.searchText && !filter.date) {
      setListReturnOrders(originReturnOrders);
    } else {
      var newListReturnOrders = originReturnOrders.filter((returnOrder) => {
        const dateReturn = new Date(returnOrder.dateReturn);
        const dateApi = moment([
          dateReturn.getFullYear(),
          dateReturn.getMonth(),
          dateReturn.getDate(),
        ]);

        const dateFilter = moment([
          new Date(filter.date).getFullYear(),
          new Date(filter.date).getMonth(),
          new Date(filter.date).getDate(),
        ]);
        if (filter.date) {
          return (
            (returnOrder.order._id.indexOf(
              filter.searchText.replace(/\s/g, "")
            ) >= 0 ||
              returnOrder.order.customer?.name.indexOf(filter.searchText) >=
                0 ||
              returnOrder.order.customer?.phone.indexOf(
                filter.searchText.replace(/\s/g, "")
              ) >= 0) &&
            dateApi.diff(dateFilter, "days") === 0
          );
        } else {
          return (
            returnOrder.order._id.indexOf(
              filter.searchText.replace(/\s/g, "")
            ) >= 0 ||
            returnOrder.order.customer?.name.indexOf(filter.searchText) >= 0 ||
            returnOrder.order.customer?.phone.indexOf(
              filter.searchText.replace(/\s/g, "")
            ) >= 0
          );
        }
      });
      setListReturnOrders(newListReturnOrders);
    }
  }, [filter]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="returns">
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={showNewFormReturn}
        onClose={() => {
          setNewFormReturn(false);
        }}
        BackdropComponent={Backdrop}
      >
        <ReturnDetail
          returnOrderId={returnOrderId}
          setNewFormReturn={setNewFormReturn}
        />
      </StyledModal>
      <ReturnOrder
        open={showFormReturnOrder}
        handleCancel={() => {
          setShowFormReturnOrder(false);
        }}
      />
      <div className="returns_header">
        <div className="returns_search">
          <input
            value={filter.searchText}
            onChange={(e) => {
              setFiler({ ...filter, searchText: e.target.value });
            }}
            type="text"
            placeholder="Tìm kiếm"
          />
          <i className="bx bx-search"></i>
        </div>
        <div className="returns_datepicker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              InputProps={{
                disableUnderline: true,
              }}
              error={false}
              helperText={null}
              inputFormat="dd/MM/yyyy"
              views={["day", "month", "year"]}
              label={filter.date ? "" : "Chọn ngày"}
              value={filter.date}
              onChange={(newDate) => {
                setFiler({ ...filter, date: newDate });
              }}
              renderInput={(params) => (
                <TextField
                  InputLabelProps={{
                    shrink: false,
                  }}
                  style={{
                    border: "1px solid #67dbdb",
                    borderRadius: 5,
                    background: "#fff",
                  }}
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="returns_action">
          <button
            onClick={() => {
              setShowFormReturnOrder(true);
            }}
            className="returns_action_btn"
          >
            <i class="fas fa-plus"></i>
            <b>Trả hàng</b>
          </button>
        </div>
      </div>
      <div className="returns_body">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 480 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>
                    <button></button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listReturnOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((returnOrder) => {
                    return (
                      <TableRow
                        onClick={() => {
                          setReturnOrderId(returnOrder._id);
                          setNewFormReturn(true);
                        }}
                        hover
                        tabIndex={-1}
                      >
                        <TableCell>
                          {returnOrder.order._id.substr(
                            returnOrder.order._id.length - 10
                          )}
                        </TableCell>
                        <TableCell>
                          {formateDate(returnOrder.dateReturn)}
                        </TableCell>
                        <TableCell>
                          {returnOrder.order.customer?.name || "Khách lẻ"}
                        </TableCell>
                        <TableCell>
                          {returnOrder.order.customer?.phone || "Không có"}
                        </TableCell>
                        <TableCell>{`${returnOrder.returnFee.toLocaleString(
                          "en"
                        )} đ`}</TableCell>
                        <TableCell>{`${returnOrder.totalReturnPrice.toLocaleString(
                          "en"
                        )} đ`}</TableCell>
                        <TableCell>
                          <button className="buttonDoiTra">Đã trả hàng</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Số hàng hiển thị"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listReturnOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Returns;
