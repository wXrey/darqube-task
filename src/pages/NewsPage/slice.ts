import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface NewsData {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

type Pagination = {
  currentPage: number;
  totalItems: number;
};

export interface NewsPageState {
  data: NewsData[];
  filteredData: NewsData[];
  shouldDisplayFilteredData: boolean;
  isLoading: boolean;
  error: null | string;
  pagination: Pagination;
}

const initialState: NewsPageState = {
  data: [],
  filteredData: [],
  shouldDisplayFilteredData: false,
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 0,
    totalItems: 234,
  },
};

export const newsPageSlice = createSlice({
  name: "newsPage",
  initialState,
  reducers: {
    getNewsDataStart: (state) => {
      state.data = [];
      state.isLoading = true;
      state.error = null;
    },
    getNewsDataSuccess: (state, payload: PayloadAction<NewsData[]>) => {
      state.data = payload.payload;
      state.pagination.totalItems = payload.payload.length;
      state.isLoading = false;
      state.error = null;
    },
    getNewsDataError: (state, payload: PayloadAction<AxiosError>) => {
      state.data = [];
      state.isLoading = false;
      state.error = payload.payload.message;
    },

    setNextPage: (state) => {
      state.pagination.currentPage = state.pagination.currentPage + 1;
    },
    setPreviousPage: (state) => {
      state.pagination.currentPage = state.pagination.currentPage - 1;
    },

    setFilteredData: (state, payload: PayloadAction<string>) => {
      if (payload.payload) {
        const filtered = state.data.filter((item) =>
          [item.headline.toLowerCase(), item.summary.toLowerCase()]
            .join(" ")
            .includes(payload.payload.toLowerCase())
        );

        state.pagination.currentPage = 0;
        state.shouldDisplayFilteredData = true;
        state.filteredData = filtered;
        return;
      }

      state.pagination.currentPage = 0;
      state.shouldDisplayFilteredData = false;
      state.filteredData = [];
    },
  },
});

export const {
  getNewsDataStart,
  getNewsDataSuccess,
  getNewsDataError,
  setNextPage,
  setPreviousPage,
  setFilteredData,
} = newsPageSlice.actions;

export default newsPageSlice.reducer;
