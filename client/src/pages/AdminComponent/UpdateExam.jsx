import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DotLoader from "react-spinners/RiseLoader";
import "./Admin.css";

function UpdateExam() {


    const navigate = useNavigate();
    const { IId } = useParams();
    const { ExamName } = useParams();
    const errorvalues={ errorExamName:"",errorMaxMarks:"",errordate:""}
    // State variables to hold input values and error messages
    const [examName, setExamName] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [Date, setDate] = useState('');
   const[errordata,seterrordata]=useState(errorvalues)
   const [loading, setLoading] = useState(false); 


   useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/exam/${ExamName}`)
      .then(result => {
        console.log(result.data)
        const examNameParts = result.data[0].ExamName.split('-');
        // Take the part before the hyphen
        const displayedExamName = examNameParts[0];
       setExamName(displayedExamName);
       setMaxMarks(result.data[0].Maxmarks)
       setDate(result.data[0].ExamDate)


      })
      .catch(error => {
        console.error(error);
        
      });
  }, [ExamName]);


   const handleSubmit = async (e) => {
    e.preventDefault();
    const newerror={}

    if (!examName.trim()) {
      newerror.errorExamName = '*This field is required*';
    }
    if (!maxMarks) {
      newerror.errorMaxMarks = '*This field is required*';
    }
    if (!Date) {
      newerror.errordate = '*This field is required*';


    }
   


    seterrordata(newerror)
    setLoading(true)
    if (Object.keys(newerror).length === 0) {
      Axios.put(`https://backend-sandy-six.vercel.app/api/updateexam/${IId}/${ExamName}`, {
        examname: examName,
        Maxmarks: maxMarks,
        examdate: Date
      })
      .then((response) => {
        if (response.data.message === 'Available') {

          alert("Already exist");
          setLoading(false)
        }
        if (response.data.message === 'inserted') {
          alert("updaed Successfully");
          setLoading(false)
          navigate(`/adminhomepage/${IId}/exam` );
        }
      })
      .catch((error) => {
        alert("Server not found");
        setLoading(false)
      });
    }
  };





  return (
    <div>
         <div className='Wrapper'>
        <div className='form-container'>

     
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="examName">Exam Name:</label>
        <input
          type="text"
          id="examName"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
        <p>{errordata.errorExamName}</p>
      </div>

      <div className="form-group">
        <label htmlFor="maxMarks">Max  Marks :</label>
        <input
          type="number"
          id="maxMarks"
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
        />
        <p>{errordata.errorMaxMarks}</p>
      </div>

      <div className="form-group">
        <label htmlFor="maxMarks">Exam Date:</label>
        <input
          type="date"
          id="maxMarks"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
        />
        <p>{errordata.errordate}</p>
      </div>
{loading ?<div className='load'><DotLoader color="#ffff"/></div>
:

      <button type="submit" className='exam-submit'>Edit</button>}
    </form>

    </div>
    </div>

</div>
  )
}

export default UpdateExam