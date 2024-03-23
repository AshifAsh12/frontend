import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import { BiSolidEditAlt } from "react-icons/bi";
import DotLoader from "react-spinners/RiseLoader";

import { FaTrashCan } from "react-icons/fa6";
import "./Admin.css";

function AddExam() {
  const navigate = useNavigate();
  const { IId } = useParams();
  const errorvalues={ errorExamName:"",errorMaxMarks:"",errordate:""}
  // State variables to hold input values and error messages
  const [examName, setExamName] = useState('');
  const [maxMarks, setMaxMarks] = useState('');
  const [Date, setDate] = useState('');
 const[errordata,seterrordata]=useState('')

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/examdetail/${IId}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Server Not Responding');
      });
  }, [IId]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newerror={}
    setLoading(true)
    if (!examName.trim()) {
      newerror.errorExamName = '*This field is required*';
      setLoading(false)
    }
    if (!maxMarks) {
      newerror.errorMaxMarks = '*This field is required*';
      setLoading(false)
    }
    if (!Date) {
      newerror.errordate = '*This field is required*';
      setLoading(false)
    }


    seterrordata(newerror)
    if (Object.keys(newerror).length === 0) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/exam/${IId}`, {
        examname: examName,
        Maxmarks: maxMarks,
        examdate: Date
      })
      .then((response) => {
        if (response.data.message === 'Available') {
          alert("Already Added");
          setLoading(false)
        }
        if (response.data.message === 'inserted') {
          alert("Added Successfully");
          setLoading(false)
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("Server not found");
        setLoading(false)
      });
    }
  };

  const handleDelete = (ExamName) => {
    Axios.delete(`https://backend-sandy-six.vercel.app/api/deleteexam/${ExamName}`)
      .then((response) => {
        if (response.data.message === 'deleted') {
          alert("Exam deleted successfully");
          setLoading(false)
          window.location.reload()
   
         
        }
      })
      .catch((error) => {
        alert("Server not found");
      });
  };

  return (
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
        {loading ? <div className='load'><DotLoader color="#ffff"/></div>
        : <button type="submit" className='exam-submit'>Submit</button>
        }
       
      </form>

      </div>



      <div className='Table-container'>


      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Exam</th>
            <th>Max-Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {data.length > 0 ? (
  data.map((exam, index) => {
    // Split the exam name by the hyphen
    const examNameParts = exam.ExamName.split('-');
    // Take the part before the hyphen
    const displayedExamName = examNameParts[0];

    return (
      <tr key={index}>
        <td>{exam.ExamDate}</td>
        <td>{displayedExamName}</td>
        <td>{exam.Maxmarks}</td>
        <td>
          <button  className="delete-button" onClick={() => handleDelete(exam.ExamName)}><FaTrashCan /></button>
          <Link
                                                    className="edit-button"
                                                    to={`/adminhomepage/${IId}/updateexam/${exam.ExamName}`}
                                                >
                                                    <BiSolidEditAlt />

                                                </Link>
        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="4">No Data</td>
  </tr>
)}
</tbody>
      </table>


      </div>
    </div>
  );
}

export default AddExam;
