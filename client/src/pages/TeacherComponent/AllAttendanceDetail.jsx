import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './Attendance.css';
import '../AdminComponent/Admin.css';

function AllAttendanceDetail() {
    const { TId } = useParams();
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        Axios.get(`https://backend-sandy-six.vercel.app/api/allattendance/${TId}`)
            .then((result) => {
                setAttendanceData(result.data);
                setFilteredData(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [TId]);

    const handleFilter = () => {
        const filtered = attendanceData.filter(item => {
            return item.Date >= startDate && item.Date <= endDate;
        });
        setFilteredData(filtered);
    }

    // Function to calculate total present, total absent, and total days for a student
    const calculateAttendance = (studentId) => {
        const studentAttendance = filteredData.filter(item => item.AStudentID === studentId);
        const totalPresent = studentAttendance.filter(item => item.Status === 'Present').length;
        const totalAbsent = studentAttendance.filter(item => item.Status === 'Absent').length;
        const totalDays = studentAttendance.length;
        return { totalPresent, totalAbsent, totalDays };
    }

    // Group attendance data by student
    const groupedAttendance = {};
    filteredData.forEach(item => {
        if (!groupedAttendance[item.AStudentID]) {
            groupedAttendance[item.AStudentID] = {
                Name: item.Name,
                RegisterNo: item.AStudentID,
                Attendance: [],
            };
        }
        groupedAttendance[item.AStudentID].Attendance.push(item);
    });

    return (
        <div className='Wrapper'>
            <div className='datecontainer'>
                <label>From: </label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>To : </label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleFilter}>Filter</button>
            </div>
            <div className='Table-container'> 
                <h4>Attendance</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>RegNo</th>
                            <th>Total Present</th>
                            <th>Total Absent</th>
                            <th>Percent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(groupedAttendance).map(student => (
                            <tr key={student.RegisterNo}>
                                <td>{student.Name}</td>
                                <td>{student.RegisterNo}</td>
                                <td>{calculateAttendance(student.RegisterNo).totalPresent}</td>
                                <td>{calculateAttendance(student.RegisterNo).totalAbsent}</td>
                                <td>{((calculateAttendance(student.RegisterNo).totalPresent / calculateAttendance(student.RegisterNo).totalDays) * 100 || 0).toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllAttendanceDetail;
