import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import './Admin.css';
import { FaSearch } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

function TeacherDetail() {
  const { IId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nulldata, setNullData] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacherdetail/${IId}`)
      .then(result => {
        setData(result.data);
        if (result.data.length === 0) {
          setNullData('Teacher Not Present. Add Teacher.');
        } else {
          setNullData('');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [IId]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = data.filter((teacherDetails) =>
      teacherDetails.TeacherID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDeleteConfirmation = (teacher) => {
    setSelectedTeacher(teacher);
    const confirmation = window.confirm(`Are you sure you want to delete ${teacher.Name}?`);
    if (confirmation) {
      handleDeleteYes();
    }
  };

  const handleDeleteYes = () => {
    if (selectedTeacher) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/deleteteacher/${IId}`, {
        TeacherID: selectedTeacher.TeacherID,
      })
        .then((response) => {
          if (response.data.message === 'Not found') {
            alert('Teacher Not Found In this Institute');
          } else if (response.data.message === 'found') {
            alert('Deleted Successfully');
            window.location.reload();
          } else if (response.data.error === 'Data deletion failed') {
            alert('Teacher is working in class. Please update teacher in class');
          }
        })
        .catch(() => {
          alert('Server error');
        });
    }
  };

  return (
    <div>
      <div>
        <Link to={`/adminhomepage/${IId}/addteacher`} className="addbutton">
          <IoMdPersonAdd /> Add
        </Link>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Teacher-ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='Search-Input'
            />
            <button className='Search-Button'>
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className='Detail-box'>
          {filteredData.map((teacherDetails, index) => (
            <div key={index} className="student-card">
              <LiaChalkboardTeacherSolid  className="detail-profile"/>
              <div className="record">
                <label className="head">TeacherID : </label>
                <p className="body">{teacherDetails.TeacherID}</p>
              </div>
              <div className="record">
                <label className="head">Name :</label>
                <p className="body">{teacherDetails.Name}</p>
              </div>
              <div className="record">
                <label className="head">D-O-B :</label>
                <p className="body">{teacherDetails.TD_o_b}</p>
              </div>
              <div className="record">
                <label className="head">Address :</label>
                <p className="body">{teacherDetails.Address}</p>
              </div>
              <div className="record">
                <label className="head">Password : </label>
                <p className="body">{teacherDetails.Password}</p>
              </div>
              <div className="action-buttons">
                <Link
                  className="edit-button"
                  to={`/adminhomepage/${IId}/updateteacher/${teacherDetails.TeacherID}`}
                >
                  <BiSolidEditAlt />
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteConfirmation(teacherDetails)}
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className='Null-details'>{nulldata}</p>
    </div>
  );
}

export default TeacherDetail;
