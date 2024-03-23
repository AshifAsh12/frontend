import React, { useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import Axios from 'axios';

import "./Admin.css"
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

function AddTeacher()
{
  const navigate = useNavigate();
    const { IId } = useParams();
  
const inputvalues = { Regno: '', name: '',Dob:'',Address:'',password:'' };
const [formdata, setform] = useState(inputvalues);

const errorvalues = { Regno: '', name: '',Dob:'',Address:'',password:'' };
const [errordata, seterror] = useState(errorvalues);

const [loginerror,setloginerror]=useState("")
const [loading, setLoading] = useState(false); 






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

  if(!formdata.password)
  {
    newerror.password="*Password is required*"
  }
  else if(formdata.password.length<8)
  {
    newerror.password="*Password should contain 8 character *"
  }


  seterror(newerror);

  


  if (Object.keys(newerror).length === 0) {
    Axios.post(`https://backend-sandy-six.vercel.app/api/addteacher/${IId}`, {
      Regno: formdata.Regno,
      Name: formdata.name,
      Dob: formdata.Dob,
      email:formdata.email,
      Address:formdata.Address,
      password:formdata.password      
    })
      .then((response) => {
        if (response.data.message === 'Data inserted successfully2') {
          alert("Teacher Added Successfully")
         
          navigate(`/adminhomepage/${IId}/teacherdetails`);
        } else {
          alert("Teacher Already Added")
         
        }
      })
      .catch((error) => {
        alert("Something went wrong")
      });
  }
};


return (
  <div>
    <div className='Details'>
      <div className='Add-box'>
      <div className='Input-box'>

      <LiaChalkboardTeacherSolid  className="detail-profile"/>
      <form onSubmit={HandleSubmit}>
      <p className='lerror'>{loginerror}</p>


        <h3>Add Teacher</h3>
        <div>
        <input
          type="text"
          name="Regno"
          placeholder='Teacher-ID'
          value={formdata.Regno}
          onChange={InputChange}
        />
        </div>
     
        <p className='error'>{errordata.Regno}</p>
        <div>
        <input
          type="text"
          name="name"
          placeholder='Teacher-Name'
          value={formdata.name}
          onChange={InputChange}
        />
        </div>

        <p className='error'>{errordata.name}</p>
        <div className='Date'>
                <label>D O B : </label>
        <input
          type="date"
          name="Dob"
          className='date'
          value={formdata.Dob}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Dob}</p>
        </div>
       
       
      <div>
      <input
          type="text"
          name="Address"
          placeholder='Address'
          value={formdata.Address}
          onChange={InputChange}
        />
      </div>
       
        <p className='error'>{errordata.Address}</p>

        <div>
        <input 
    type="password"
    name="password"
    placeholder='Password'
    value={formdata.password}
    onChange={InputChange}></input>
        </div>
     
     <p className='error'>{errordata.password}</p>
        <div className='Addbutton-box'>
        <button type="submit" className='Add-Submit'>Add</button>
        </div>
      </form>
      </div>
      </div>
    </div>

    
  </div>
)
}

export default AddTeacher