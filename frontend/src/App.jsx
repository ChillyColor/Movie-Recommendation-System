import "./css/App.css"
import Movie from "./pages/Movie"
import Favorites from "./pages/Favourites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie/>}/>
    
         
        </Routes>
      </main>
    </MovieProvider>
  );
}
export default App;
