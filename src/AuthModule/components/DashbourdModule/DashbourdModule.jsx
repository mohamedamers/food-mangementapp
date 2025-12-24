import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import headerImg from "../../../assets/images/header.png";
import { AuthContext } from "../../../context/AuthContext";
import Header from "../../../shared/components/Header/Header";

export default function DashbourdModule() {
  let { loginData } = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerImg}
      />
      <div className="home-details m-3 d-flex justify-content-between align-items-center p-4 ">
        <div className="caption ">
          <h4 className="text-black">
            Fill the <span className="text-success">Recipes</span> !
          </h4>
          <p>
            you can now fill the meals easily using the table and form ,<br />{" "}
            click here and sill it with the table !
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/recipes")}
          className="btn btn-success"
        >
          Fill Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
