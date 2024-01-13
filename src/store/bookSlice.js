import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logReport } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
          "https://my-json-server.typicode.com/DanaMedany/book-store-app-json-server/books"
        ),
        data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    try {
      bookData.creator = getState().auth.creator;
      const response = await fetch(
        "https://my-json-server.typicode.com/DanaMedany/book-store-app-json-server/books",
        {
          method: "POST",
          body: JSON.stringify(bookData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      dispatch(logReport({ name: "addBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logReport({ name: "addBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(
        `https://my-json-server.typicode.com/DanaMedany/book-store-app-json-server/books${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { books: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: {
    //Get Books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //Add Book
    [addBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [addBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    },
    [addBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete Book
    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => book.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice.reducer;
