import React from "react";
import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ChangePass({ show, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Password changed successfully");
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <div className=" vh-50 justify-content-center align-items-center">
          <div className=" bg-white p-2 rounded-3">
            <div className="form-container">
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt=""></img>
              </div>
              <div className="title">
                <h4>Change Your Password</h4>
                <p className="text-muted">Enter your details below</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("oldPassword", {
                      required: "field is required",
                    })}
                    className="form-control"
                    placeholder="Old Password"
                    aria-label="oldPassword"
                    aria-describedby="basic-addon1"
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {errors.oldPassword && (
                    <div className="alert alert-danger p-2">
                      {errors.oldPassword.message}
                    </div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "field is required",
                    })}
                    className="form-control"
                    placeholder="New Password"
                    aria-label="newPassword"
                    aria-describedby="basic-addon1"
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {errors.newPassword && (
                    <div className="alert alert-danger p-2">
                      {errors.newPassword.message}
                    </div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("confirmNewPassword", {
                      required: "field is required",
                    })}
                    className="form-control"
                    placeholder="Confirm New Password"
                    aria-label="confirmNewPassword"
                    aria-describedby="basic-addon1"
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </span>

                  {errors.confirmNewPassword && (
                    <div className="alert alert-danger p-2">
                      {errors.confirmNewPassword.message}
                    </div>
                  )}
                </div>

                <button className="btn btn-outline-success w-40 m-auto d-block">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
