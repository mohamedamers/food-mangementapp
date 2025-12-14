/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import headerImg from "../../../assets/images/header2.png";
import axios from "axios";
import NoData from "../../../shared/components/NoData/NoData";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);

  const getAllCategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <Header
        title={"Categories Item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 ">
            <div className="d-flex mx-3 flex-column">
              <h4 className="text-black ">Categories Table Details</h4>
              <p>You can check all details</p>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="h-100 text-end ">
              <button className="btn btn-success">Add New Category</button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container p-3 mx-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length > 0 ? (
              categoriesList.map((category) => (
                <tr>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
