/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import headerImg from "../../../assets/images/header2.png";
import axios from "axios";
import NoData from "../../../shared/components/NoData/NoData";

export default function RecipesList() {
  const [resapesList, setRategoriesList] = useState([]);
  // let navigate = useNavigate();
  const getAllRategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRategories();
  }, []);
  return (
    <>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 ">
            <div className="d-flex mx-3 flex-column">
              <h4 className="text-black ">Recipe Table Details</h4>
              <p>You can check all details</p>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="h-100 text-end ">
              <button  className="btn btn-success" >Add New Item</button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container p-3 mx-3">
        <table class="table">
          <thead className="background-table">
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {resapesList.length > 0 ? (
              resapesList.map((resipe) => (
                <tr>
                  <th scope="row">{resipe.name}</th>
                  <td className="imgsize">
                    <img
                      className="img-fluid w-30"
                      src={`https://upskilling-egypt.com:3006/${resipe.imagePath}`}
                      alt=""
                    />
                  </td>
                  <td>{resipe.price}</td>
                  <td>{resipe.description}</td>
                  <td>{resipe.id}</td>
                  <td>{resipe.category[0].name} </td>
                  <td>
                    <i className="fa-solid fa-ellipsis" aria-hidden="true"></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
}
