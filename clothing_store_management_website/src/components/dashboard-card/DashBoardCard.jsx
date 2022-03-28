import React from "react";
import "./dashboardcard.css";
const DashBoardCard = ({ name, quantity, icon }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card__icon">
        <i class={icon}></i>
      </div>
      <div className="dashboard-card__info">
        <h4>{quantity}</h4>
        <span>{name}</span>
      </div>
    </div>
  );
};

export default DashBoardCard;
