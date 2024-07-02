import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import MovieDetail from "./pages/MovieDetail";

import Layout from "./layouts/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addNewMovie" element={<AddMovie />} />
        <Route path="/addMovie/:id" element={<AddMovie />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
