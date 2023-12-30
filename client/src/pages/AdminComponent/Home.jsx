import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import CLOC2 from './Clock'
import './clock.css'


function Home() {


  const { IId } = useParams();
  const [Sdata, setSata] = useState(null);

  const [Tdata, setTData] = useState(null);
  const [data, setData] = useState(null);
  const [bardata, setbarData] = useState(null);
  const [value, setValue] = useState(new Date());
  const [Tpdata, setTpData] = useState(null);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalattendancegraph/${IId}`, {
      params: { date: formattedDate },
    })
      .then(result => {
      
       setTpData(result.data)
       
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [IId, formattedDate]);




  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalstudent/${IId}`)
      .then(result => {

        const formattedData = result.data.map(item => ({
          SClassID: item.SClassID, // Adjust this according to your actual data structure
          Total: item.total,
        }));
        setbarData(formattedData)
        setSata(result.data[0]);
        

      })
      .catch(error => {
        console.error(error);
        alert("Error");
      });
  }, [IId]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalstudent2/${IId}`)
      .then(result => {


        setSata(result.data[0]);


      })
      .catch(error => {
        console.error(error);
        alert("Error");
      });
  }, [IId]);


  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/userdata/${IId}`)
      .then(result => {
        setData(result.data[0]);
      })
      .catch(error => {
        console.error(error);
        alert("Error");
      });
  }, [IId]);


  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalteacher/${IId}`)
      .then(result2 => {
        setTData(result2.data[0]);
       


      })
      .catch(error2 => {
        console.error(error2);
        alert("Error");
      });
  }, [IId]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>

      <div className="Dash-heading">

        <p className='DashHeadname'>
          Dashboard
        </p>
        {data ? (
          <p className='Dashname'>
            Institute {data.Institute_Name} --------</p>


        ) : (
          <p>Loading data...</p>
        )}
        <CLOC2></CLOC2>

      </div>

      <div>

        <div className='homeContainer'>



          <div className='totalstudent'>
            <h3>Student</h3>

            <BarChart
              width={400}
              height={180}
              data={bardata}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="SClassID" label={{ value: 'Class', position: 'insideBottom', offset: -1, fontWeight: 'bold' }} />
              <YAxis label={{ value: 'Total Student', angle: -90, fontWeight: 'bold' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total" fill='#82ca9d' barSize={20} />

            </BarChart>

          </div>

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

            <Link to={`/adminhomepage/${IId}/studentdetails`} >Student Detail</Link>


          </div>

          <div className='totalstudent'>
            <h3>Attendence</h3>

            <BarChart
      width={400}
      height={180}
      data={Tpdata}
      margin={{
        top: 5,
        right: 10,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="AClassID" label={{ value: 'Class', position: 'insideBottom', offset: -1, fontWeight: 'bold' }} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft', fontWeight: 'bold' }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="present" fill="#82ca9d" name="Present" barSize={20} />
      <Bar dataKey="absent" fill="red" name="Absent" barSize={20} />
    </BarChart>
          </div>
          <div className='total'>

            <h3> Total Teacher</h3>
            <br></br>

            {Tdata ? (
              <div>

                <p className='Number'> {Tdata.total}</p>

              </div>
            ) : (
              <p>Loading data...</p>
            )}

            <Link to={`/adminhomepage/${IId}/teacherdetails`} >Teacher Detail</Link>


          </div>

        </div>

        
      </div>



    </div>
  )
}

export default Home