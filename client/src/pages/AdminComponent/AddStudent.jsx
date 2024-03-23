import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DotLoader from "react-spinners/RiseLoader";
import "./Admin.css";
import { FaUserAlt } from "react-icons/fa";

function AddStudent() {
  const { IId } = useParams();
  const navigate = useNavigate();

  const inputvalues = { Regno: '', name: '', Dob: '', Fname: '', Mname: '', Address: '', classname: '' };
  const [formdata, setform] = useState(inputvalues);

  const errorvalues = { Regno: '', name: '', Dob: '', Fname: '', Mname: '', Address: '', classname: '' };
  const [errordata, seterror] = useState(errorvalues);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 



 

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/classdetails/${IId}`)
      .then(result => {
        setData(result.data);
        if (result.data.length === 0) {
          errordata.classname = '*Enter the class First*';
        }
      })
      .catch(error => {
        console.error(error);
      
      });
  }, [IId]);

  const InputChange = (e) => {
    const { name, value } = e.target;

    // For date input, extract the date part
    const formattedValue = e.target.type === 'date' ? value.split('T')[0] : value;

    setform({ ...formdata, [name]: formattedValue });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const newerror = {};

    if (!formdata.Regno) {
      newerror.Regno = '* Register-No is Required*';
    }
    if (!formdata.name) {
      newerror.name = '*Name is Required*';
    }
    if (!formdata.Dob) {
      newerror.Dob = '*D-O-B is Required*';
    }
    if (!formdata.Fname) {
      newerror.Fname = '*Father-Name is Required*';
    }
    if (!formdata.Mname) {
      newerror.Mname = '*Mother-Name is Required*';
    }
    if (!formdata.Address) {
      newerror.Address = '*Address is Required*';
    }
    if (!formdata.classname) {
      newerror.classname = '* Select the class*';
    }

    seterror(newerror);
    

    if (Object.keys(errordata).length === 0) {

      setLoading(true)
      Axios.post(`https://backend-sandy-six.vercel.app/api/addstudent/${IId}`, {
        Regno: formdata.Regno,
        Name: formdata.name,
        Dob: formdata.Dob,
        Fname: formdata.Fname,
        Mname: formdata.Mname,
        Address: formdata.Address,
        classname: formdata.classname
      })
        .then((response) => {
          if (response.data.message === 'Data inserted successfully2') {
           
            alert("Student Added Successfully ")
            setLoading(false)
            
            navigate(`/adminhomepage/${IId}/studentdetails`);
          } else {
            alert("Student Already Added")
            setLoading(false)
            
          }
        })
        .catch((error) => {
          alert("Server Not Found")
          setLoading(false)
        });
    }
  };

  return (
    <div>
      <div>
        <div className='Add-box'>
        
        <div className='Input-box'>
        <FaUserAlt  className="detail-profile" />
          <form onSubmit={HandleSubmit}>
          
            <h3>Add Student</h3>
            <input
              type="text"
              name="Regno"
              placeholder='Register-No'
              value={formdata.Regno}
              onChange={InputChange}
            /><br></br>
            <p className='error'>{errordata.Regno}</p>
  
            <input
              type="text"
              name="name"
              placeholder='Student-Name'
              value={formdata.name}
              onChange={InputChange}
            /><br></br>
            <p className='error'>{errordata.name}</p>
            <div className='Date'>
                <label>Date of Birth: </label>
            <input
              type="date"
              name="Dob"
              value={formdata.Dob}
              onChange={InputChange}
              className='date'
            /><br></br>
            <p className='error'>{errordata.Dob}</p>
          </div>
            <input
              type="text"
              name="Fname"
              placeholder='Father-Name'
              value={formdata.Fname}
              onChange={InputChange}
            /><br></br>
            <p className='error'>{errordata.Fname}</p>

            <input
              type="text"
              name="Mname"
              placeholder='Mother-Name'
              value={formdata.Mname}
              onChange={InputChange}
            /><br></br>
            <p className='error'>{errordata.Mname}</p>

            <input
              type="text"
              name="Address"
              placeholder='Address'
              value={formdata.Address}
              onChange={InputChange}
            /><br></br>
            <p className='error'>{errordata.Address}</p>
            <div className='Select-box'>
   
            <select  name="classname" 
            id="classname"
            className='classname'
            onChange={InputChange}
    >
      <option>Select Class</option>
      {
        data.map(getdata=>{
          return <option value={getdata.Class_ID}>{getdata.Class_Name}</option>
        })
      }
  
    </select>

    </div>
    <p className='error'>{errordata.classname}</p>

    {loading ?<div className='load'><DotLoader color="#ffff"/></div>
    :
    <button type="submit" className='Add-Submit'>Add</button> }
            
             
            
          </form>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default AddStudent;
