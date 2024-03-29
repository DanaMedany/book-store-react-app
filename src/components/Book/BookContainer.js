import React, { Fragment, useEffect, useState } from "react";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";

import "./book.css";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../store/bookSlice";

const PostContainer = () => {
  const { isLoading, books } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const readBook = (id) => {
    const dataBook = books.find((book) => book.id === id);
    setSelectedBook((perState) => {
      return {
        ...perState,
        ...dataBook,
      };
    });
  };

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
            readBook={readBook}
          />
        </div>
        <div className="col side-line">
          <BookInfo book={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
