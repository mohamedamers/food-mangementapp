import React from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem('token',response.data.token);
      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/dashboard");
      
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

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
                  <h4>Log In</h4>
                  <p className="text-muted">
                    Welcome Back! Please enter your details
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "email is not valid",
                        },
                      })}
                      class="form-control"
                      placeholder="Email"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.email && (
                    <div className="alert alert-danger p-2">
                      {errors.email.message}
                    </div>
                  )}
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: "password is not valid",
                        },
                      })}
                      class="form-control"
                      placeholder="Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger p-2">
                      {errors.password.message}
                    </div>
                  )}

                  <div className="links d-flex justify-content-between my-2">
                    <Link
                      to="/register"
                      className="text-black text-decoration-none"
                    >
                      Register Now?
                    </Link>
                    <Link
                      to="/forget-pass"
                      className="text-success text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button className="btn btn-success w-100">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
