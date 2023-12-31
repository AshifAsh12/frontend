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
import { TiThMenu } from 'react-icons/ti';

function AdminHomeNav() {
  const { IId } = useParams();
  const [data, setData] = useState(null);
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/userdata/${IId}`)
      .then((result) => {
        setData(result.data[0]);
      })
      .catch((error) => {
        console.error(error);
        alert('Server Not Responding');
      });
  }, [IId]);

  const handleLogout = () => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/logout`)
      .then((result) => {
        if (result.data.status) {
          localStorage.removeItem('valid');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Server Not Responding');
      });
  };
  const handleLinkClick = () => {
    setMenuVisibility(false);
  };
  
  return (
    <div>
    <div className={`nav ${isMenuVisible ? 'menu-visible' : ''}`}>
      <div className="mobile-toggle" onClick={() => setMenuVisibility(!isMenuVisible)}>
        <span><TiThMenu /></span>
      </div>
      {isMenuVisible && data ? (
        <div className="navheading">
          <p className="institutename">
            {' '}
            <BsFillClipboard2Fill />
            &nbsp;&nbsp;&nbsp; {data.Institute_Name} <br />
            {data.Institute_Address}
          </p>
        </div>
      ) : null}

      {isMenuVisible && (
        <div className="navbutton">
          <Link to={`/adminhomepage/${IId}/`} className="navlink" onClick={handleLinkClick}>
            <AiOutlineDashboard /> Dashboard
          </Link>
          <Link to={`/adminhomepage/${IId}/studentdetails`} className="navlink" onClick={handleLinkClick}>
            <PiStudent /> &nbsp;Student
          </Link>
          <Link to={`/adminhomepage/${IId}/teacherdetails`} className="navlink" onClick={handleLinkClick}>
            <LiaChalkboardTeacherSolid />&nbsp;Teacher
          </Link>
          <Link to={`/adminhomepage/${IId}/classdetails`} className="navlink" onClick={handleLinkClick}>
            <SiGoogleclassroom /> &nbsp;Class
          </Link>
          <p className="navlink" onClick={() => { handleLogout(); handleLinkClick(); }}>
            <TbLogout2 /> &nbsp;Logout
          </p>
        </div>
      )}
    </div>
  </div>
  );
}
export default AdminHomeNav;