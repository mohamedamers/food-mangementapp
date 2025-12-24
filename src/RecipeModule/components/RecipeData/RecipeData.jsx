/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecipeData() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const { id } = useParams();
  const isUpdateMode = !!id;
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);

    if (data.recipeImage && data.recipeImage[0]) {
      formData.append("recipeImage", data.recipeImage[0]);
    }
    return formData;
  };

  const onSubmit = async (data) => {
    const recipeData = appendToFormData(data);
    const url = isUpdateMode
      ? `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`
      : "https://upskilling-egypt.com:3006/api/v1/Recipe/";

    try {
      await axios({
        method: isUpdateMode ? "put" : "post",
        url: url,
        data: recipeData,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // 1. Show Success Message
      toast.success(
        isUpdateMode
          ? "Recipe updated successfully!"
          : "Recipe added successfully!",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );

      // 2. Clear Form Data
      reset();

      // 3. Wait 2 seconds then navigate to list
      setTimeout(() => {
        navigate("/dashboard/recipes");
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong, please try again");
      console.error(error);
    }
  };

  const getRecipeById = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const recipe = response.data;
      setValue("name", recipe.name);
      setValue("price", recipe.price);
      setValue("description", recipe.description);
      setValue("tagId", recipe.tag?.id);
      setValue("categoriesIds", recipe.category[0]?.id);
    } catch (error) {
      console.error(error);
    }
  };

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
      console.error(error);
    }
  };

  const getAllTags = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTagsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllTags();
    if (isUpdateMode) getRecipeById();
  }, [id]);

  return (
    <>
      <ToastContainer />

      <div className="home-details m-3 d-flex justify-content-between align-items-center p-4 ">
        <div className="caption">
          <h4 className="text-black">
            {isUpdateMode ? "Edit the" : "Fill the"}{" "}
            <span className="text-success">Recipe</span> !
          </h4>
          <p className="mb-0 text-muted">
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/recipes")}
          className="btn btn-success px-4"
        >
          All Recipes <i className="fa fa-arrow-right ms-2"></i>
        </button>
      </div>

      <form
        className="w-75 p-5 m-auto bg-white rounded shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="form-control bg-light"
            placeholder="Recipe Name"
          />
          {errors.name && (
            <span className="text-danger small">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-3">
          <select
            {...register("tagId", { required: "Tag is required" })}
            className="form-control bg-light"
          >
            <option value="">Choose Tag</option>
            {tagsList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tagId && (
            <span className="text-danger small">{errors.tagId.message}</span>
          )}
        </div>

        <div className="mb-3">
          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            className="form-control bg-light"
            placeholder="Recipe Price"
          />
          {errors.price && (
            <span className="text-danger small">{errors.price.message}</span>
          )}
        </div>

        <div className="mb-3">
          <select
            {...register("categoriesIds", { required: "Category is required" })}
            className="form-control bg-light"
          >
            <option value="">Choose Category</option>
            {categoriesList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoriesIds && (
            <span className="text-danger small">
              {errors.categoriesIds.message}
            </span>
          )}
        </div>

        <div className="mb-3">
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="form-control bg-light"
            placeholder="Description"
            rows="4"
          ></textarea>
          {errors.description && (
            <span className="text-danger small">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="upload-wrapper border border-dashed rounded p-4 text-center my-3 bg-light">
          <input
            {...register("recipeImage")}
            type="file"
            className="form-control"
          />
          <p className="text-muted mt-2 small">
            Drag & Drop or Choose a Item Image to Upload
          </p>
        </div>

        <div className="btns d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-outline-success px-5 mx-2"
            onClick={() => navigate("/dashboard/recipes")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-5 mx-2">
            {isUpdateMode ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
