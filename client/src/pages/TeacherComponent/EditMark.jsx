import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams,useNavigate} from 'react-router-dom';
import DotLoader from "react-spinners/RiseLoader";

function EditMark() {

    const [mark, setMark] = useState('');
   
    const [errormark, seterrorMark] = useState('');
    const {examName} =useParams();
    const {TId}=useParams();
    const {SId}=useParams();
    const {subject}=useParams();
    //const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
   
    
    
  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/editmark/${SId}/${subject}/${examName}`)
      .then(result => {
        console.log(result.data)
        setMark(result.data[0].Mark);
      
      })
      .catch(error => {
        console.error(error);
      });
  }, [SId]);





    const handleAbsentClick = () => {
        setMark('-1');
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!mark) {
            seterrorMark("*This field is required*")
          
        }
        else{
          Axios.post(`https://backend-sandy-six.vercel.app/api/markvalid/${TId}`, {
            examname: examName,
          })
            .then((response) => {
              if (mark < -1 || mark > response.data[0].Maxmarks) {
                seterrorMark(`Invalid mark for ${examName}. Maximum marks is ${response.data[0].Maxmarks}`);
                setLoading(false)
              } else {
                Axios.put(`https://backend-sandy-six.vercel.app/api/updatemark/${SId}`, {
                  examname: examName,
                  subjectname: subject,
                  exammark: mark
                })
                  .then((response) => {
                    if (response.data.message === 'updated') {
                      alert("updated successfully ");
                      setLoading(false)
                     

                      
                    }
                    else{
                      alert("something went wrong ");
                    }
                   
                  })
                  .catch((error) => {
                    alert("Error");
                  });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
  return (
    <div>

        <div className='Wrapper'>
        
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {mark !== '-1' && ( // Conditionally render the input field if mark is not -1
              <>

                <input
                  type="number"
                  id="maxMarks"
                  placeholder='mark'
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                />
              </>
            )}
            <button type="button" onClick={handleAbsentClick}>
              {mark === '-1' ? 'Student Absent' : 'Absent'}
            </button>
            <p>{errormark}</p>
          </div>


        {loading ?  <div className='load'><DotLoader color="#ffff"/></div>
         :<button type="submit" className='exam-submit'>Update</button> }
         
          </form>
          </div>

          </div>
    </div>
  )
}

export default EditMark