import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "./Admin.css";
import { FaUserAlt } from "react-icons/fa";

function UpdateStudent() {
  const { IId } = useParams();
  const { SId } = useParams();
  const navigate = useNavigate();
  
  const inputValues = { Regno: '', name: '', Dob: '', Fname: '', Mname: '', Address: '', classname: '' };
  const [formData, setFormData] = useState(inputValues);
  
  const errorValues = { Regno: '', name: '', Dob: '', Fname: '', Mname: '', Address: '', classname: '' };
  const [errorData, setErrorData] = useState(errorValues);
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/updatestudentdetails/${SId}/`)
      .then(result => {
        setFormData({
          Regno: result.data[0].Regno,
          name: result.data[0].Name,
          Dob: result.data[0].StudentDOB,
          Fname: result.data[0].Father_name,
          Mname: result.data[0].Mother_name,
          Address: result.data[0].Address,
          classname: result.data[0].SClassID
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [SId]);
  
  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/classdetails/${IId}`)
      .then(result => {
        setData(result.data);
        if (result.data.length === 0) {
          setErrorData(prevErrorData => ({
            ...prevErrorData,
            classname: '*Enter the class First*'
          }));
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [IId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
  
    if (!formData.Regno) {
      newError.Regno = '* Register-No is Required*';
    }
    if (!formData.name) {
      newError.name = '*Name is Required*';
    }
    if (!formData.Dob) {
      newError.Dob = '*D-O-B is Required*';
    }
    if (!formData.Fname) {
      newError.Fname = '*Father-Name is Required*';
    }
    if (!formData.Mname) {
      newError.Mname = '*Mother-Name is Required*';
    }
    if (!formData.Address) {
      newError.Address = '*Address is Required*';
    }
    if (!formData.classname) {
      newError.classname = '* Select the class*';
    }
  
    setErrorData(newError);
  
    if (Object.keys(newError).length === 0) {
      Axios.put(`https://backend-sandy-six.vercel.app/api/updatestudent/${SId}`, {
        Regno: formData.Regno,
        Name: formData.name,
        Dob: formData.Dob,
        Fname: formData.Fname,
        Mname: formData.Mname,
        Address: formData.Address,
        classname: formData.classname
      })
        .then((response) => {
          if (response.data.message === 'updated') {
            alert('Student Added Successfully');
            navigate(`/adminhomepage/${IId}/studentdetails`);
          } else if (response.data.message === 'failed') {
            alert('StudentID Already Exist');
          }
        })
        .catch((error) => {
          alert('Something Went Wrong');
        });
    }
  };
  
  return (
    <div>
      <div className='Details'>
        <div className='Add-box'>
          <div className='Input-box'>
            <FaUserAlt className="detail-profile" />
            <form onSubmit={handleSubmit}>
              <h3>Update Student</h3>
              <input
                type="text"
                name="Regno"
                placeholder='Register-No'
                value={formData.Regno}
                onChange={handleInputChange}
              /><br></br>
              <p className='error'>{errorData.Regno}</p>
  
              <input
                type="text"
                name="name"
                placeholder='Student-Name'
                value={formData.name}
                onChange={handleInputChange}
              /><br></br>
              <p className='error'>{errorData.name}</p>
              
              <div className='Date'>
                <label>Date of Birth: </label>
                <input
                  type="date"
                  name="Dob"
                  className='date'
                  value={formData.Dob}
                  onChange={handleInputChange}
                /><br></br>
                <p className='error'>{errorData.Dob}</p>
              </div>
  
              <input
                type="text"
                name="Fname"
                placeholder='Father-Name'
                value={formData.Fname}
                onChange={handleInputChange}
              /><br></br>
              <p className='error'>{errorData.Fname}</p>
  
              <input
                type="text"
                name="Mname"
                placeholder='Mother-Name'
                value={formData.Mname}
                onChange={handleInputChange}
              /><br></br>
              <p className='error'>{errorData.Mname}</p>
  
              <input
                type="text"
                name="Address"
                placeholder='Address'
                value={formData.Address}
                onChange={handleInputChange}
              /><br></br>
              <p className='error'>{errorData.Address}</p>
  
              <div className='Select-box'>
                <select  
                  name="classname" 
                  id="classname"
                  className='classname'
                  onChange={handleInputChange}
                >
                  <option>Select Class</option>
                  {
                    data.map(getdata => {
                      return <option key={getdata.Class_ID} value={getdata.Class_ID}>{getdata.Class_Name}</option>
                    })
                  }
                </select>
              </div>
              <p className='error'>{errorData.classname}</p>
  
              <button type="submit" className='Add-Submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default UpdateStudent;
