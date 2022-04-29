import React, { useState, useEffect } from "react";
import "./dashboard.css";
import revenueIcon from "../../assets/images/dashboardIcon1.png";
import topcustomer from "../../assets/images/top.png";
import star from "../../assets/images/star.png";
import dashboardOrderIcon from "../../assets/images/dashboardOrderIcon1.png";
import dashboardCostIcon from "../../assets/images/dashboardCost.png";
import marginIcon from "../../assets/images/dashboardRevenueIcon.png";
import BarChart from "../../components/barchart/BarChart";
import { LineChart } from "../../components/linechart/LineChart";
import axios from "axios";
const Dashboard = () => {
  const [revenueToday, setRevenueToday] = useState(0);
  const [expensiveToday, setExpensiveToday] = useState(0);
  const [countNumberToday, setCountNumberToday] = useState(0);
  const [top1Customer, setTop1Customer] = useState({});
  const [totalCustomerThisWeek, setTotalCustomerThisWeek] = useState();
  const [totalCustomerLastWeek, setTotalCustomerLastWeek] = useState();

  useEffect(() => {
    axios
      .get(
        "https://clothesapp123.herokuapp.com/api/orders/revenue/revenueToday"
      )
      .then((res) => {
        setRevenueToday(res.data[0]?.total || 0);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://clothesapp123.herokuapp.com/api/orders/revenue/getExpensiveToday"
      )
      .then((res) => {
        setExpensiveToday(res.data[0]?.totalExpensive || 0);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://clothesapp123.herokuapp.com/api/orders/revenue/getCountOrderToday"
      )
      .then((res) => {
        setCountNumberToday(res.data[0]?.countOrder || 0);
      });
  }, []);
  //get top 1 customer

  const dataCustomer = {
    labels: [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
      "Chủ nhật",
    ],
    datasets: [
      {
        label: "Tuần trước",
        data: totalCustomerLastWeek,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tuần này",
        data: totalCustomerThisWeek,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };


  return (
    <div>
      <h2 className="header-title">Tổng quan</h2>
      <div className="dashboard-overview">
        <div className="dashboard-overview-row row">
          <div className="col-3">
            <div
              style={{ background: "#3B76EF" }}
              className="dashboard-overview-card"
            >
              <div className="dashboard-overview-card-content">
                <div className="dashboard-overview-card-heading">
                  <h3>Doanh thu trong ngày</h3>
                </div>
                <div className="dashboard-overview-card-body">
                  <h3>{revenueToday?.toLocaleString("en")} VND</h3>
                </div>
              </div>
              <div className="dashboard-overview-card-img">
                <img src={revenueIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="col-3">
            <div
              style={{ background: "#63C7FF" }}
              className="dashboard-overview-card "
            >
              <div className="dashboard-overview-card-content">
                <div className="dashboard-overview-card-heading">
                  <h3>Chi phí trong ngày</h3>
                </div>
                <div className="dashboard-overview-card-body">
                  <h3>{expensiveToday?.toLocaleString("en")} VND</h3>
                </div>
              </div>
              <div className="dashboard-overview-card-img">
                <img src={dashboardCostIcon} alt="" />
              </div>
            </div>
          </div>

          <div className="col-3">
            <div
              style={{ background: "#A66DD4" }}
              className="dashboard-overview-card "
            >
              <div className="dashboard-overview-card-content">
                <div className="dash-board-overview-card-content">
                  <div className="dashboard-overview-card-heading">
                    <h3>Số đơn trong ngày</h3>
                  </div>
                  <div className="dashboard-overview-card-body">
                    <h3>{countNumberToday?.toLocaleString("en")} đơn</h3>
                  </div>
                </div>
              </div>
              <div className="dashboard-overview-card-img">
                <img src={dashboardOrderIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="col-3">
            <div
              style={{ background: "#00A856" }}
              className="dashboard-overview-card "
            >
              <div className="dash-board-overview-card-content">
                <div className="dashboard-overview-card-heading">
                  <h3>Lợi nhuận trong ngày</h3>
                </div>
                <div className="dashboard-overview-card-body">
                  <h3>
                    {(revenueToday - expensiveToday).toLocaleString("en")} VND
                  </h3>
                </div>
              </div>
              <div className="dashboard-overview-card-img">
                <img src={marginIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/**end dashboard overview */}

      <div className="div-customer-chart">
        <div className="div-top-customer">
          <div className="div-customer-header">
            <h3 className="title-header">Top 1 khách hàng</h3>
          </div>
          <div className="div-info-top-customer">
            <div className="avt-customer">
              <img src={topcustomer} alt="" />
            </div>
            <div className="info-customer">
              <p className="name">{top1Customer.name}</p>
              <p className="phonenumber">SĐT: {top1Customer.phone}</p>
              <div className="div-icon">
                <img className="icon-star" src={star} alt="" />
                <img className="icon-star" src={star} alt="" />
                <img className="icon-star" src={star} alt="" />
                <img className="icon-star" src={star} alt="" />
                <img className="icon-star" src={star} alt="" />
              </div>
            </div>
            <div className="div-total-point">
              <p className="title-total">Tổng điểm tích lũy</p>
              <p className="point">
                {top1Customer.point?.toLocaleString("en")} điểm
              </p>
            </div>
          </div>
        </div>
        <div className="div-info-char">
          <div className="div-customer-header">
            <h3 className="title-header">Số khách ghé mua</h3>
          </div>
          <div className="div-char">
            <LineChart data={dataCustomer} />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
