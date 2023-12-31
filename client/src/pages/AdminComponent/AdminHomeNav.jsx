import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Admin.css';
import { AiOutlineDashboard } from 'react-icons/ai';
import { PiStudent } from 'react-icons/pi';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { SiGoogleclassroom } from 'react-icons/si';
import { TbLogout2 } from 'react-icons/tb';
import { BsFillClipboard2Fill } from 'react-icons/bs';

function AdminHomeNav() {
  const { IId } = useParams();
  const [data, setData] = useState(null);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const navigate = useNavigate();
  Axios.defaults.withCredentials=true

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/userdata/${IId}`)
      .then((result) => {
        setData(result.data[0]);
      })
      .catch((error) => {
        console.error(error);
        
      });
  }, [IId]);

  const handleToggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const handleMenuLinkClick = () => {
    setMenuVisibility(false);
  };

  const handleLogout = () => {

    Axios.get(`https://backend-sandy-six.vercel.app/api/logout`)
      .then((result) => {
        if(result.data.status){
          localStorage.removeItem("valid")
          navigate('/');
        }
        
      })
      .catch((error) => {
        console.error(error);
        
      });
    

    
  };

  return (
    <div>
      <div className={`nav ${isMenuVisible ? 'menu-visible' : ''}`}>
        {data ? (
          <div className="navheading">
            <p className="institutename">
              {' '}
              <BsFillClipboard2Fill />
              &nbsp;&nbsp;&nbsp; {data.Institute_Name} <br />
              {data.Institute_Address}
            </p>
          </div>
        ) : (
          <div className="navheading">
          <p>Loading data...</p>
          </div>
        )}

        <div className="navbutton">
          <Link
            to={`/adminhomepage/${IId}/`}
            className="navlink"
            onClick={handleMenuLinkClick}
          >
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<AiOutlineDashboard /> &nbsp;Dashboard
          </Link>
          <Link
            to={`/adminhomepage/${IId}/studentdetails`}
            className="navlink"
            onClick={handleMenuLinkClick}
          >
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<PiStudent /> &nbsp;Student
          </Link>
          <Link
            to={`/adminhomepage/${IId}/teacherdetails`}
            className="navlink"
            onClick={handleMenuLinkClick}
          >
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<LiaChalkboardTeacherSolid />&nbsp;Teacher
          </Link>
          <Link
            to={`/adminhomepage/${IId}/classdetails`}
            className="navlink"
            onClick={handleMenuLinkClick}
          >
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<SiGoogleclassroom /> &nbsp;Class
          </Link>
          <p className="navlink" onClick={handleLogout}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<TbLogout2 /> &nbsp;Logout
          </p>
        </div>
      </div>

      {/* Three-dot button for mobile toggle */}
      <div className="mobile-toggle" onClick={handleToggleMenu}>
        <span>&#8226;&#8226;&#8226;</span>
      </div>
    </div>
  );
}

export default AdminHomeNav;
