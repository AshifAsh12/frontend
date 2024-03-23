import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './Attendance.css';
import '../AdminComponent/Admin.css';

function AttendanceDetail() {
  const { SId } = useParams();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setname] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/attendancedetails/${SId}`)
      .then((result) => {
        const data = result.data;

        if (data.length === 0) {
          setNoDataMessage('No data available for the current student.');
        } else {
          setOriginalData(data);
          setFilteredData(data);
          setname(data[0]);
          // Count initial status
          countStatus(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [SId]);

  const countStatus = (data) => {
    const presentCount = data.filter((studentDetails) => studentDetails.Status === 'Present').length;
    const absentCount = data.filter((studentDetails) => studentDetails.Status === 'Absent').length;
    setPresentCount(presentCount);
    setAbsentCount(absentCount);
  };

  const handleDateFilter = (e) => {
    e.preventDefault(); // Prevent page reload

    const filteredData = originalData.filter((studentDetails) => {
      const [day, month, year] = studentDetails.Date.split('-');
      const studentDate = new Date(`${month}-${day}-${year}`);
      return studentDate >= new Date(startDate) && studentDate <= new Date(endDate);
    });
    setFilteredData(filteredData);
    // Recount statuses after filtering
    countStatus(filteredData);
  };

  const handlePresentFilter = (e) => {
    e.preventDefault();
    
    const presentData = originalData.filter((studentDetails) => studentDetails.Status === 'Present');
    setFilteredData(presentData);
    countStatus(presentData);
  };

  const handleAbsentFilter = (e) => {
    e.preventDefault();
    const absentData = originalData.filter((studentDetails) => studentDetails.Status === 'Absent');
    setFilteredData(absentData);
    countStatus(absentData);
  };

  return (
    <div>
      <div className='datecontainer'>
        <form>
          <label> From :</label>
          <input
            className='dateinput'
            type="date"
            value={startDate}
           
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label> To :</label>
          <input
            className='dateinput'
            type="date"
            value={endDate}
         
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <button onClick={handleDateFilter}>Filter</button>
          <br/>

          <div className='presentAbsent'>
          <button onClick={handlePresentFilter}>Present</button>
          <button onClick={handleAbsentFilter}>Absent</button>
          </div>
          
        </form>
      </div>

      <div className='Attendance-box'>
        {noDataMessage ? (
          <p>{noDataMessage}</p>
        ) : (
          <div>
            <div className='total-attendance-box'>
              <div className='total-attendance'>
                <h5>RegNo : {name.AstudentID}</h5>
                <h5> Name  : {name.Name}</h5>
              </div>
              <div className='total-attendance'>
                <h5> Total Present</h5> <p className='Number'>{presentCount}</p>
              </div>
              <div className='total-attendance'>
                <h5> Total Absent</h5><p className='Number'> {absentCount}</p>
              </div>
            </div>

            <div className='Attendance-Table'>
              <table className='Table'>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttendanceDetail;
