import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";

function ClassDetails() {
  const { IId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [nulldata, setNullData] = useState('');

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/classdetails/${IId}`)
      .then((result) => {
        setData(result.data);
        if (result.data.length === 0) {
          setNullData('Class Not Present. Add Class.');
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
    const filtered = data.filter((classDetails) =>
      classDetails.Class_ID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openDeleteConfirmation = (classDetails) => {
    setSelectedClass(classDetails);
    const confirmation = window.confirm(`Are you sure you want to delete ${classDetails.Class_Name}?`);
    if (confirmation) {
      handleDeleteYes();
    }
  };

  const handleDeleteYes = () => {
    if (selectedClass) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/deleteclass/${IId}`, {
        ClassID: selectedClass.Class_ID,
      })
        .then((response) => {
          if (response.data.message === 'Not found') {
            alert('Class Not Found In this Institute');
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
      <Link to={`/adminhomepage/${IId}/addclass`} className="addbutton">
        + Class
      </Link>
      <div className="search-container">
        <form>
          <input
            type="text"
            placeholder="Class-ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button onClick={handleSearch} className='Search-Button'>
            <FaSearch />
          </button>
        </form>
      </div>
      <div>
        <div className="Detail-box">
          {filteredData.map((classDetails, index) => (
            <div key={index} className="student-card">
              <SiGoogleclassroom className="detail-profile" />
              <div className="record">
                <label className="head">ClassID</label>
                <p className="body">{classDetails.Class_ID}</p>
              </div>
              <div className="record">
                <label className="head">ClassName</label>
                <p className="body">{classDetails.Class_Name}</p>
              </div>
              <div className="record">
                <label className="head">TeacherId:</label>
                <p className="body">{classDetails.Class_TeacherID}</p>
              </div>
              <div className="action-buttons">
                <Link
                  className="edit-button"
                  to={`/adminhomepage/${IId}/updateclass/${classDetails.Class_ID}`}
                >
                  <BiSolidEditAlt />
                </Link>
                <button
                  className="delete-button"
                  onClick={() => openDeleteConfirmation(classDetails)}
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="Null-details">{nulldata}</p>
    </div>
  );
}

export default ClassDetails;
