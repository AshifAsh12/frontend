import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import Axios from 'axios';
import './Attendance.css'
import '../AdminComponent/Admin.css'

const AttendanceRegister = () => {
  
  const { TId } = useParams();
  const [data, setdata] = useState([]);
  const [Data, setData] = useState([]);
  const [todayattendance, settodayattendance] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  const [attendanceDone, setAttendanceDone] = useState(false);
  const [dateCompleted, setDateCompleted] = useState(false);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacheruserdata/${TId}`)
      .then(result => {
        
          setData(result.data[0]);


      })
      .catch(error => {
        console.error(error);
       
      });
  }, [TId]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/attendance/${TId}`)
      .then((result) => {
        setdata(result.data);

        // Initialize attendance based on the data received
        const initialAttendance = result.data.map((student) => student.status);
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        console.error(error);
     
      });
  }, []);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/attendancecheck/${TId}`, {
      params: { date: formattedDate },
    })
      .then(result => {
      
        if (result.data.length > 0) {
          setDateCompleted(true);
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [TId, formattedDate]);

  const updateAttendance = (status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[currentStudent] = status;
    setAttendance(updatedAttendance);

    // Move to the next student or finish the date
    if (currentStudent + 1 < data.length) {
      setCurrentStudent((prevStudent) => prevStudent + 1);
    } else {
      setAttendanceDone(true);
      setDateCompleted(true);

      // Ensure all attendance statuses are populated
      const allAttendancePopulated = updatedAttendance.every((status) => status !== null);

      if (allAttendancePopulated) {
        // Submit attendance data for all students
        const attendanceData = data.map((student, index) => ({
          regno: student.Regno,
          status: updatedAttendance[index],
        }));

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        Axios.post('https://backend-sandy-six.vercel.app/api/submitAttendance', {
          attendanceData,
          date: formattedDate,
          ClassID: Data.Class_ID,
          IID: Data.TInstituteID,
        })
          .then((response) => {
            window.location.reload();

          })
          .catch((error) => {
            console.error('Error submitting attendance:', error);
          });
      }
    }
  };

  const handlePresent = () => {
    if (!attendanceDone && !dateCompleted) {
      updateAttendance('Present');
    }
  };

  const handleAbsent = () => {
    if (!attendanceDone && !dateCompleted) {
      updateAttendance('Absent');
    }
  };



  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/todaysattendance/${TId}`,
      { params: { date: formattedDate } })
      .then((result) => {
        
        settodayattendance(result.data)
      })
      .catch((error) => {
        console.error(error);
        
      });
  }, []);

  return (

    <div>
      <div className='Attendance-Container'>
      <div className='Attendance-dash'>
        <h2>Attendance</h2>
        </div>

        {data.length > 0 ? (
          <div className='Attendance-box'>



            {!attendanceDone && !dateCompleted && (
              <div className='Attendance-name'>
                <p>
                  Marking Attendance For</p>


                <p>Regno :  {data[currentStudent].Regno}</p>
                <p>Name :  {data[currentStudent].Name}</p>

              </div>
            )}
            {!attendanceDone && !dateCompleted && (
              <div className='Attendance-button'>
                <button className='Present-button' onClick={handlePresent}>Present</button>
                <button className='Absent-button' onClick={handleAbsent}>Absent</button>
              </div>
            )}
          </div>
        ) : (
          <p className="Null-details">No data available for the specified teacher ID</p>
        )}
        {dateCompleted && (
          <div>
            <p className="Null-details">Todays Attendance has been marked.</p>
            <br></br>
            <div className='Attendance-Table'>
              <p>Todays Attendance</p>
              <table>
                <thead>
                  <th>Date</th>
                  <th>Regno</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {todayattendance.map((studentDetails, index) => (
                    <tr key={index}>
                      <td>{studentDetails.Date}</td>
                      <td>{studentDetails.AstudentID}</td>
                      <td>{studentDetails.Name}</td>
                      <td className={studentDetails.Status === 'Absent' ? 'Absent-status' : ''}>
                        {studentDetails.Status}
                      </td>

                      <td> <Link
                  to={`/teacherhomepage/${TId}/attendacedetails/${studentDetails.AstudentID}`}
                >
                  Details
                </Link></td>


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
};

export default AttendanceRegister;
