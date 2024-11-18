import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Login';
import Dashboard from './component/Dashboard/Dashboard';

import Document from './component/Document/Document';  
import Information from './component/Information/Information';  
import Setting from './component/Setting/Setting';  

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="dashboard" element={<Dashboard />}>  
          <Route path="document" element={<Document />} />
          <Route path="information" element={<Information />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
