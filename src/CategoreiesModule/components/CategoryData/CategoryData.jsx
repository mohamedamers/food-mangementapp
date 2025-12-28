import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
export default function CategeriesData({ show, handleClose }) {
  const [categoryName, setCategoryName] = useState("");

  const addCategory = async () => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Category/",
        { name: categoryName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      handleClose();
      toast.success("Category Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Add Category</Modal.Title>
          <button
            className="cancel btn btn-outline-danger rounded-circle py-1 ms-auto"
            onClick={handleClose}
          >
            ✕
          </button>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={addCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
