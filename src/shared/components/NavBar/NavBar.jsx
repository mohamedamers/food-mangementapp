import { useContext } from "react";
import defaultAvatar from "../../../assets/images/picheader.png";
import { AuthContext } from "../../../context/AuthContext";

export default function NavBar() {
  let { loginData } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link d-flex align-items-center">
                  
                  <div className="me-2" style={{ width: "40px", height: "40px" }}>
                    <img
                      src={loginData?.profileImage || defaultAvatar} 
                      alt="user profile"
                      className="rounded-circle border" 
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover" 
                      }}
                    />
                  </div>

                  <span className="fw-bold text-dark">
                    {loginData?.userName || "Guest"}
                  </span>

                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}