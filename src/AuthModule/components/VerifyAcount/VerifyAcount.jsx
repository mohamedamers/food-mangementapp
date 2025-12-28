import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/images/logo.png";

export default function VerfiyAccount() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        {
          email: data.email,
          code: data.code,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Account verified successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };
  return (
    <div className="auth-container bg-success ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-7 col-lg-5 bg-white p-4 rounded-3">
            <div className="form-container ">
              <div className="logo-container text-center ">
                <img className="w-50" src={logo} alt=""></img>
              </div>
              <div className="title">
                <h2>Verify Account</h2>
                <p className="text-muted">
                  Please Enter Your Otp or Check Your Inbox
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-mobile" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "should be valid mail",
                      },
                    })}
                    className="form-control"
                    placeholder="Enter Your Email"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                  />
                  {errors.email && (
                    <div className="alert alert-danger p-2">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    {...register("code", {
                      required: "otp is required",
                    })}
                    className="form-control"
                    placeholder="Otp"
                    aria-label="otp"
                    aria-describedby="basic-addon1"
                  />
                  {errors.code && (
                    <div className="alert alert-danger p-2">
                      {errors.code.message}
                    </div>
                  )}
                </div>
                <button className="btn  btn-submit w-100">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
