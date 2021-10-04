import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsData } from "../NewsPage/slice";

type Pagination = {
  currentPage: number;
  totalItems: number;
};

export interface BookmarksPageState {
  favorites: NewsData[];
  pagination: Pagination;
}

const initialState: BookmarksPageState = {
  favorites: [],
  pagination: {
    currentPage: 0,
    totalItems: 0,
  },
};

export const bookmarksPageSlice = createSlice({
  name: "bookmarksPage",
  initialState,
  reducers: {
    addToFavorites: (state, payload: PayloadAction<NewsData>) => {
        const newFavorites = [...state.favorites, payload.payload]
      state.favorites = newFavorites
      state.pagination.totalItems = newFavorites.length
    },
    removeFromFavorites: (state, payload: PayloadAction<number>) => {
      const newFavorites = state.favorites.filter(
        (item) => item.id !== payload.payload
      );
      state.favorites = newFavorites;
      state.pagination.totalItems = newFavorites.length;
    },
    setNextPage: (state) => {
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousPage: (state) => {
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  setNextPage,
  setPreviousPage,
} = bookmarksPageSlice.actions;

export default bookmarksPageSlice.reducer;
