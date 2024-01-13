import React from "react";
import { useDispatch } from "react-redux";
import { deleteBook } from "../../store/bookSlice";

const BooksList = ({ isLoading, books, isLoggedIn, readBook }) => {
  const dispatch = useDispatch();

  const bookList = books.length
    ? books.map((book) => (
        <li
          key={book.id}
          className="list-group-item d-flex  justify-content-between align-items-center"
        >
          <div>{book.title}</div>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => readBook(book.id)}
            >
              Read
            </button>
            <button
              type="button"
              className="btn btn-danger"
              disabled={!isLoggedIn}
              onClick={() =>
                dispatch(deleteBook(book))
                  .unwrap()
                  .then((originPromiseResult) => {
                    console.log(originPromiseResult);
                  })
                  .catch((rejectValueOrSerializedError) => {
                    console.log(rejectValueOrSerializedError);
                  })
              }
            >
              Delete
            </button>
          </div>
        </li>
      ))
    : "There is no books available";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "Loading" : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
