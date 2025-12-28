/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../../context/AuthContext";
import NoData from "../../../../../shared/components/NoData/NoData";

export default function FavList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFavId, setSelectedFavId] = useState(null);

  const { loginData } = useContext(AuthContext);
  let navigate = useNavigate();
  const [FavList, setFavList] = useState([]);
  let getFavs = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        {
          params: {
            pageNumber: 1,
            pageSize: 20,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFavList(response.data?.data);
      console.log(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  let removeFav = async (id) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("FAavorite Recipe Deleted");

      getFavs();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!loginData) return;
    if (loginData?.userGroup != "SystemUser") {
      navigate("/login");
      return;
    }
    getFavs();
  }, [loginData]);
  return (
    <>
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>Are you sure wante to Delete?</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => {
                    removeFav(selectedFavId);
                    setShowModal(false);
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-2">
        {Array.isArray(FavList) && FavList.length > 0 ? (
          <div className="container">
            <div className="row g-3">
              {FavList.map((fav) => (
                <div className="col-md-4" key={fav.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-4 ">
                    {fav.recipe?.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                        className="card-img-top "
                        alt={fav.recipe.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    ) : (
                      <NoData />
                    )}

                    <div className="card-body">
                      <h5 className="card-title fw-bold">
                        {fav.recipe.name}
                        <i
                          className="fa-regular fa-heart text-danger ms-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedFavId(fav.id);
                            setShowModal(true);
                          }}
                        ></i>
                      </h5>

                      <span className="badge mb-2">
                        {fav.recipe.category[0]?.name}
                      </span>

                      <p className="card-text text-muted mt-2">
                        {fav.recipe.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
