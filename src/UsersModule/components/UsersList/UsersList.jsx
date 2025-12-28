/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import headerUser from "../../../assets/images/header2.png";
import Header from "../../../shared/components/Header/Header";
import NoData from "../../../shared/components/NoData/NoData";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async (page = 1) => {
    try {
      setLoading(true);
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${page}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsersList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages || 1);
      setTotalCount(response.data.totalCount || response.data.data.length);
      setCurrentPage(page);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      getAllUsers(currentPage);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllUsers(1);
  }, []);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <Header
        title={
          <h4 className="m-0">
            <span className="text-white fw-bold">Users</span>{" "}
            <span className="textSpan fw-light">List</span>
          </h4>
        }
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerUser}
      ></Header>
      
      {/* تمت إزالة الجزء العلوي مع المعلومات وال dropdown */}
      <div className="categories-datails d-flex justify-content-between align-items-center p-4 m-3">
        <div className="caption">
          <h3>Users Table Details</h3>
          <p>You can check all details</p>
        </div>
        {/* تم حذف هذا الجزء بالكامل */}
      </div>

      <div className="table-responsive mx-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading users...</p>
                </td>
              </tr>
            ) : usersList.length > 0 ? (
              usersList.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                  <td>{user.userName}</td>
                  <td>{user.creationDate}</td>
                  <td>{user.email}</td>
                  <td>{user.group?.name}</td>
                  <td>
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="" className="">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <i className="fa-solid fa-eye text-success me-2"></i>
                          View
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteUser(user.id)}>
                          <i className="fa fa-trash text-success me-2"></i>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls - الجزء السفلي فقط */}
      {totalPages > 1 && (
        <div className="mx-3 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            {/* زر Previous */}
            <button
              className="btn btn-outline-success"
              onClick={() => getAllUsers(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              <i className="fa-solid fa-chevron-left me-2"></i>
              Previous
            </button>
            
            {/* أرقام الصفحات */}
            <div className="d-flex gap-1 align-items-center mt-2">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === "..." ? (
                  <span key={index} className="px-2 align-self-center">...</span>
                ) : (
                  <button
                    key={index}
                    className={`btn ${pageNum === currentPage ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => getAllUsers(pageNum)}
                    disabled={loading}
                    style={{ minWidth: "40px" }}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>
            
            {/* زر Next */}
            <button
              className="btn btn-outline-success"
              onClick={() => getAllUsers(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Next
              <i className="fa-solid fa-chevron-right ms-2"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}