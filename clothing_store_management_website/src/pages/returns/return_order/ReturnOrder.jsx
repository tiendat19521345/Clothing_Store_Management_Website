import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import axios from "axios";
import "./ReturnOrder.css";

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

const ReturnOrder = ({ open, handleCancel }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(1);
  const [orders, setOrders] = useState([]);
  const [originOrders, setOriginOrders] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orderFilter, setOrderFilter] = useState({
    orderId: "",
    customerName: "",
    phone: "",
  });
  const pages = [];

  for (let i = 2; i <= Math.ceil(orders.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const getCurrentOrders = () => {
    return orders.slice(
      currentPage * itemsPerPage - itemsPerPage,
      currentPage * itemsPerPage
    );
  };
  const renderPageNumbers = pages.map((number) => {
    if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <div
          onClick={() => {
            setCurrentPage(number);
          }}
          class={`cell ${currentPage === number ? "active" : null}`}
        >
          {number}
        </div>
      );
    }
    return null;
  });
  console.log({
    minPageNumberLimit,
    maxPageNumberLimit,
    pages,
    orders,
    curentOrder: getCurrentOrders(),
  });
  useEffect(() => {
    axios
      .get("https://clothesapp123.herokuapp.com/api/orders/list")
      .then((res) => {
        setOrders(
          res.data.filter(
            (order) => order.orderTotal - (order?.totalReturnPrice || 0) !== 0
          )
        );
        setOriginOrders(
          res.data.filter(
            (order) => order.orderTotal - (order?.totalReturnPrice || 0) !== 0
          )
        );
      })
      .catch((err) => {
        alert("Lỗi call api");
      });
  }, []);

  const formateDate = (dateStr) => {
    var date = new Date(dateStr);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handlePreviousPagination = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage - 1 < minPageNumberLimit) {
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextPagination = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    }
  };
  const handleFilter = (orderId, name, phone, fromDate, toDate) => {
    if (!orderId && !name && !phone && !fromDate && !toDate) {
      setOrders(originOrders);
    } else {
      setCurrentPage(1);

      const fromDateTime = (fromDate && fromDate.getTime()) || 0;

      const toDateTime =
        (toDate && toDate.getTime() + 3600 * 24 * 1000) || new Date().getTime();
      var orderFiltered = originOrders.filter((order) => {
        const dateOrder = new Date(order.dateOrder);

        if (order.customer) {
          console.log(order.customer?.phone.indexOf(phone) >= 0);
          return (
            fromDateTime < dateOrder.getTime() &&
            toDateTime > dateOrder.getTime() &&
            order._id.indexOf(orderId) >= 0 &&
            order.customer &&
            order.customer?.name.toLowerCase().indexOf(name.toLowerCase()) >=
              0 &&
            order.customer &&
            order.customer?.phone.indexOf(phone) >= 0
          );
        } else {
          // console.log(order);
          // console.log(
          //   fromDateTime < dateOrder.getTime() &&
          //     toDateTime > dateOrder.getTime() &&
          //     order._id.indexOf(orderId) >= 1
          // );
          return (
            fromDateTime < dateOrder.getTime() &&
            toDateTime > dateOrder.getTime() &&
            order._id.indexOf(orderId) >= 0 &&
            !name &&
            !phone
          );
        }
      });

      setOrders(orderFiltered);
    }
  };

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      close={handleCancel}
      BackdropComponent={Backdrop}
    >
      <div className="return-order-container">
        <div onClick={() => handleCancel()} className="return-order-btn-exit">
          <i class="bx bx-x"></i>
        </div>
        <div className="return-order-header">
          <h3>Chọn hoá đơn trả hàng</h3>
        </div>
        <div className="return-order-body">
          <div className="return-order-body-left">
            <div className="return-order-card">
              <h4 className="return-order-card-heading">Tìm kiếm</h4>
              <div className="return-order-card-body">
                <div className="return-order-card-item">
                  <input
                    value={orderFilter.orderId}
                    onChange={(e) => {
                      setOrderFilter((prev) => {
                        return {
                          ...prev,
                          orderId: e.target.value,
                        };
                      });
                      handleFilter(
                        e.target.value,
                        orderFilter.customerName,
                        orderFilter.phone,
                        fromDate,
                        toDate
                      );
                    }}
                    placeholder="Theo mã hoá đơn"
                    type="text"
                    className="return-order-card-input"
                  />
                </div>
                <div className="return-order-card-item">
                  <input
                    value={orderFilter.customerName}
                    onChange={(e) => {
                      handleFilter(
                        orderFilter.orderId,
                        e.target.value,
                        orderFilter.phone,
                        fromDate,
                        toDate
                      );
                      setOrderFilter((prev) => {
                        return {
                          ...prev,
                          customerName: e.target.value,
                        };
                      });
                    }}
                    placeholder="Theo tên khách hàng"
                    type="text"
                    className="return-order-card-input"
                  />
                </div>
                <div className="return-order-card-item">
                  <input
                    value={orderFilter.phone}
                    onChange={(e) => {
                      handleFilter(
                        orderFilter.orderId,
                        orderFilter.customerName,
                        e.target.value,
                        fromDate,
                        toDate
                      );
                      setOrderFilter((prev) => {
                        return {
                          ...prev,
                          phone: e.target.value,
                        };
                      });
                    }}
                    placeholder="Theo số điện thoại"
                    type="text"
                    className="return-order-card-input"
                  />
                </div>
              </div>
            </div>
            <div className="return-order-card">
              <h4 className="return-order-card-heading">Thời gian</h4>
              <div className="return-order-card-body">
                <div className="return-order-card-date-picker">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      inputFormat="dd/MM/yyyy"
                      views={["day", "month", "year"]}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      label={fromDate ? "" : "Từ ngày"}
                      value={fromDate}
                      onChange={(newValue) => {
                        setFromDate(newValue);
                        handleFilter(
                          orderFilter.orderId,
                          orderFilter.customerName,
                          orderFilter.phone,
                          newValue,
                          toDate
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          InputLabelProps={{
                            shrink: false,
                          }}
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="return-order-card-date-picker">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      minDate={fromDate}
                      inputFormat="dd/MM/yyyy"
                      views={["day", "month", "year"]}
                      label={toDate ? "" : "Đến ngày"}
                      value={toDate}
                      onChange={(newValue) => {
                        setToDate(newValue);
                        handleFilter(
                          orderFilter.orderId,
                          orderFilter.customerName,
                          orderFilter.phone,
                          fromDate,
                          newValue
                        );
                      }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      renderInput={(params) => (
                        <TextField
                          InputLabelProps={{
                            shrink: false,
                          }}
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          <div class="return-order-table-container">
            <table id="return-order-table">
              <thead>
                <tr>
                  <th>Mã hoá đơn</th>
                  <th>Ngày tạo</th>
                  <th>Số điện thoại</th>
                  <th>Khách hàng</th>
                  <th>Tổng cộng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  getCurrentOrders().map((order, index) => {
                    return (
                      <tr>
                        <td>{order._id.substr(order._id.length - 10)}</td>
                        <td>{formateDate(order.dateOrder)}</td>

                        <td>
                          {order.customer ? order.customer.phone : "Không có"}{" "}
                        </td>
                        <td>
                          {order.customer ? order.customer.name : "Khách lẻ"}
                        </td>
                        <td>{`${(
                          order.orderTotal - (order?.totalReturnPrice || 0)
                        ).toLocaleString("en")}đ`}</td>
                        <td>
                          <Link
                            to={{
                              pathname: "/returnOrderDetail",
                              state: {
                                orderId: order._id,
                              },
                            }}
                          >
                            <button className="return-order-table-btn-select">
                              Chọn
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/**Start Pagination */}
            {console.log(pages.length)}
            {pages.length >= 1 && (
              <div class="pagination">
                <div class="pagination-left">
                  <button
                    disabled={currentPage === 1 ? true : false}
                    onClick={handlePreviousPagination}
                    class="cell"
                    id="prev-btn"
                  >
                    <i class="fas fa-caret-left"></i>
                  </button>
                  <div
                    onClick={() => {
                      setCurrentPage(1);
                      setminPageNumberLimit(1);
                      setmaxPageNumberLimit(pageNumberLimit);
                    }}
                    className={`cell ${currentPage === 1 ? "active" : ""}`}
                  >
                    1
                  </div>
                  {minPageNumberLimit > 1 && (
                    <div onClick={handlePreviousPagination} class="cell">
                      {" "}
                      &hellip;
                    </div>
                  )}

                  {renderPageNumbers}

                  {maxPageNumberLimit < pages.length && (
                    <div onClick={handleNextPagination} class="cell">
                      {" "}
                      &hellip;
                    </div>
                  )}

                  <button
                    disabled={
                      currentPage === pages[pages.length - 1] ? true : false
                    }
                    onClick={handleNextPagination}
                    class="cell"
                    id="next-btn"
                  >
                    <i class="fas fa-caret-right"></i>
                  </button>
                </div>
                <div class="pagination-right">
                  <p>Số hàng mỗi dòng: 7 / Tổng số hoá đơn</p>
                </div>
              </div>
            )}
            {/**Pagination */}
          </div>
        </div>
      </div>
    </StyledModal>
  );
};

export default ReturnOrder;
