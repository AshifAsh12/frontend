import React, { useEffect, useState } from 'react';
import { useParams,} from 'react-router-dom';
import Axios from 'axios';

import '../AdminComponent/Admin.css';


function TeacherStudents() {
  const { TId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [nulldata, setNullData] = useState('');
 

  useEffect(() => {
    Axios.get(`https://backend-kappa-gray.vercel.app/api/teacherstudentdetail/${TId}`)
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
        alert('Error');
      });
  }, [TId]);

  useEffect(() => {
    // Update filteredData whenever data changes
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    // Filter data based on the search term
    const filtered = data.filter((studentDetails) =>
      studentDetails.Regno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  

  

  
  return (
    <div>
      <div className="Dash-heading">
        <p className="DashHeadname">Student</p>
       
        {/* Add search input and button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button onClick={handleSearch}
                  className='Search-Button'>Search</button>
        </div>
      </div>
      <div className="Details">
        <div className="Detail-box">
          {filteredData.map((studentDetails, index) => (
            <div key={index} className="student-card">
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
           
            </div>
          ))}
        </div>
      </div>
      <p className="Null-details">{nulldata}</p>

    </div>
  );
}

export default TeacherStudents