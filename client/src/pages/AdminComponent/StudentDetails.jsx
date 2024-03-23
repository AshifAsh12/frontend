import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import './Admin.css';
import { FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

function StudentDetails() {
  const { IId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nulldata, setNullData] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/studentdetail/${IId}`)
      .then((result) => {
        setData(result.data);
        if (result.data.length === 0) {
          setNullData('Student Not Present. Add Student.');
        } else {
          setNullData('');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [IId]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = data.filter((studentDetails) =>
      studentDetails.Regno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDeleteConfirmation = (student) => {
    setSelectedStudent(student);
    const confirmation = window.confirm(`Are you sure you want to delete ${student.Name}?`);
    if (confirmation) {
      handleDeleteYes();
    }
  };

  const handleDeleteYes = () => {
    if (selectedStudent) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/deletestudent/${IId}`, {
        SId: selectedStudent.Regno,
      })
        .then((response) => {
          if (response.data.message === 'Not found') {
            alert('Student Not Found In this Institute');
          } else if (response.data.message === 'found') {
            alert('Deleted Successfully');
            window.location.reload();
          } else {
            alert('Unexpected Response From Server');
          }
        })
        .catch((error) => {
          alert('Server Not Found');
        });
    }
  };

  return (
    <div>
      <Link to={`/adminhomepage/${IId}/addstudent`} className="addbutton">
        <IoMdPersonAdd /> Add
      </Link>
      <div className="search-container">
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Register_No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button className='Search-Button'><FaSearch /></button>
        </form>
      </div>
      <div>
        <div className="Detail-box">
          {filteredData.map((studentDetails, index) => (
            <div key={index} className="student-card">
              <FaUserAlt  className="detail-profile" />
              <div className="record">
                <label className="head">RegNo:</label>
                <p className="body">{studentDetails.Regno}</p>
              </div>
              <div className="record">
                <label className="head">Name:</label>
                <p className="body">{studentDetails.Name}</p>
              </div>
              <div className="record">
                <label className="head">D-O-B:</label>
                <p className="body">{studentDetails.StudentDOB}</p>
              </div>
              <div className="record">
                <label className="head">Father_Name:</label>
                <p className="body">{studentDetails.Father_name}</p>
              </div>
              <div className="record">
                <label className="head">Mother_Name:</label>
                <p className="body">{studentDetails.Mother_name}</p>
              </div>
              <div className="record">
                <label className="head">Address:</label>
                <p className="body">{studentDetails.Address}</p>
              </div>
              <div className="record">
                <label className="head">Class: </label>
                <p className="body">{studentDetails.SClassID}</p>
              </div>
              <div className="action-buttons">
                <Link
                  className="edit-button"
                  to={`/adminhomepage/${IId}/updatestudent/${studentDetails.Regno}`}
                >
                  <BiSolidEditAlt />
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteConfirmation(studentDetails)}
                >
                  <FaTrashCan />
                </button>
              </div>
              <Link
                to={`/adminhomepage/${IId}/attendacedetails/${studentDetails.Regno}`}
                className='attendance-details'
              >
                Attendance Details
              </Link>
              <br/>
              <Link
                to={`/adminhomepage/${IId}/mark/${studentDetails.Regno}`}
                className='attendance-details'
              >
                Mark Details
              </Link>
            </div>
          ))}
        </div>
      </div>
      <p className="Null-details">{nulldata}</p>
    </div>
  );
}

export default StudentDetails;
