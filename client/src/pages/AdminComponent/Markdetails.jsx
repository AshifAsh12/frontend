import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../AdminComponent/PdfDocument';

function Markdetails() {

    const {SId} =useParams()
    const [sdata, setsData] = useState({});
    const [detail, setDetail] = useState([]);

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

                       

                        // Display markValue if it's not null and not -1, else display 'NE'
                        const displayMark = markValue !== null && markValue !== -1 ? markValue : 'NE';

                        // Display only if there's a markValue
                        const renderMark = markValue !== null ? displayMark : '0';

                        return (
                          <td key={examIndex} className={isBelowThreshold || isAbsent ? 'red-text' : ''}>
                            {isAbsent ? 'Absent' : renderMark} 
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
  )
}

export default Markdetails