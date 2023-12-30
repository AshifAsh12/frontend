import React, { useEffect, useState } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import AdminHomeNav from './AdminComponent/AdminHomeNav';
import './AdminComponent/Admin.css'


function AdminHomePage() {
  const { IId } = useParams();
  const [data, setData] = useState(null);

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

  return (
    <div>
    <div className='wrapper2'>
    <div className='menu' >
        <AdminHomeNav />
      </div>
      
      
      <div className='outlet-box'>
    <Outlet />
  </div>

  
    </div>
   
  </div>

  );
}

export default AdminHomePage;
