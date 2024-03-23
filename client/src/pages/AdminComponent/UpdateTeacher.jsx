import React, { useState ,useEffect} from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import Axios from 'axios';
import "./Admin.css"
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import DotLoader from "react-spinners/RiseLoader";

function UpdateTeacher() {
  const navigate = useNavigate();
  const { IId } = useParams();
  const { TId } = useParams();
  
  const inputvalues = { Regno: '', name: '',Dob:'',Address:'',password:'' };
  const [formdata, setform] = useState(inputvalues);

  const errorvalues = { Regno: '', name: '',Dob:'',Address:'',password:'' };
  const [errordata, seterror] = useState(errorvalues);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/updateteacherdetails/${TId}/`)
      .then(result => {
        setform(prevFormdata => ({
          ...prevFormdata,
          Regno: result.data[0].TeacherID,
          name: result.data[0].Name,
          Dob: result.data[0].TD_o_b,
          email: result.data[0].Email,
          Address: result.data[0].Address,
          password: result.data[0].Password
        }));
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [TId]);

  const InputChange = (e) => {
    const { name, value } = e.target;
    setform({ ...formdata, [name]: value });
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
    if (!formdata.Address) {
      newerror.Address = '*Address is Required*';
    }

    if(!formdata.password) {
      newerror.password = "*Password is required*";
    } else if(formdata.password.length < 8) {
      newerror.password = "*Password should contain 8 characters*";
    }

    seterror(newerror);

    if (Object.keys(newerror).length === 0) {
      Axios.put(`https://backend-sandy-six.vercel.app/api/updateteacher/${TId}`, {
        Regno: formdata.Regno,
        Name: formdata.name,
        Dob: formdata.Dob,
        email: formdata.email,
        Address: formdata.Address,
        password: formdata.password      
      })
      .then((response) => {
        if (response.data.message === 'updated') {
          alert('Teacher updated Successfully');
          navigate(`/adminhomepage/${IId}/teacherdetails`);
        } else if(response.data.message === 'failed') {
          alert('Teacher ID Already Exists');
        }
      })
      .catch((error) => {
        console.log(error)
        alert('Something Went Wrong');
      });
    }
  };

  return (
    <div>
      <div className='Details'>
        <div className='Add-box'>
          <div className='Input-box'>
            <LiaChalkboardTeacherSolid className="detail-profile"/>
            <form onSubmit={HandleSubmit}>
              <h3>Update Teacher</h3>
              <input
                type="text"
                name="Regno"
                placeholder='Teacher-ID'
                value={formdata.Regno}
                onChange={InputChange}
              /><br></br>
              <p className='error'>{errordata.Regno}</p>

              <input
                type="text"
                name="name"
                placeholder='Teacher-Name'
                value={formdata.name}
                onChange={InputChange}
              /><br></br>
              <p className='error'>{errordata.name}</p>
              
              <div className='Date'>
                <label>Date of Birth: </label>
                <input
                  type="date"
                  name="Dob"
                  className='date'
                  value={formdata.Dob}
                  onChange={InputChange}
                /><br></br>
                <p className='error'>{errordata.Dob}</p>
              </div>

              <input
                type="text"
                name="Address"
                placeholder='Address'
                value={formdata.Address}
                onChange={InputChange}
              /><br></br>
              <p className='error'>{errordata.Address}</p>

              <input 
                type="password"
                name="password"
                placeholder='Password'
                value={formdata.password}
                onChange={InputChange}
              /><br></br>
              <p className='error'>{errordata.password}</p>
             
              <button type="submit" className='Add-Submit'>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTeacher;
