import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Axios from 'axios';



import TeacherHomenav from './TeacherHomenav';



function TeacherHomepage()  {
    const { TId } = useParams();
    const [data, setData] = useState(null);
  
    useEffect(() => {
      Axios.get(`https://backend-kappa-gray.vercel.app/api/userdata/${TId}`)
        .then(result => {
          setData(result.data[0]);
        })
        .catch(error => {
          console.error(error);
          alert("Error");
        });
    }, [TId]);
  
    return (
      <div>
      <div className='wrapper2'>
      <div className='menu' >
        <TeacherHomenav/>
        </div>
        
        
        <div className='outlet-box'>
      <Outlet />
    </div>
  
    
      </div>
     
    </div>
  
    );
  }
  

export default TeacherHomepage