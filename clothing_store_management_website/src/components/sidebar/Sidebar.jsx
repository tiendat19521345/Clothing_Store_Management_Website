import React, { useState, useEffect } from "react";

import "./sidebar.css";
import sidebar from "../../assets/data/sidebar.json";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import axios from "axios";
const Sidebar = ({ currentTabIndex, setCurrentTabIndex }) => {

  const [user, setUser] = useState([]);
 
   

  
  return (
    <div className="sidebar">
      <img style={{ width: "100%", height: "150px" }} src={logo} alt="" />
      {sidebar.map((item, index) => {
       
       return (
         <Link
           to={{
             pathname: item.route,
             state: { user },
           }}
         >
           <SidebarItem
             onClick={() => {
               setCurrentTabIndex(index);
             }}
             active={index === currentTabIndex}
             icon={item.icon}
             title={item.display_name}
           ></SidebarItem>
         </Link>
       );
   })}
     
    </div>
  );
};

export default Sidebar;
