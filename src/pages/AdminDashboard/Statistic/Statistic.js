import React, { useState } from 'react';
import './Statistic.css';

function Statistic() {
  const [statistics, setStatistics] = useState({
    totalUsers: 100,
    totalDocuments: 50,
    totalTasks: 30,
  });

  return (
    <div className="statistic">
      <h1>Statistics</h1>
      <div className="stat-item">
        <strong>Total Users:</strong> {statistics.totalUsers}
      </div>
      <div className="stat-item">
        <strong>Total Documents:</strong> {statistics.totalDocuments}
      </div>
      <div className="stat-item">
        <strong>Total Tasks:</strong> {statistics.totalTasks}
      </div>
    </div>
  );
}

export default Statistic;
