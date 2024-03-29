import React, { useEffect, useState } from "react";
import "./navbar.css";
import cr7 from "../../assets/images/cr7.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = ({ rerender, currentTabIndex, setCurrentTabIndex }) => {
  console.log(JSON.parse(localStorage.getItem("user")));
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState([]);
  console.log(userLocal.userId);
  useEffect(() => {
    console.log(console.log("test"));

    axios
      .get(
        `http://localhost:5000/api/users/getInfo/${userLocal.userId}`
      )
      .then((res) => {
        setUser(res.data);
      });
  }, [rerender]);
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
            to={{
              pathname: "/editProfile",
              state: { user },
            }}
          >
            <div className="navbar__right-item">
              <img src={user?.imageUrl} alt="" />
              <span>{user.fullname}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;