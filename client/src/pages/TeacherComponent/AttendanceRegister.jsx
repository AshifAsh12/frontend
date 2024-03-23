import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import './Attendance.css';
import '../AdminComponent/Admin.css';

const AttendanceRegister = () => {
  const { TId } = useParams();
  const [data, setdata] = useState([]);
  const [Data, setData] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  const [attendanceDone, setAttendanceDone] = useState(false);
  const [dateCompleted, setDateCompleted] = useState(false);
  const [nulldata, setNulldata] = useState('');
  const [confirmSubmit, setConfirmSubmit] = useState(true);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [showDetails, setShowDetails] = useState('all');

  

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacheruserdata/${TId}`)
      .then((result) => {
        setData(result.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [TId]);


  


  



  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/attendancecheck/${TId}`, {
      params: { date: formattedDate },
    })
      .then((result) => {
        if (result.data.length > 0) {
          setDateCompleted(true);
          Axios.get(`https://backend-sandy-six.vercel.app/api/todaysattendance/${TId}`, {
            params: { date: formattedDate },
          })
            .then((result) => {
              setTodayAttendance(result.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          Axios.get(`https://backend-sandy-six.vercel.app/api/attendance/${TId}`)
            .then((result) => {
              if (result.data.length > 0) {
                setdata(result.data);
                // Initialize attendance based on the data received
                const initialAttendance = result.data.map((student) => student.status);
                setAttendance(initialAttendance);
              } else {
                setNulldata('No data Available For Specific TeacherID');
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
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

        // Ask for confirmation before submitting attendance
        const confirmSubmit = window.confirm('Are you sure you want to submit the attendance? Once submitted, it cannot be changed.');

        if (confirmSubmit) {
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
        } else {
          setConfirmSubmit(false); 
          window.location.reload();// Set confirmSubmit to false if the user cancels
        }
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

  const handleUndo = () => {
    if (currentStudent > 0) {
      setCurrentStudent((prevStudent) => prevStudent - 1);
      const updatedAttendance = [...attendance];
      updatedAttendance[currentStudent] = null;
      setAttendance(updatedAttendance);
      setAttendanceDone(false);
    }
  };


  const handleDetailsToggle = (option) => {
    setShowDetails(option);
  };
  return (
    <div>
      <div>

        <Link to={`/teacherhomepage/${TId}/allattendance`}  className='consolidate' >Consolidate</Link>

      
        {data.length > 0 ? (
          <div className="Attendance-box">
            {!attendanceDone && !dateCompleted && (
              <div className="Attendance-name">
                <div>
                  <p> Marking Attendance For</p>
                  <p>Regno : {data[currentStudent].Regno}</p>
                  <p>Name : {data[currentStudent].Name}</p>
                </div>
                <div className="Attendance-button">
                  <button className="Present-button" onClick={handlePresent}>
                    Present
                  </button>
                  <button className="Absent-button" onClick={handleAbsent}>
                    Absent
                  </button><br/>
                  <button className="Undo-button" onClick={handleUndo}>
                    Undo
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="Null-details">{nulldata}</p>
        )}
        {dateCompleted && confirmSubmit && (
          <div className="Attendance-box">
            



           
            <div className='Table-container'>

            <h4>Todays Attendance has been marked.</h4>

           <div className='detail-container'>
            <button onClick={() => handleDetailsToggle('all')}>All</button>
            <button onClick={() => handleDetailsToggle('present')}>Present</button>
            <button onClick={() => handleDetailsToggle('absent')}>Absent</button>
          </div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Regno</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todayAttendance.map((studentDetails, index) => {
                  if (
                    showDetails === 'all' ||
                    (showDetails === 'present' && studentDetails.Status === 'Present') ||
                    (showDetails === 'absent' && studentDetails.Status === 'Absent')
                  ) {
                    return (
                      <tr key={index}>
                        <td>{studentDetails.Date}</td>
                        <td>{studentDetails.AstudentID}</td>
                        <td>{studentDetails.Name}</td>
                        <td className={studentDetails.Status === 'Absent' ? 'Absent-status' : ''}>
                          {studentDetails.Status}
                        </td>
                        <td>
                          <Link to={`/teacherhomepage/${TId}/attendacedetails/${studentDetails.AstudentID}`} className="Detail">
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
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
