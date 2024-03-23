import React, { useEffect, useState } from 'react';
import { useParams,Link} from 'react-router-dom';
import Axios from 'axios';

import '../AdminComponent/Admin.css';
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";


function TeacherStudents() {
  const { TId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [nulldata, setNullData] = useState('');
 

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacherstudentdetail/${TId}`)
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
  }, [TId]);

  useEffect(() => {
    // Update filteredData whenever data changes
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = data.filter((studentDetails) =>
      studentDetails.Regno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  

  

  
  return (
    <div>
     
       
        
        <div className="search-container">
          <form>
          <input
            type="text"
            placeholder="Register-No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button onClick={handleSearch}
                  className='Search-Button'><FaSearch /></button>

</form>
        </div>
     
      <div className="Details">
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

            <Link
   className='attendance-details'
    to={`/teacherhomepage/${TId}/marks/${studentDetails.Regno}`}
  >
    Mark
    
  </Link>
           
            </div>
          ))}
        </div>
      </div>
      <p className="Null-details">{nulldata}</p>

    </div>
  );
}

export default TeacherStudents