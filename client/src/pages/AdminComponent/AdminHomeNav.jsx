import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import { FaBars, FaTimes } from "react-icons/fa";
import './Admin.css';
import Loader from '../Loader/Loader';
function AdminHomeNav() {
  const { IId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const navref = useRef();

  const ShowNavbar = () => {
    setIsLoading(true); // Set loading state to true when a navigation action is initiated
    navref.current.classList.toggle("responsive_bar");
    // Simulate loading completion after 1 second (you can replace it with actual data fetching)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false when the action is completed
    }, 1000);
  };

  Axios.defaults.withCredentials = true;

  return (
    <div>
      <header>
        <nav ref={navref}>
          <Link to={`/adminhomepage/${IId}/`} className="a" onClick={ShowNavbar}> Dashboard </Link>
          <Link to={`/adminhomepage/${IId}/studentdetails`} className="a" onClick={ShowNavbar}> Student</Link>
          <Link to={`/adminhomepage/${IId}/teacherdetails`} className="a" onClick={ShowNavbar}> Teacher </Link>
          <Link to={`/adminhomepage/${IId}/classdetails`} className="a" onClick={ShowNavbar}> Class </Link>
          <Link to={`/adminhomepage/${IId}/exam`} className="a" onClick={ShowNavbar}> Exam </Link>
          <Link to={`/adminhomepage/${IId}/subject`} className="a" onClick={ShowNavbar}> Subject</Link>
          <button onClick={ShowNavbar} className='nav-btn nav-close-btn'><FaTimes/></button>
        </nav>
        <button onClick={ShowNavbar} className='nav-btn'><FaBars/></button>
      </header>
      {isLoading && <Loader/> } {/* Loader conditionally rendered */}
    </div>
  );
}

export default AdminHomeNav;
