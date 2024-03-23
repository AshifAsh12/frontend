import React from 'react'
import { useState, useEffect } from 'react';
import Axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import DotLoader from "react-spinners/RiseLoader";
import { SiGoogleclassroom } from "react-icons/si";


function AddClass() {
  const { IId } = useParams()
  const navigate = useNavigate();
  const inputValues = { classid: "", classname: '', teachername: '' };
  const [formData, setForm] = useState(inputValues);

  const errorValues = { classid: "", classname: '', teachername: '' };
  const [errorData, setError] = useState(errorValues);
  const [loading, setLoading] = useState(false); 



  const [data, setData] = useState([]);


  


  



  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacherdetail/${IId}`)
      .then(result => {
        setData(result.data);
        if (!result.data.length) {
          errorData.teachername = "Add Teacher First"
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

    setLoading(true)
    const newError = {};

    if (!formData.classid) {
      newError.classid = '*Enter the Class-ID*';
      setLoading(false)
    }
    if (formData.classid.length > 4) {
      newError.classid = '*ClassID Should Less Than 4*';
      setLoading(false)

    }
    if (!formData.classname) {
      newError.classname = '*Enter the Class-Name*';
      setLoading(false)

    }
    if (formData.classname.length > 10) {
      newError.classname = '*Only 10 Character Valid*';
      setLoading(false)

    }
    if (!formData.teachername) {
      newError.teachername = '*Select the Teacher*';
      setLoading(false)

    }

    setError(newError);
   

    if (Object.keys(newError).length === 0) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/addclass/${IId}`, {
        ClassID: formData.classid,
        Classname: formData.classname,
        Teachername: formData.teachername,




      })
        .then((response) => {
          if (response.data.message === 'Available') {
            alert("Class Alredy Added")
            setLoading(false)
            
          }
          else if (response.data.message === 'failed') {
            setLoading(false)
            alert('Teacher is Handling other class')
          

          } else if (response.data.message === 'Class added successfully') {
            setLoading(false)

            alert('Class Added Successfully')
           
            navigate(`/adminhomepage/${IId}/classdetails`);
          }
        })
        .catch((error) => {
          setError(false)
         alert("server not found")
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

              <h3>Add Class</h3>
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
                <select name="teachername"
                  id="teachername"
                  className='teacherselect'
                  onChange={InputChange}
                >
                  <option>Select Teacher</option>
                  {
                    data.map(getdata => {
                      return <option value={getdata.TeacherID}>{getdata.TeacherID}\{getdata.Name}</option>
                    })
                  }

                </select>
              </div>
              <p className="error">{errorData.teachername}</p>


              {loading ? <div className='load'><DotLoader color="#ffff"/></div>
                :<button type="submit" className='Add-Submit'>Add </button>}
          
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default AddClass