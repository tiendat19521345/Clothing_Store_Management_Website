import React from "react";
import "./dashboard.css";
import revenueIcon from "../../assets/images/dashboardIcon1.png";
import topcustomer from "../../assets/images/top.png";
import star from "../../assets/images/star.png";
import dashboardOrderIcon from "../../assets/images/dashboardOrderIcon1.png";
import dashboardCostIcon from "../../assets/images/dashboardCost.png";
import marginIcon from "../../assets/images/dashboardRevenueIcon.png";
const Dashboard = () => {
  
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
                  <h3>VND</h3>
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
                  <h3>VND</h3>
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
                    <h3> đơn</h3>
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
                    VND
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
    </div>
  )};

export default Dashboard;
