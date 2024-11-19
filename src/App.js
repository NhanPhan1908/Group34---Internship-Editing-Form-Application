import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import SignUp from "./component/Signup/Signup";
import MainLayout from "./layout/MainLayout"; 
import Dashboard from "./component/Dashboard/Dashboard";
import Document from "./component/Document/Document";
import Information from "./component/Information/Information";
import Setting from "./component/Setting/Setting";
import UpdateInfo from "./component/Setting/UpdateInfo";
import DocumentEdit from "./component/Dashboard/DocumentEdit";
import ExternalSupervisorDetail from "./component/Information/ExternalSupervisorDetail/ExternalSupervisorDetail";
import StudentDetail from "./component/Information/StudentDetail/StudentDetail";
import CompanyDetail from "./component/Information/CompanyDetail/CompanyDetail";
import InternalSupervisorDetail from "./component/Information/InternalSupervisorDetail/InternalSupervisorDetail";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="home" element={<Dashboard />} />
          <Route path="document" element={<Document />} />
          <Route path="information" element={<Information />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/update-info" element={<UpdateInfo />} />

          
          <Route path="information/student-detail" element={<StudentDetail />} />
          <Route path="information/external-supervisor-detail" element={<ExternalSupervisorDetail />} />
          <Route path="information/internal-supervisor-detail" element={<InternalSupervisorDetail />} />
          <Route path="information/company-detail" element={<CompanyDetail />} />
        </Route>

        
        <Route path="/edit/:id" element={<DocumentEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
