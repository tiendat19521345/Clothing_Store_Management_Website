import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReturnOrderDetail.css";
import { useLocation, useHistory } from "react-router";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
const ReturnOrderDetail = () => {
  let location = useLocation();
  const history = useHistory();
  const orderId = location.state.orderId;
  const [order, setOrder] = useState([]);
  const [returnOrder, setReturnOrder] = useState({});
  const [returnFee, setReturnFee] = useState({
    returnFeeFormat: "0 đ",
    returnFeeValue: 0,
  });
  useEffect(() => {
    axios
      .get(`https://clothesapp123.herokuapp.com/api/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        setReturnOrder({
          order: {
            orderId: res.data._id,
            customer: res.data.customer,
            orderTotal: res.data.orderTotal,
          },

          customer: {
            ...res.data.customer,
          },
          orderDetails: res.data.orderDetails.map((orderItem) => {
            return {
              ...objectWithoutKey(orderItem, "quantity"),
              check: false,
              returnedQuantity: 0,
              oldQuantity: orderItem.quantity,
            };
          }),
        });
      })
      .catch((err) => {
        alert("Lỗi server");
      });
  }, [orderId]);
  const objectWithoutKey = (object, key) => {
    const { [key]: deletedKey, ...otherKeys } = object;
    return otherKeys;
  };

  const getReturnTemplePrice = () => {
    var templePrice = 0;
    const orderDetails = returnOrder?.orderDetails;
    for (var i in orderDetails) {
      if (orderDetails[i].product && orderDetails[i].check) {
        templePrice +=
          orderDetails[i].returnedQuantity *
          orderDetails[i]?.product?.salePrice;
      }
    }
    return templePrice;
  };
  const getMimusPoint = () => {
    //900,000 điểm được 100 điểm
    //returnTemplePrice trừ ...

    return Math.floor((getReturnTemplePrice() * 100) / 900000);
  };

  const getReturnOrderChecked = () => {
    const orderDetails = returnOrder.orderDetails;
    var orderDetailsChecked = orderDetails?.filter(
      (orderItem) => orderItem.check === true && orderItem.returnedQuantity > 0
    );
    return { ...returnOrder, orderDetails: orderDetailsChecked };
  };

  return (
    <div className="return-order-detail-container">
      <div className="return-order-detail-container-heading">
        <h3>Chi tiết hoá đơn</h3>

        <button
          onClick={() => {
            history.push("/returns");
          }}
          className="return-order-detail-btn-exit"
        >
          Thoát
        </button>
      </div>
      <div className="return-order-detail-container-body">
        <div className="return-order-detail-container-body-left">
          <div className="return-order-detail-container-body-left-list">
            {console.log(returnOrder)}
            {(returnOrder.orderDetails?.length === 0 ||
              returnOrder.orderDetails?.every((orderItem) => {
                return orderItem?.orderDetail?.quantity === 0;
              })) && <h3>Hoá đơn này đã hết hàng</h3>}
            {returnOrder.orderDetails?.length > 0 &&
              returnOrder.orderDetails?.map((orderItem, index) => {
                return (
                  orderItem.product &&
                  orderItem.oldQuantity > 0 && (
                    <div className="return-order-detail-card ">
                      <div className="return-order-detail-card-left">
                        <Checkbox
                          checked={
                            orderItem.returnedQuantity > 0 && orderItem.check
                          }
                          onChange={() => {
                            var newOrderDetails = returnOrder.orderDetails;
                            if (newOrderDetails[index].returnedQuantity > 0) {
                              newOrderDetails[index].check =
                                !newOrderDetails[index].check;
                              setReturnOrder({
                                ...returnOrder,
                                orderDetails: newOrderDetails,
                              });
                            }
                          }}
                        />
                        <div className="return-order-detail-card-left-img">
                          <img src={orderItem?.product?.imageDisplay} alt="" />
                        </div>
                      </div>

                      <div className="return-order-detail-card-middle">
                        <b>
                          Mã sản phẩm:{" "}
                          {orderItem?.product?._id.substr(
                            orderItem.product._id.length - 10
                          )}
                        </b>
                        <p className="return-order-detail-card-middle-content">
                          {orderItem.product?.name}
                        </p>
                        <p>
                          {`${orderItem?.product?.salePrice.toLocaleString(
                            "en"
                          )} đ`}
                        </p>
                      </div>
                      <div className="return-order-detail-card-right">
                        <div className="return-order-detail-counts">
                          <div className="group-count">
                            <div
                              onClick={() => {
                                console.log(orderItem);
                                if (orderItem.returnedQuantity > 0) {
                                  let newOrderDetails =
                                    returnOrder.orderDetails;

                                  newOrderDetails[index].returnedQuantity -= 1;
                                  newOrderDetails[index].check = true;

                                  setReturnOrder({
                                    ...returnOrder,
                                    orderDetails: newOrderDetails,
                                  });
                                }
                              }}
                              className="group-count-item"
                            >
                              <i class="bx bx-minus"></i>
                            </div>
                            <div className="group-count-item">
                              <input
                                onFocus={(e) => {
                                  e.target.value = "";
                                }}
                                onChange={(e) => {
                                  let newOrderDetails =
                                    returnOrder.orderDetails;
                                  if (e.target.value <= orderItem.oldQuantity) {
                                    newOrderDetails[index].returnedQuantity =
                                      Math.floor(e.target.value);
                                    newOrderDetails[index].check = true;
                                    setReturnOrder({
                                      ...returnOrder,
                                      orderDetails: newOrderDetails,
                                    });
                                  }
                                }}
                                value={orderItem.returnedQuantity}
                              />
                            </div>
                            <div
                              onClick={() => {
                                if (
                                  orderItem.returnedQuantity <
                                  orderItem.oldQuantity
                                ) {
                                  let newOrderDetails =
                                    returnOrder.orderDetails;
                                  newOrderDetails[index].check = true;
                                  newOrderDetails[index].returnedQuantity += 1;

                                  setReturnOrder({
                                    ...returnOrder,
                                    orderDetails: newOrderDetails,
                                  });
                                }
                              }}
                              className="group-count-item"
                            >
                              <i class="bx bx-plus"></i>
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: 14,
                              marginRight: "15px",
                              marginTop: "5px",
                            }}
                          >
                            /{orderItem?.oldQuantity}
                          </span>
                        </div>
                        <div className="return-order-detail-card-price">
                          <b>{`${(
                            orderItem.product.salePrice *
                            orderItem.returnedQuantity
                          ).toLocaleString("en")}đ`}</b>
                        </div>
                        <div
                          onClick={() => {
                            //remove a product to list
                            const newOrderDetails =
                              returnOrder.orderDetails.filter((orderDetail) => {
                                return orderDetail._id !== orderItem._id;
                              });

                            setReturnOrder({
                              ...returnOrder,
                              orderDetails: newOrderDetails,
                            });
                          }}
                          className="return-order-detail-delete-btn"
                        >
                          <i
                            style={{ color: "#F26339" }}
                            class="bx bx-trash"
                          ></i>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <div className="return-order-detail-container-body-right">
          <div className="refund-payment-card">
            <div className="refund-payment-row">
              <span>Khách hàng:</span>
              <b>{returnOrder.order?.customer?.name || "Khách lẻ"}</b>
            </div>
            <div className="refund-payment-row">
              <span>Số điện thoại:</span>
              <span>{returnOrder.order?.customer?.phone || "Không có"}</span>
            </div>
            <div className="refund-payment-row">
              <span>Điểm tích luỹ:</span>
              <span>{returnOrder.order?.customer?.point || 0}</span>
            </div>
            <div className="refund-payment-row">
              <span>Mã hoá đơn:</span>
              <b style={{ color: "#237fcd" }}>
                {returnOrder?.order?.orderId?.substr(order._id.length - 10)}
              </b>
            </div>
            <div className="refund-payment-row">
              <span>Tổng giá trị gốc:</span>
              <b style={{ color: "#237fcd" }}>
                {`${returnOrder?.order?.orderTotal?.toLocaleString("en")} đ`}
              </b>
            </div>
          </div>
          <div className="refund-payment-card">
            <div className="refund-payment-row">
              <span>Tổng giá trị hoàn trả:</span>
              <b
                style={{ color: "#237fcd" }}
              >{`${getReturnTemplePrice().toLocaleString("en")} đ`}</b>
            </div>
            <div className="refund-payment-row">
              <span>Điểm trừ tích luỹ:</span>
              <b style={{ color: "#237fcd" }}>{getMimusPoint()}</b>
            </div>
            <div className="refund-payment-row">
              <span>Phí trả hàng:</span>
              <NumberFormat
                thousandSeparator={true}
                suffix=" đ"
                value={returnFee.returnFeeFormat}
                isAllowed={(values) => {
                  const { formattedValue, value } = values;
                  return (
                    value >= 0 &&
                    value < getReturnTemplePrice() &&
                    !formattedValue.includes("-")
                  );
                }}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  if (returnFee.returnFeeValue >= 0) {
                    setReturnFee({
                      returnFeeFormat: formattedValue,
                      returnFeeValue: value,
                    });
                  }
                }}
                style={{
                  color: "#237fcd",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "right",
                }}
                type="text"
              />
            </div>
            <div className="refund-payment-row">
              <span>Tiền trả khách:</span>
              <b style={{ color: "#237fcd" }}>{`${(
                getReturnTemplePrice() - returnFee.returnFeeValue
              ).toLocaleString("en")} đ`}</b>
            </div>
          </div>
          {getReturnOrderChecked().orderDetails?.length > 0 && (
            <Link
              to={{
                pathname: "/returnBill",
                state: {
                  returnOrder: {
                    point: returnOrder.customer?.point - getMimusPoint(),
                    ...getReturnOrderChecked(),
                    returnTempPrice: getReturnTemplePrice(),
                    returnFee: Number(returnFee.returnFeeValue),
                    totalReturnPrice:
                      getReturnTemplePrice() - Number(returnFee.returnFeeValue),
                    user: JSON.parse(localStorage.getItem("user")),
                  },
                },
              }}
            >
              <button onClick={() => {}} className="refund-payment-btn">
                Trả hàng
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnOrderDetail;
