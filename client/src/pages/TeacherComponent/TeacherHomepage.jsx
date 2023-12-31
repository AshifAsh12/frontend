import React from 'react';
import { Outlet } from 'react-router-dom';
import Axios from 'axios';



import TeacherHomenav from './TeacherHomenav';



function TeacherHomepage()  {
    
  
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