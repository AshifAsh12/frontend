import React, { useState ,useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import "./Admin.css"
import { SiGoogleclassroom } from "react-icons/si";

function UpdateClasss()  {
  const {IId} = useParams();
  const {CId} = useParams();
  const navigate = useNavigate();
  const inputValues = { classid:"", classname: '', teachername:'' };
  const [formData, setForm] = useState(inputValues);
  const errorValues = { classid:"", classname: '', teachername:'' };
  const [errorData, setError] = useState(errorValues);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/updateclassdetails/${CId}/`)
      .then(result => {
        setForm(prevFormdata => ({
          ...prevFormdata,
          classid: result.data[0].Class_ID,
          classname: result.data[0].Class_Name,
          teachername: result.data[0].StudentDOB,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }, [CId]);
  
  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacherdetail/${IId}`)
      .then(result => {
        setData(result.data);
        if(!result.data.length){
          setError(prevErrorData => ({
            ...prevErrorData,
            teachername: "Add Teacher First"
          }));
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [IId]);
  
  const InputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  };
  
  const HandleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
  
    if (!formData.classid) {
      newError.classid = '*Enter the Class-ID*';
    }
    if (formData.classid.length > 4) {
      newError.classid = '*ClassID Should Less Than 4*';
    }
    if (!formData.classname) {
      newError.classname = '*Enter the Class-Name*';
    }
    if (formData.classname.length > 10) {
      newError.classname = '*Only 10 character Valid*';
    }
    if(!formData.teachername){
      newError.teachername = '*Select the Teacher*';
    }
  
    setError(newError);
  
    if (Object.keys(newError).length === 0) {
      Axios.put(`https://backend-sandy-six.vercel.app/api/updateclass/${IId}/${CId}`, {
        ClassID: formData.classid,
        Classname: formData.classname,
        Teachername: formData.teachername,
      })
      .then((response) => {
        if (response.data.message === 'Data updated successfully') {
          alert('Class Updated Successfully');
          navigate(`/adminhomepage/${IId}/classdetails`);
        } 
        if (response.data.message === 'Data updated failed'){
          alert('ClassID Already Exist');
        }
      })
      .catch((error) => {
        console.log("error");
      });
    }
  };
  
  return (
    <div>
      <div className='Details'>
        <div className='Add-box'>
          <div className='Input-box'>
            <SiGoogleclassroom className="detail-profile"/>
            <form onSubmit={HandleSubmit}>
              <h3>Update Class</h3>
              <input
                type="text"
                name="classid"
                placeholder="Class-ID"
                value={formData.classid}
                onChange={InputChange}
              />
              <br />
              <p className="error">{errorData.classid}</p>
              <input
                type="text"
                name="classname"
                placeholder="Class-Name"
                value={formData.classname}
                onChange={InputChange}
              />
              <br />
              <p className="error">{errorData.classname}</p>
              <div className='Select-box'>
                <select  
                  name="teachername" 
                  id="teachername"
                  className='select-option'
                  onChange={InputChange}
                >
                  <option>Select Teacher</option>
                  {
                    data.map(getdata => {
                      return <option key={getdata.TeacherID} value={getdata.TeacherID}>{getdata.Name}</option>
                    })
                  }
                </select>
              </div>
              <p className="error">{errorData.teachername}</p>
              <button type="submit" className='Add-Submit'>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateClasss;
