import NavBar from "./components/NavBar";
import NewsPage from "./pages/NewsPage";
import BookmarksPage from "./pages/BookmarksPage";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar pages={["News", "Bookmarks"]} />
      <Switch>
        <Route path="/news">
          <NewsPage />
        </Route>
        <Route path="/bookmarks">
          <BookmarksPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
