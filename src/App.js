
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login/Login";
import SignUp from "./component/Signup/Signup";
import MainLayout from "./layout/MainLayout"; 
import DashboardStudent from "./pages/StudentDashboard/DashboardStudent/Dashboard";
import DashboardAdmin from "./pages/AdminDashboard/DashboardAdmin/DashboardAdmin";
import Document from "./pages/StudentDashboard/Document/Document";
import DocumentEditAdmin from "./pages/AdminDashboard/DashboardAdmin/DocumentEditAdmin";
import WorkManagerAdmin from "./pages/AdminDashboard/DashboardAdmin/WorkManagerAdmin";
import ManagerUser from "./pages/AdminDashboard/ManagerUser/UserManager";
import Statistic from "./pages/AdminDashboard/Statistic/Statistic";
import UpdateInfo from "./pages/StudentDashboard/Setting/UpdateInfo";
import StudentDetail from "./pages/StudentDashboard/Information/StudentDetail";
import ExternalSupervisorDetail from "./pages/StudentDashboard/Information/ExternalSupervisorDetail";
import InternalSupervisorDetail from "./pages/StudentDashboard/Information/InternalSupervisorDetail";
import CompanyDetail from "./pages/StudentDashboard/Information/CompanyDetail";
import PreviewDocument from "./pages/StudentDashboard/PreviewDocument/PreviewDocument";
import Information from "./pages/StudentDashboard/Information/Information";
import Setting from "./pages/StudentDashboard/Setting/Setting";
import UserManager from "./pages/AdminDashboard/ManagerUser/UserManager";

function App() {
  console.log(MainLayout)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        
        <Route path="/student-dashboard" element={<MainLayout role="Student" />}>
          <Route index element={<DashboardStudent />} />
          <Route path="home" element={<DashboardStudent />} />
          <Route path="document" element={<Document />} />
          <Route path="previewdocument" element={<PreviewDocument />} />
          <Route path="information" element={<Information />} />
          <Route path="setting" element={<Setting />} />
          <Route path="setting/update-info" element={<UpdateInfo />} />
          <Route path="student-detail" element={<StudentDetail />} />
          <Route path="external-detail" element={<ExternalSupervisorDetail />} />
          <Route path="internal-detail" element={<InternalSupervisorDetail />} />
          <Route path="company-detail" element={<CompanyDetail />} />
        
        </Route>
        

        
        <Route path="/admin-dashboard" element={<MainLayout role="Admin" />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="home" element={<DashboardAdmin />} />
          <Route path="document" element={<DocumentEditAdmin />} />
          <Route path="work-manager" element={<WorkManagerAdmin />} />
          <Route path="manager-user" element={<UserManager />} />
          <Route path="statistic" element={<Statistic />} />
        </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
