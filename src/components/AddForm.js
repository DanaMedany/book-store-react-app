import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBook } from "../store/bookSlice";

const AddForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const changeFormHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addBook(formData));
    setFormData({
      title: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={submitFormHandler}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={changeFormHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={changeFormHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              id="Description"
              name="description"
              value={formData.description}
              onChange={changeFormHandler}
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isLoggedIn}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
