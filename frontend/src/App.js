import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Internships from "./pages/Internships";
import AdminCreateInternship from "./pages/AdminCreateInternship";
import RecruiterCreateInternship from "./pages/RecruiterCreateInternship";

import StudentApplications from "./pages/StudentApplications";
import Entrance from "./pages/Entrance";
import StudentHome from "./pages/StudentHome";
import RecruiterInternships from "./pages/RecruiterInternships";
import RecruiterApplications from "./pages/RecruiterApplications";
import AdminHome from "./pages/AdminHome";
import RecruiterHome from "./pages/RecruiterHome";
import StudentSaves from "./pages/StudentSaves";

import StudentOffers from "./pages/StudentOffers";
import RecruiterOffers from "./pages/RecruiterOffers";
import AdminAnalytics from "./pages/AdminAnalytics";
import RecruiterUpdateInternship from "./pages/RecruiterUpdateInternship"; // adjusts path if needed
import AdminManageInternships from "./pages/AdminManageInternships";
import UserProfile from "./pages/UserProfile";
import UserEditProfile from "./pages/UserEditProfile";
import Instructions from "./pages/Instructions";
import RecruiterApplicationsHome from "./pages/RecruiterApplicationsHome";
import RecruiterApplicationsShortlisted from "./pages/RecruiterApplicationsShortlisted";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Entrance/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/student/home" element={<StudentHome/>} />
        <Route path="/student/internships" element={<Internships />} />
        <Route path="/student/myApplications" element={<StudentApplications />} />
        <Route path="/student/mySaved" element={<StudentSaves />} />
        <Route path="/student/myOffers" element={<StudentOffers />} />
        <Route path="/student/myProfile" element={<UserProfile/>} />
        <Route path="/student/myProfile/edit" element={<UserEditProfile/>} />
        <Route path="/student/guidelines" element={<Instructions/>} />

        
        <Route path="/recruiter/home" element={<RecruiterHome />} />
        <Route path="/recruiter/internships" element={<Internships />} />
        <Route path="/recruiter/addInternship" element={<RecruiterCreateInternship/>} />
        <Route path="/recruiter/myInternships" element={<RecruiterInternships/>} />

        <Route path="/recruiter/applicationsHome" element={<RecruiterApplicationsHome/>} />
        <Route path="/recruiter/myApplications" element={<RecruiterApplications />} />
        <Route path="/recruiter/myApplications/shortlisted" element={<RecruiterApplicationsShortlisted />} />


        <Route path="/recruiter/myOffers" element={<RecruiterOffers />} />
        <Route path="/recruiter/update-internship/:id" element={<RecruiterUpdateInternship />} />
        <Route path="/recruiter/myProfile" element={<UserProfile/>} />
        <Route path="/recruiter/myProfile/edit" element={<UserEditProfile/>} />
        <Route path="/recruiter/guidelines" element={<Instructions/>} />

        

        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/internships" element={<AdminManageInternships />} />
        <Route path="/admin/addInternship" element={<AdminCreateInternship/>} />
        <Route path="/admin/Analytics" element={<AdminAnalytics/>} />
        <Route path="/admin/myProfile" element={<UserProfile/>} />
        <Route path="/admin/myProfile/edit" element={<UserEditProfile/>} />
        <Route path="/admin/guidelines" element={<Instructions/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
