import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";
import { AuthContext } from "../../../context/AuthContext";
import { EmailValidation, PasswordValidation } from "../../../services/validations";
import { baseURL, USERS_URLS } from "../../../services/api/apiURLs";
function Login() {
  let { saveLoginData } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${baseURL}${USERS_URLS.LOGIN}`,
        data
      );
      localStorage.setItem("token", response.data.token);
      saveLoginData();
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
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      {...register("email", EmailValidation)}
                      className="form-control"
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
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key" aria-hidden="true"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", PasswordValidation)}
                      className="form-control"
                      placeholder="Password"
                      aria-label="password"
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
                      ></i>{" "}
                    </span>
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
