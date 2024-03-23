import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import { BiSolidEditAlt } from "react-icons/bi";
import DotLoader from "react-spinners/RiseLoader";

import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../AdminComponent/PdfDocument';

function AddMarks() {
  const { TId, SId } = useParams();

  const errorvalues = { errorexam: "", errormark: "", errorsubject: "" }
  const [exam, setExam] = useState('');
  const [mark, setMark] = useState('');
  const [subject, setSubject] = useState('');
  const [errordata, setErrordata] = useState(errorvalues);

  const [data, setData] = useState([]);
  const [sdata, setsData] = useState({});
  const [detail, setDetail] = useState([]);
  const [examdata, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorexam,setErrorexam]=useState("")




  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teachersubjectdetails/${TId}`)
      .then(result => {
        setData(result.data);

        if (!result.data.length) {
          setErrorexam("No data found");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [TId]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacherexamdetails/${TId}`)
      .then(result => {
        setExamData(result.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, [TId]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/detailmark/${SId}`)
      .then(result => {
        setDetail(result.data);
        console.log(result.data)

      })
      .catch(error => {
        console.error(error);
      });
    Axios.get(`https://backend-sandy-six.vercel.app/api/institutename/${SId}`)
      .then(result => {
        setsData(result.data[0])
        console.log(result.data)
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



    const newerror = {}

    if (!exam) {
      newerror.errorexam = "This field is required"
    }

    if (!mark) {
      newerror.errormark = "This field is required"
    }

    if (!subject) {
      newerror.errorsubject = "This field is required"
    }

    setLoading(true); // Set loading state to true when the form is submitted


    setErrordata(newerror)
    if (Object.keys(newerror).length === 0) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/markvalid/${TId}`, {
        examname: exam,
      })
        .then((response) => {
          if (mark < -1 || mark > response.data[0].Maxmarks) {
            setErrordata({
              ...errordata,
              errormark: `Invalid mark for ${exam}. Maximum marks is ${response.data[0].Maxmarks}`
            });

          } else {
            Axios.post(`https://backend-sandy-six.vercel.app/api/addmark/${SId}`, {
              examname: exam,
              subjectname: subject,
              exammark: mark
            })
              .then((response) => {
                if (response.data.message === 'Available') {
                  alert("Already added");
                  setLoading(false)
                }
                if (response.data.message === 'Added') {
                  alert("Added Successfully");
                  setLoading(false)
                  window.location.reload();
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
    else {
      setLoading(false)
    }
  };

  const calculatePercentage = (examName) => {
    let totalMarks = 0;
    let totalMaxMarks = 0;
    let totalSubjects = 0;

    // Iterate through the detail data to calculate total marks and maximum marks
    detail.forEach(item => {
      if (item.ExamName.split('-')[0] === examName) {
        const mark = subjects[item.Subjectname][examName];
        if (mark !== -1) {
          totalMarks += mark || 0;
          totalSubjects++;
        }
        // Consider -1 marks as well in the total maximum marks
        totalMaxMarks += item.Maxmarks;
        console.log(totalMaxMarks)
      }
    });

    // Calculate the percentage only if totalMaxMarks is greater than 0 to avoid division by zero
    if (totalMaxMarks > 0) {
      const percentage = (totalMarks / totalMaxMarks) * 100;
      return percentage.toFixed(2);
    } else {
      return "N/A";
    }
  };

  const examNames = [...new Set(detail.map(item => {
    if (item.ExamName) {
      return item.ExamName.split('-')[0];
    }
    return "No data present";
  }))];

  const subjects = {};
  detail.forEach(record => {
    if (!subjects[record.Subjectname]) {
      subjects[record.Subjectname] = {};
    }
    const exam = record.ExamName ? record.ExamName.split('-')[0] : "No data present";
    subjects[record.Subjectname][exam] = record.Mark || null;
  });

  return (
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
            <p>{errordata.errormark}</p>
          </div>
          <div className='Select-box'>
            <select name="teachername" onChange={(e) => setExam(e.target.value)}>
              <option>Select Exam</option>
              {examdata.map(getdata => (
                <option value={getdata.ExamName} key={getdata.ExamName}>{getdata.ExamName}</option>
              ))}
            </select>
            <p>{errordata.errorexam}</p>
          </div>
          <div className="form-group">
            <div className='Select-box'>
              <select name="teachername" id="teachername" className='teacherselect' onChange={(e) => setSubject(e.target.value)}>
                <option>Select Subject</option>
                {data.map(getdata => (
                  <option value={getdata.SubjectName} key={getdata.SubjectName}>{getdata.SubjectName}</option>
                ))}
              </select>
              <p>{errordata.errorsubject}</p>
            </div>
          </div>
          {loading ? <div className='load'><DotLoader color="#ffff" /></div> :
            <button type="submit" className='exam-submit'>Submit</button>}

        </form>
      </div>



      <div className='Table-container'>


        {detail && detail.length > 0 ? (

          <>

            <div>

              <h4> {sdata.Institute_Name}</h4>
              <h5>{sdata.Institute_Address}</h5>





              <p>Regno : {sdata.Regno} </p>
              <p>Name : {sdata.Name}</p>
              <p>Class : {sdata.Class_Name} </p>

              <h5>  Progress Report </h5>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  {examNames.map((examName, index) => (
                    <th key={index}>{examName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(subjects).map(([subject, marks], subjectIndex) => {
                  return (
                    <tr key={subjectIndex}>
                      <td>{subject.split('-')[0]}</td>
                      {examNames.map((examName, examIndex) => {
                        const markValue = marks[examName];
                        const maxMarkObj = detail.find(item => {
                          const [examType] = item.ExamName.split('-');
                          return item.Subjectname === subject && examType === examName;
                        });
                        const maxMarks = maxMarkObj ? maxMarkObj.Maxmarks : 0;
                        const threshold = maxMarks * 0.35;
                        const isBelowThreshold = markValue !== -1 && markValue < threshold;
                        const isAbsent = markValue === -1;
                        // Inside the JSX where the edit button is rendered
                        const allowEdit = localStorage.getItem("editbutton") === "true"; // Check the value of the edit button in localStorage

                        // Conditionally render the edit button based on the value retrieved from localStorage
                        const editLink = allowEdit && !isAbsent && markValue > -1 ? (
                          <Link to={`/teacherhomepage/${TId}/edit/${TId}/${SId}/${encodeURIComponent(subject)}/${encodeURIComponent(maxMarkObj ? maxMarkObj.ExamName : '')}`}>
                            <BiSolidEditAlt />
                          </Link>
                        ) : null;


                        // Display markValue if it's not null and not -1, else display 'NE'
                        const displayMark = markValue !== null && markValue !== -1 ? markValue : 'NE';

                        // Display only if there's a markValue
                        const renderMark = markValue !== null ? displayMark : '0';

                        return (
                          <td key={examIndex} className={isBelowThreshold || isAbsent ? 'red-text' : ''}>
                            {isAbsent ? 'Absent' : renderMark} {editLink}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}






                <tr>
                  <td>Total</td>
                  {examNames.map((examName, index) => (
                    <td key={index}>
                      {Object.values(subjects).reduce((total, marks) => {
                        const markValue = marks[examName];
                        return markValue !== -1 ? total + (markValue || 0) : total;
                      }, 0)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Percentage</td>
                  {examNames.map((examName, index) => (
                    <td key={index}>
                      {calculatePercentage(examName)}%
                    </td>
                  ))}
                </tr>

                <tr>
                  <td>Result</td>
                  {examNames.map((examName, index) => {
                    const percentage = parseFloat(calculatePercentage(examName));
                    let result = '';
                    if (!isNaN(percentage)) {
                      if (percentage < 35) {
                        result = 'Fail';
                      } else if (percentage >= 35 && percentage < 50) {
                        result = 'Pass';
                      } else if (percentage >= 50 && percentage < 70) {
                        result = 'First Class';
                      } else if (percentage >= 70 && percentage <= 100) {
                        result = 'Distinction';
                      }
                    } else {
                      result = 'N/A';
                    }


                    // Check if any column in the row is marked as red-text
                    const isAnyRedText = detail.some(item => {
                      const [examType] = item.ExamName.split('-');
                      const percentage = (item.Mark / item.Maxmarks) * 100;
                      console.log(examName + " ppp" + percentage)

                      return item.Mark == -1 && examName == examType || percentage < 35 && examName == examType;
                    });


                    // If any column is marked red-text, set the result to "Fail"
                    if (isAnyRedText) {
                      result = 'Fail';
                    }

                    return <td key={index} className={result === 'Fail' ? 'red-text' : ''}>{result}</td>;
                  })}
                </tr>
              </tbody>



            </table>


            <PDFDownloadLink document={<PdfDocument data={subjects} examNames={examNames} />} fileName="marks.pdf" className='pdf'>
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Export to PDF'
              }
            </PDFDownloadLink>


          </>) : (
          <div>No data available.</div>
        )}
      </div>
    </div>
  );
}

export default AddMarks;
