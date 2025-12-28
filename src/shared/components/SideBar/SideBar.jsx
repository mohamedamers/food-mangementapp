import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-sidebar.png";
import { AuthContext } from "../../../context/AuthContext";
import ChangePass from"../../../AuthModule/components/ChangePass/ChangePass"

export default function SideBar() {
  let { loginData } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  let { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <div className="img text-center py-4 ">
              <img
                className="img-fluid"
                onClick={toggleCollapse}
                src={logo}
                alt=""
              />
            </div>
            <MenuItem
              component={<Link to="/dashboard" />}
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
            >
              {" "}
              Home{" "}
            </MenuItem>
            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                component={<Link to="/dashboard/users" />}
                icon={<i className="fa fa-users" aria-hidden="true"></i>}
              >
                {" "}
                Users{" "}
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              component={<Link to="/dashboard/recipes" />}
              icon={
                <i className="fa-solid fa-border-all" aria-hidden="true"></i>
              }
            >
              {" "}
              Recipes{" "}
            </MenuItem>

            {loginData?.userGroup == "SystemUser" ? (
              <MenuItem
                component={<Link to="/dashboard/favs" />}
                icon={
                  <i className="fa-regular fa-heart" aria-hidden="true"></i>
                }
              >
                {" "}
                Favorites{" "}
              </MenuItem>
            ) : (
              ""
            )}

            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                component={<Link to="/dashboard/categories" />}
                icon={
                  <i
                    className="fa-regular fa-calendar-days"
                    aria-hidden="true"
                  ></i>
                }
              >
                {" "}
                Categories{" "}
              </MenuItem>
            ) : (
              ""
            )}

            {loginData?.userGroup != "SystemUser" ? (
              <MenuItem
                icon={<i className="fa-solid fa-unlock-keyhole"></i>}
                onClick={() => setShowModal(true)}
              >
                {" "}
                Change Password{" "}
              </MenuItem>
            ) : (
              ""
            )}
            <ChangePass
              show={showModal}
              handleClose={() => setShowModal(false)}
            />

            <MenuItem
              onClick={logout}
              icon={
                <i
                  className="fa-solid fa-right-from-bracket"
                  aria-hidden="true"
                ></i>
              }
            >
              {" "}
              Logout{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
