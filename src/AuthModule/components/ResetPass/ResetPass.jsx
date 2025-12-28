import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";
import { EmailValidation, PasswordValidation } from "../../../services/validations";
import { baseURL, USERS_URLS } from "../../../services/api/apiURLs";

export default function ForgetPass() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleShowConfirmPass = () => setShowConfirmPass(!showConfirmPass);
  
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        `${baseURL}${USERS_URLS.RESET}`,
        data
      );
      console.log(response);
      toast.success("Password updated successfully! You can now log in using your new password", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/login");
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
                  <h4> Reset Password</h4>
                  <p className="text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      {...register("email", EmailValidation)}
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
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      {...register("text", {
                        required: "OTP is required",
                        pattern: {
                          message: "OTP is not valid",
                        },
                      })}
                      class="form-control"
                      placeholder="OTP"
                      aria-label="text"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger p-2">
                      {errors.text.message}
                    </div>
                  )}

                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                      type={showPass ? "text" : "password"}
                      {...register("password", PasswordValidation )}
                      class="form-control"
                      placeholder=" New Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                    <span className="input-group-text" onClick={toggleShowPass}>
                      <i className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                    </span>
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger p-2">
                      {errors.password.message}
                    </div>
                  )}

                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      {...register("password", PasswordValidation )}
                      class="form-control"
                      placeholder="Confirm New Password"
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                    <span className="input-group-text" onClick={toggleShowConfirmPass}>
                      <i className={`fa ${showConfirmPass ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                    </span>
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger p-2">
                      {errors.password.message}
                    </div>
                  )}
                  <button className="btn btn-success w-100">Reset Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}