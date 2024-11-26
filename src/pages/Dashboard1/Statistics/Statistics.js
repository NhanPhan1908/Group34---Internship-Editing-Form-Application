// ./pages/Dashboard1/Statistics/Statistics.js
import React from 'react';

const Statistics = () => {
  return (
    <div>
      <h1>Statistics Page</h1>
      <table class="stats-table"> 
        <tr>
          <th>STT</th>
          <th>Họ và tên</th>
          <th>Ngành</th>
          <th>Nơi thực tập</th>
          <th>Thực tập tại Lab/Công ti</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Martin Odegaard</td>
          <td>CAM</td>
          <td>Arsenal</td>
          <td>Công ti</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Marcus Rashford</td>
          <td>LW</td>
          <td>Man Utd</td>
          <td>Lab</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Nicolo Savona</td>
          <td>RB</td>
          <td>Juventus</td>
          <td>Lab</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Teun Koopmeiners</td>
          <td>AM</td>
          <td>Juventus</td>
          <td>Công ti</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Tomas Pobega</td>
          <td>CM</td>
          <td>Bologna</td>
          <td>Công ti</td>
        </tr>
      </table>
    </div>
  );
};

export default Statistics;