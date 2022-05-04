import React, { useState, useEffect } from "react";

import "./login.css";

const Login = ({ setIsAuticated }) => {


  return (
    <div className="login-container">
      <div className="login-form">
        <h3 id="login-form-title">ĐĂNG NHẬP</h3>

        <div className="login-form-inputs">
          <input
            
            className="login-form-input"
            type="text"
            placeholder="Tài khoản"

          />
          <p className="login-form-error"></p>
        </div>
        <div className="login-form-inputs">
          <input
            className="login-form-input"
            type="password"
            placeholder="Mật khẩu"

          />
          <p className="login-form-error"></p>
        </div>

        <div className="login-form-row login-failed">
          <p></p>
        </div>
        <div className="login-form-item">
          <button  className="btn-login">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
