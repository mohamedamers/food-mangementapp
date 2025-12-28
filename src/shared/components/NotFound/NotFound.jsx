import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import notFound from "../../../assets/images/notFound.png";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="container-fluid py-4">
        <div className="container">
          <img src={logo} alt="Logo" className="w-25" />
        </div>
      </div>

      <div className="container-fluid d-flex align-items-center ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8">
              <div className="mb-5">
                <h1 className="fw-bold text-dark" style={{ fontSize: "3.5rem", lineHeight: "1.1" }}>
                  Food Recipe
                </h1>
                <h2 className="text-success mb-5" style={{ fontSize: "1.8rem", fontWeight: "400" }}>
                  Food & Drinks
                </h2>
              </div>

              <div className="mb-5">
                <h2 className="fw-bold text-dark mb-3" style={{ fontSize: "3rem" }}>
                  Oops.
                </h2>
                <h3 className="text-success mb-4" style={{ fontSize: "2rem", fontWeight: "500" }}>
                  Page not found
                </h3>

                <p className="text-secondary mb-4" style={{ fontSize: "1.25rem", lineHeight: "1.6" }}>
                  This Page doesn't exist or was removed!
                  <br />
                  We suggest you back to home.
                </p>
              </div>

              <hr className="mb-4" style={{ 
                width: "100px", 
                borderWidth: "2px", 
                borderColor: "#28a745",
                marginLeft: "0"
              }} />

              <div className="mt-4">
                <button
                  className="btn btn-success px-5 py-3"
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ 
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    borderRadius: "50px",
                    minWidth: "200px"
                  }}
                >
                  Back To Home
                </button>
              </div>
            </div>

            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative">
              <div className="position-relative" style={{ width: "650px", height: "650px" }}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 900 845"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.89282 521.082C26.9982 403.162 133.04 300.297 258.07 290.462C326.208 285.176 394.696 305.682 462.554 297.855C520.065 290.999 572.986 264.358 611.405 222.921C667.457 162.038 686.409 81.9082 745.754 23.9688C827.519 -55.9487 970.205 -57.1864 1069.7 1.58928C1169.19 60.365 1229.34 159.964 1256.87 268.517L1257.96 301.534C1263.95 414.135 1232.91 545.167 1164.49 645.524C1095.17 747.219 1049.59 789.369 923.262 862.329C815.993 924.416 605.94 951.713 480.525 954.59C355.11 957.467 226.296 921.807 131.954 842.793C37.6127 763.778 -17.2476 639.001 4.89282 521.082Z"
                    fill="#CCE9DA"
                  />
                  <path
                    d="M413.64 193.407C410.096 170.068 427.014 148.402 451.429 145.014C475.843 141.626 498.508 157.799 502.053 181.137C505.597 204.476 488.678 226.142 464.264 229.53C439.849 232.918 417.184 216.745 413.64 193.407Z"
                    fill="#CCE9DA"
                  />
                </svg>

                <img
                  src={notFound}
                  alt="404"
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{
                    width: "460px",
                    maxWidth: "100%",
                    zIndex: 10,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;