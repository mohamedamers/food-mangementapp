/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import headerImg from "../../../assets/images/header2.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import Header from "../../../shared/components/Header/Header";
import NoData from "../../../shared/components/NoData/NoData";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [catId, setCatId] = useState(0);
  const [catName, setCatName] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  const [openId, setOpenId] = useState(null);
  const dropdownRef = useRef(null);

  // States للمودالات
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Functions التحكم في المودالات
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (cat) => {
    setCatId(cat.id);
    setCatName(cat.name);
    setShowDelete(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setNewCategoryName("");
  };
  const handleShowAdd = () => setShowAdd(true);

  // جلب البيانات
  const getAllCategories = async (pageNo) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategoriesList(response.data.data);
      setTotalNumberOfPages(response.data.totalNumberOfPages || 1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // إضافة تصنيف جديد
  const addCategory = async () => {
    try {
      await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/Category/`,
        { name: newCategoryName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleCloseAdd();
      getAllCategories(pageNumber); // تحديث الجدول بعد الإضافة
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // حذف تصنيف
  const deleteCategory = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleCloseDelete();
      getAllCategories(pageNumber); // تحديث الجدول بعد الحذف
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    getAllCategories(pageNumber);
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

  return (
    <>
      <Header
        title={"Categories Item"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />

      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="row align-items-center mb-4 px-3">
          <div className="col-md-6">
            <h4 className="fw-bold text-dark">Categories Table Details</h4>
            <p className="text-muted">You can check all details</p>
          </div>
          <div className="col-md-6 text-end">
            <button className="btn btn-success px-4" onClick={handleShowAdd}>
              Add New Category
            </button>
          </div>
        </div>

        {/* Modal الإضافة (Add Category) */}
        <Modal show={showAdd} onHide={handleCloseAdd} centered>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-4">
            <input
              type="text"
              className="form-control py-2 bg-light text-muted"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              variant="success"
              className="w-100 py-2"
              onClick={addCategory}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal الحذف (Delete Confirmation) */}
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <DeleteConfirmation deleteItem={"Category"} name={catName} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={deleteCategory}>
              Delete this item
            </Button>
          </Modal.Footer>
        </Modal>

        {/* الجدول */}
        <div className="table-responsive mx-3 shadow-sm rounded bg-white p-3">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.length > 0 ? (
                categoriesList.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td className="fw-medium">{category.name}</td>
                    <td>
                      {new Date(category.creationDate).toLocaleDateString()}
                    </td>
                    <td className="text-end position-relative">
                      <button
                        className="btn border-0"
                        onClick={() =>
                          setOpenId(openId === category.id ? null : category.id)
                        }
                      >
                        <i className="fa-solid fa-ellipsis-vertical fs-5 text-secondary"></i>
                      </button>
                      {openId === category.id && (
                        <div
                          ref={dropdownRef}
                          className="dropdown-menu show shadow-lg border-0"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "80%",
                            zIndex: 1050,
                            minWidth: "130px",
                          }}
                        >
                          <button className="dropdown-item py-2">
                            <i className="fa-regular fa-eye text-success me-2"></i>{" "}
                            View
                          </button>
                          <button className="dropdown-item py-2">
                            <i className="fa-solid fa-pencil text-success me-2"></i>{" "}
                            Edit
                          </button>
                          <button
                            className="dropdown-item py-2 text-black"
                            onClick={() => handleShowDelete(category)}
                          >
                            <i className="fa-solid fa-trash me-2 text-success"></i>{" "}
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* الترقيم (Pagination) */}
        <div className="d-flex gap-2 mt-4 justify-content-center">
          <button
            className="btn btn-outline-secondary"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber((p) => p - 1)}
          >
            Prev
          </button>
          <span className="align-self-center mx-2">
            Page <b>{pageNumber}</b> of <b>{totalNumberOfPages}</b>
          </span>
          <button
            className="btn btn-outline-secondary"
            disabled={pageNumber >= totalNumberOfPages}
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
