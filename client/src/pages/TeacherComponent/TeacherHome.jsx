import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';

import CLOC2 from '../AdminComponent/Clock'
import '../AdminComponent/clock.css'

function TeacherHome() {


  const { TId } = useParams();
  const [Sdata, setSata] = useState(null);

  const [Tpdata, setTpData] = useState(null);
  const [Tadata, setTaData] = useState(null);
  const [data, setData] = useState(null);
 
 

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalpresent/${TId}`, {
      params: { date: formattedDate },
    })
      .then(result => {
      
       setTpData(result.data[0])
      })
      .catch(error => {
        console.error(error);
     
      });
  }, [TId, formattedDate]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalabsent/${TId}`, {
      params: { date: formattedDate },
    })
      .then(result => {
      
       setTaData(result.data[0])
      })
      .catch(error => {
        console.error(error);
        
      });
  }, [TId, formattedDate]);


  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teachertotalstudent2/${TId}`)
      .then(result => {


        setSata(result.data[0]);


      })
      .catch(error => {
        console.error(error);
        
      });
  }, [TId]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/teacheruserdata/${TId}`)
      .then(result => {
        setData(result.data[0]);

      })
      .catch(error => {
        console.error(error);
        
      });
  }, [TId]);







  return (
    <div>

      <div className="Dash-heading">

        <p className='DashHeadname'>
          Dashboard
        </p>
        {data ? (
          <p className='Dashname'>
            Class &nbsp; {data.Class_Name}  --------</p>


        ) : (
          <p>No data...</p>
        )}
        <CLOC2></CLOC2>

      </div>

      <div>

        <div className='TeacherhomeContainer'>




          <div className='total'>

            <h3> Total Student</h3>
            <br></br>

            {Sdata ? (
              <div>

                <p className='Number'> {Sdata.total}</p>

              </div>
            ) : (
              <p>Loading data...</p>
            )}

            <Link to={`/teacherhomepage/${TId}/teacherstudentdetails`} >Student Detail</Link>


          </div>


          <div className='total'>

            <h3> Total Present</h3>
            <br></br>

            {Tpdata ? (
              <div>

                <p className='Number'> {Tpdata.totalpresent}</p>

              </div>
            ) : (
              <p>Loading data...</p>
            )}

            


          </div>
          <div className='total'>

          <h3> Total Absent</h3>
          <br></br>

          {Tadata ? (
            <div>

              <p className='Number'>  {Tadata.totalabsent}</p>

            </div>
          ) : (
            <p>Loading data...</p>
          )}

          

        </div>

        </div>
        



      </div>



    </div>
  )
}

export default TeacherHome