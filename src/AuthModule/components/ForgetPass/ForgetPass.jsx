import React from "react";
import logo from "../../../assets/images/logo.png";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
export default function ForgetPass() {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      console.log(response);
      toast.success("Success! We've sent an email containing your password reset code", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/reset-pass");
    } catch (error) {
      toast.error(error, {
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
                  <h4>Forget Your Password?</h4>
                  <p className="text-muted">
                    No worries! Please enter your email and we will send a
                    password reset link
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-envelope"></i>
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
                    <button className="btn btn-success w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
