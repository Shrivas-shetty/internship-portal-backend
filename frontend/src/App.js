import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Internships from "./pages/Internships";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/internships" element={<Internships />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
