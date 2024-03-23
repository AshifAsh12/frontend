import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import DotLoader from "react-spinners/RiseLoader";

import "./Admin.css";
import { useParams, useNavigate } from 'react-router-dom';


function Updatesubject() {
    const [subjectName, setSubjectName] = useState('');
    const [errorSubjectName, setErrorSubjectName] = useState('');
    const { IId } = useParams();
    const { SubjectName } = useParams();
    const [data, setdata] = useState([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 


    useEffect(() => {
        Axios.get(`https://backend-sandy-six.vercel.app/api/subject/${SubjectName}`)
          .then(result => {

            const examNameParts = result.data[0].SubjectName.split('-');
            // Take the part before the hyphen
            const displayedExamName = examNameParts[0];
           setSubjectName(displayedExamName)
          })
          .catch(error => {
            console.error(error);
            
          });
      }, [SubjectName]);
   


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset error message
        setErrorSubjectName('');
        setLoading(true)
        if (!subjectName) {
            setErrorSubjectName("Subject Name is Required");
            setLoading(false)
        } else
         {
            Axios.put(`https://backend-sandy-six.vercel.app/api/updatesubject/${SubjectName}/${IId}`, {
                SubjectName: subjectName,
            })
                .then((response) => {
                    if (response.data.message === "available") {
                        alert("Subject Name Already Exist")
                        setLoading(false)
                    }
                    else
                        if (response.data.message === "Added") {
                            alert("Subject  updated Successfully");
                            setLoading(false)
                            navigate(`/adminhomepage/${IId}/subject` );

            
                        }
                        else {
                            alert("something went wrong")
                            setLoading(false)
                        }

                })
                .catch((error) => {
                    alert("error")
                    setLoading(false)
                });
        }
    };
  return (
    <div>
        <div  className='Wrapper'>

        <div className='form-container'>
           
        <form onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        value={subjectName}
                        onChange={(event) => setSubjectName(event.target.value)}
                        placeholder='Subject Name'
                    />
               
                {loading ?<div className='load'><DotLoader color="#ffff"/></div>
                :
                 <button type="submit"> Update</button>}
                <br />
                <p>{errorSubjectName}</p>
            </form>

            </div>

            </div>

           
    </div>
  )
}

export default Updatesubject