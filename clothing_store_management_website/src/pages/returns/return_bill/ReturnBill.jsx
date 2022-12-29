import React, { useRef, useState, useEffect } from "react";

import { useReactToPrint } from "react-to-print";
import { useLocation, useHistory } from "react-router-dom";
import QRCode from "qrcode";
import axios from "axios";
import "./ReturnBill.css";
const ReturnBill = () => {
  let history = useHistory();
  let location = useLocation();
  const returnOrder = location?.state?.returnOrder;
  const [returnOrderId, setReturnOrderId] = useState("");
  const [qrImage, setQrImage] = useState("");
  console.log(returnOrder);
  useEffect(() => {
    returnOrder &&
      QRCode.toDataURL(
        JSON.stringify({
          orderTotal: returnOrder.order.orderId,
          customer: returnOrder.customer.name,
          point: returnOrder.point,
          totalReturnPrice: returnOrder.totalReturnPrice,
        })
      ).then((url) => {
        setQrImage(url);
      });
  }, []);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleCheckout = () => {
    const returnOrderApi = {
      cashier: returnOrder.user.userId,
      order: returnOrder.order.orderId,
      returnTempPrice: returnOrder.returnTempPrice,
      returnFee: returnOrder.returnFee,
      totalReturnPrice: returnOrder.totalReturnPrice,
      point: returnOrder.point,
      customer: returnOrder.customer._id,
      returnOrderDetails: returnOrder.orderDetails.map((orderItem) => {
        return {
          orderDetail: orderItem._id,
          oldQuantity: orderItem.oldQuantity,
          returnedQuantity: orderItem.returnedQuantity,
        };
      }),
    };
    axios
      .post("http://localhost:5000/api/returnOrder", {
        ...returnOrderApi,
      })
      .then((res) => {
        setQrImage(res.data.qrCodeUrl);
        setReturnOrderId(res.data._id);

        handlePrint();
        history.push("/returnOrderDetail", {
          orderId: returnOrder.order.orderId,
        });
        alert("Trả hàng thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDate = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${date}/${month}/${year}`;
  };
  return (
    <div ref={componentRef} className="invoice-container">
      <div className="invoice-header">
        <h3>HOÁ ĐƠN TRẢ HÀNG</h3>
        <h4>Mã trả hàng:{returnOrderId} </h4>
        <p>Ngày lập hoá đơn: {getDate()}</p>
      </div>
      <div className="invoice-info">
        <div className="invoice-info-row">
          <h3>Shop quần áo The Clothes</h3>
          <p>Đường Vành Đai, Kí túc xá Đại học quốc gia khu B</p>
          <p>Phường Đông Hoà, thị xã Dĩ An, tỉnh Bình Dương</p>
        </div>
        <div className="invoice-info-right">
          <div className="invoice-qrcode">
            <img src={qrImage} alt="" />
          </div>
          <div className="invoice-info-p">
            <p>Khách hàng: {returnOrder?.customer.name || "Khách lẻ"} </p>
            <p>Số điện thoại: {returnOrder?.customer.phone || "Không có"} </p>
            <p>Nhân viên bán hàng: {returnOrder?.user.fullname} </p>
          </div>
        </div>
      </div>
      <div class="invoice-table-bill-container">
        <table id="invoice-table">
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {returnOrder &&
              returnOrder.orderDetails?.map((orderItem, index) => {
                if (orderItem.returnedQuantity) {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{orderItem.product.name}</td>

                      <td>{`${orderItem.product.salePrice.toLocaleString(
                        "en"
                      )}đ`}</td>
                      <td>{orderItem.returnedQuantity}</td>
                      <td>{`${(
                        orderItem.product.salePrice * orderItem.returnedQuantity
                      ).toLocaleString("en")}đ`}</td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div className="table-footer-left">
          <p>
            Cảm ơn quý khách đã mua hàng tại <b>The Clothes</b>
          </p>
        </div>
        <div className="table-footer-right">
          <p>{`Tổng tiền hoàn trả ${returnOrder?.returnTempPrice.toLocaleString(
            "en"
          )}đ`}</p>

          {returnOrder?.returnFee > 0 && (
            <p>{`Phí trả hàng: ${returnOrder?.returnFee.toLocaleString(
              "en"
            )}đ`}</p>
          )}
          <b>{`Tiền trả khách: ${returnOrder?.totalReturnPrice?.toLocaleString(
            "en"
          )}đ`}</b>
        </div>
      </div>
      <div className="invoice-confirm-row">
        <button
          onClick={() => {
            handleCheckout();
          }}
          className="invoice-confirm-access"
        >
          Xác nhận
        </button>

        <button
          onClick={() => {
            history.push("/returnOrderDetail", {
              orderId: returnOrder?.order.orderId,
            });
          }}
          className="invoice-confirm-cancel"
        >
          Huỷ
        </button>
      </div>
    </div>
  );
};

export default ReturnBill;
