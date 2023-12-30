import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Axios from 'axios';
import '../TeacherComponent/Attendance.css';
import './Admin.css';

function StudentAttendanceDetail() {
    const { SId } = useParams();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setname] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/attendancedetails/${SId}`)
      .then((result) => {
        
        setOriginalData(result.data);
        setFilteredData(result.data);
        setname(result.data[0]);
        // Count initial status
        countStatus(result.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error');
      });
  }, [SId]);

  const countStatus = (data) => {
    // Count 'Present' and 'Absent' statuses
    const presentCount = data.filter((studentDetails) => studentDetails.Status === 'Present').length;
    const absentCount = data.filter((studentDetails) => studentDetails.Status === 'Absent').length;
    setPresentCount(presentCount);
    setAbsentCount(absentCount);
  };

  const handleDateFilter = () => {
    const filteredData = originalData.filter(
      (studentDetails) =>
        studentDetails.Date >= startDate && studentDetails.Date <= endDate
    );
    setFilteredData(filteredData);
    // Recount statuses after filtering
    countStatus(filteredData);
  };
  return (
    <div><div className="Attendance-Container">
    <div className='Attendance-dash'>
      <div className='datecontainer'>
        <label> From :</label><input
          className='dateinput'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
  <label> To :</label>
        <input
          className='dateinput'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleDateFilter}>Filter</button>
      </div>
      

      <h2>Attendance Details      </h2>

      <div className='Attendance-detail-name'> 
        RegNo : {name.AstudentID}<br />
        Name  : {name.Name}
      </div>
    </div>


  </div>

  <div className="Attendance-Detail-Table">


    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((studentDetails, index) => (
          <tr key={index}>
            <td>{studentDetails.Date}</td>
            <td className={studentDetails.Status === 'Absent' ? 'Absent-status' : ''}>
              {studentDetails.Status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className='total'>
      <div className='total' >
    <h3> Total Present</h3> <p className='Number'>{presentCount}</p>
      </div>
      
     <div className='total'>
     <h3> Total Absent</h3><p className='Number'> {absentCount}</p>
     </div>
     </div>
    
  </div></div>
  )
}

export default StudentAttendanceDetail