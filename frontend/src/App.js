import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Internships from "./pages/Internships";
import AdminCreateInternship from "./pages/AdminCreateInternship";
import MyApplications from "./pages/MyApplications";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/admin/create" element={<AdminCreateInternship />} />
        <Route path="/my-applications" element={<MyApplications />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
