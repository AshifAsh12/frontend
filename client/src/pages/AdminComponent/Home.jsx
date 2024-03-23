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
import ToggleSwitch from './ToggleSwitch'




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
        
      });
  }, [IId]);

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalstudent2/${IId}`)
      .then(result => {


        setSata(result.data[0]);


      })
      .catch(error => {
        console.error(error);
      
      });
  }, [IId]);


  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/userdata/${IId}`)
      .then(result => {
        setData(result.data[0]);
      })
      .catch(error => {
        console.error(error);
      
      });
  }, [IId]);


  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/totalteacher/${IId}`)
      .then(result2 => {
        setTData(result2.data[0]);
       


      })
      .catch(error2 => {
        console.error(error2);
       
      });
  }, [IId]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

function holiday(){
  localStorage.setItem("holiday", true)
}

  return (
    <div  className='flexbox'>

<div className='holiday'>
      <label> Holiday?</label>&nbsp;
<ToggleSwitch name="holiday" />
</div>

<div className='markeallow'>
<label>Allow Edit Mark ?</label>&nbsp;
      <ToggleSwitch name="editbutton" />

      </div>


  

        <div className='homeContainer'>



          <div className='graph-box'>
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
        <Bar dataKey="Total" fill="#d82a4e" barSize={20} />
        {/* Add more bars if needed with different colors */}
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

            <Link to={`/adminhomepage/${IId}/studentdetails`} className='link'>Student Detail</Link>


          </div>

          <div className='graph-box'>
            <h3>Attendence</h3>

            <BarChart
  width={400}
  height={180}
  data={Tpdata}
  margin={{
    top: 10,
    right: 30, 
    bottom: 20
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="AClassID" label={{ value: 'Class', position: 'insideBottom', offset: -1, fontWeight: 'bold' }} />
  <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft', fontWeight: 'bold' }} />
  <Tooltip />
  <Legend />
  <Bar dataKey="present" fill="#ffff" name="Present" barSize={20} />
  <Bar dataKey="absent" fill="#d82a4e" name="Absent" barSize={20} />
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

            <Link to={`/adminhomepage/${IId}/teacherdetails`} className='link' >Teacher Detail</Link>


          </div>

        </div>

        
   



    </div>
  )
}

export default Home