import React, { useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../AdminComponent/Admin.css';
import { FaBars, FaTimes } from "react-icons/fa";
import Loader from '../Loader/Loader';

function TeacherHomenav() {
  const { TId } = useParams();
  const navigate = useNavigate();
  const navref = useRef();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const ShowNavbar = () => {
    setIsLoading(true); // Set loading state to true when a navigation action is initiated
    navref.current.classList.toggle("responsive_bar");
    // Simulate loading completion after 1 second (you can replace it with actual data fetching)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false when the action is completed
    }, 1000);
  };

  return (
    <div>
      <header>
        <nav ref={navref}>
          <Link to={`/teacherhomepage/${TId}/`} className="a" onClick={ShowNavbar}> Dashboard </Link>
          <Link to={`/teacherhomepage/${TId}/teacherstudentdetails`} className="a" onClick={ShowNavbar}> Student </Link>
          <Link to={`/teacherhomepage/${TId}/attendance`} className="a" onClick={ShowNavbar}> Attendance </Link>
          <button onClick={ShowNavbar} className='nav-btn nav-close-btn'><FaTimes/></button>
        </nav>
        <button onClick={ShowNavbar} className='nav-btn'><FaBars/></button>
      </header>
      {isLoading && <Loader/> } {/* Loader conditionally rendered */}
    </div>
  );
}

export default TeacherHomenav;
