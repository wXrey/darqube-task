import { configureStore } from "@reduxjs/toolkit";
import bookmarksPage, {
  BookmarksPageState,
} from "../pages/BookmarksPage/slice";
import newsPage, { NewsPageState } from "../pages/NewsPage/slice";

export interface RootState {
  newsPage: NewsPageState;
  bookmarksPage: BookmarksPageState;
}

export default configureStore({
  reducer: {
    newsPage,
    bookmarksPage,
  },
});
