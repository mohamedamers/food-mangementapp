/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import headerImg from "../../../assets/images/header2.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../shared/components/Header/Header";
import NoData from "../../../shared/components/NoData/NoData";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [recId, setRecId] = useState(0);
  const [recName, setRecName] = useState("");
  
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  const [openId, setOpenId] = useState(null);
  const dropdownRef = useRef(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (res) => {
    setRecId(res.id);
    setRecName(res.name);
    setShow(true);
  };

  const getAllRecipes = async (pageNo) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRecipesList(response.data.data);
      setTotalNumberOfPages(response.data.totalNumberOfPages || 1);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

 useEffect(() => {
  getAllRecipes(pageNumber);
}, [pageNumber]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteRecipe = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getAllRecipes(pageNumber);
      handleClose();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // تعديل الـ handleAction عشان يوجه للصفحات الصح
  const handleAction = (actionType, recipe) => {
    setOpenId(null);
    if (actionType === "view") {
      // توجيه لصفحة العرض (لو عاملها)
      navigate(`/dashboard/recipe-data/${recipe.id}`, { state: { viewMode: true } });
    } 
    else if (actionType === "edit") {
      // توجيه لصفحة التعديل بالـ ID
      navigate(`/dashboard/recipe-data/${recipe.id}`);
    }
  };

  return (
    <>
      <Header
        title={"Recipes Items"}
        description={"You can now add your items that any user can order from the Application and you can edit"}
        imgUrl={headerImg}
      />

      <div className="container-fluid py-4">
        <div className="row align-items-center mb-4 px-3">
          <div className="col-md-6">
            <h4 className="fw-bold text-dark">Recipe Table Details</h4>
            <p className="text-muted">You can check all details</p>
          </div>
          <div className="col-md-6 text-end">
            {/* زرار الإضافة يروح لصفحة الـ Data بدون ID */}
            <button className="btn btn-success px-4" onClick={() => navigate('/dashboard/recipe-data')}>
              Add New Item
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <DeleteConfirmation deleteItem={'Recipe'} name={recName} />
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="outline-danger" className="px-4" onClick={deleteRecipe}>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="table-responsive bg-white shadow-sm rounded p-3 mx-3">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Item Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Description</th>
                <th>Tag</th>
                <th>Category</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.length > 0 ? (
                recipesList.map((recipe) => (
                  <tr key={recipe.id}>
                    <td className="fw-bold">{recipe.name}</td>
                    <td>
                      <div className="overflow-hidden rounded border" style={{ width: "50px", height: "50px" }}>
                        <img
                          className="w-100 h-100 object-fit-cover"
                          src={recipe.imagePath ? `https://upskilling-egypt.com:3006/${recipe.imagePath}` : "https://via.placeholder.com/50"}
                          alt={recipe.name}
                        />
                      </div>
                    </td>
                    <td>{recipe.price} EGP</td>
                    <td className="text-truncate" style={{ maxWidth: "150px" }}>{recipe.description}</td>
                    <td><span className="badge bg-light text-dark border">{recipe.tag?.name}</span></td>
                    <td>{recipe.category?.[0]?.name || "N/A"}</td>
                    <td className="text-center position-relative">
                      <button className="btn btn-sm border-0" onClick={() => setOpenId(openId === recipe.id ? null : recipe.id)}>
                        <i className="fa-solid fa-ellipsis-vertical fs-5 text-secondary"></i>
                      </button>
                      
                      {openId === recipe.id && (
                        <div ref={dropdownRef} className="dropdown-menu show shadow-lg border-0" 
                             style={{ position: "absolute", right: "40px", top: "10px", zIndex: 1050, minWidth: "120px" }}>
                          <button className="dropdown-item py-2" onClick={() => handleAction("view", recipe)}>
                            <i className="fa-regular fa-eye text-success me-2"></i> View
                          </button>
                          <button className="dropdown-item py-2" onClick={() => handleAction("edit", recipe)}>
                            <i className="fa-solid fa-pencil text-success me-2"></i> Edit
                          </button>
                          <button className="dropdown-item py-2 text-dark" onClick={() => handleShow(recipe)}>
                            <i className="fa-solid fa-trash me-2 text-success"></i> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7"><NoData /></td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex gap-2 mt-4 justify-content-center">
          <button className="btn btn-outline-success btn-sm" disabled={pageNumber === 1} onClick={() => setPageNumber((p) => p - 1)}>
            Prev
          </button>
          <span className="align-self-center mx-2 small">Page <b>{pageNumber}</b> of <b>{totalNumberOfPages}</b></span>
          <button className="btn btn-outline-success btn-sm" disabled={pageNumber >= totalNumberOfPages} onClick={() => setPageNumber((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}