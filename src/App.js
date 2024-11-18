import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard";
import Document from "./component/Document/Document";
import Information from "./component/Information/Information";
import Setting from "./component/Setting/Setting";
import DocumentEdit from "./component/Dashboard/DocumentEdit";
import SignUp from "./component/Signup/Signup";
import MainLayout from "./layout/MainLayout"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="document" element={<Document />} />
          <Route path="information" element={<Information />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route path="/edit/:id" element={<DocumentEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
