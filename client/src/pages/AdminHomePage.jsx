import React  from 'react';
import { Outlet} from 'react-router-dom';

import AdminHomeNav from './AdminComponent/AdminHomeNav';
import './AdminComponent/Admin.css'


function AdminHomePage() {
  

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
