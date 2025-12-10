import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-lg-5 col-md-7 bg-white p-4 rounded-3">
              <div className="form-container">
                <div className="logo-container text-center ">
                  <img className="w-50" src={logo} alt="" />
                </div>
                <div className="title">
                  <h4>Register</h4>
                  <p className="text-muted">
                    Welcome Back! Please enter your details
                  </p>
                </div>
                <form>
                  <div class="input-group mb-3 ">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-mobile"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control me-5"
                      placeholder="UserName"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-mobile"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your E-mail"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control me-5"
                      placeholder="Country"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-mobile"></i>
                    </span>
                    <input
                      type="number"
                      class="form-control "
                      placeholder="PhoneNumber"
                      aria-label="number"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control me-5"
                      placeholder="Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-mobile"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Confirm-Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div className="links text-end my-2">
                    <Link
                      to="/login"
                      className="text-success text-decoration-none"
                    >
                      Login Now?
                    </Link>
                  </div>
                  <button className="btn btn-success w-100">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
