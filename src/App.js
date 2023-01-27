import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import TvShowDetail from "./pages/TvShowDetail";
import TvShows from "./pages/TvShows";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/my-movie" element={<Home />} />
        <Route path="/my-movie/movies" element={<Movies />} />
        <Route path="/my-movie/movies/:id" element={<MovieDetail />} />
        <Route path="/my-movie/tvshows/" element={<TvShows />} />
        <Route path="/my-movie/tvshows/:id" element={<TvShowDetail />} />
        <Route path="/my-movie/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
