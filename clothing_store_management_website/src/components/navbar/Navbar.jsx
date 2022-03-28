import React, { useEffect, useState } from "react";
import "./navbar.css";
import cr7 from "../../assets/images/cr7.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = ({ rerender, currentTabIndex, setCurrentTabIndex }) => {





  return (
    <div>
      <div className="navbar">
        <div className="navbar__left">
          <i class="bx bx-menu"></i>
          <p></p>
        </div>

        <div
          onClick={() => {
            setCurrentTabIndex(8);
          }}
          className="navbar__right"
        >
          <Link
           
          >
            <div className="navbar__right-item">
              <img src={cr7} alt="" />
              <span>Dat 09</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
