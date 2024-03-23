import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link,  } from 'react-router-dom'; // Importing useNavigate hook
import ClipLoader from "react-spinners/ClipLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import Login from './pages/Login';
import AdminHomePage from './pages/AdminHomePage';
import InstituteRegistration from './pages/InstituteRegistration';
import AdminHomeNav from './pages/AdminComponent/AdminHomeNav';
import AddStudent from './pages/AdminComponent/AddStudent';
import Home from './pages/AdminComponent/Home';
import AddTeacher from './pages/AdminComponent/AddTeacher';
import AddClass from './pages/AdminComponent/AddClass';
import StudentDetails from './pages/AdminComponent/StudentDetails';
import TeacherDetail from './pages/AdminComponent/TeacherDetail';
import UpdateStudent from './pages/AdminComponent/UpdateStudent';
import UpdateTeacher from './pages/AdminComponent/UpdateTeacher';
import ClassDetails from './pages/AdminComponent/ClassDetails';
import UpdateClasss from './pages/AdminComponent/UpdateClasss';
import AttendanceRegister from './pages/TeacherComponent/AttendanceRegister';
import TeacherLogin from './pages/TeacherComponent/TeacherLogin';
import TeacherHomepage from './pages/TeacherComponent/TeacherHomepage';
import TeacherHomenav from './pages/TeacherComponent/TeacherHomenav';
import TeacherHome from './pages/TeacherComponent/TeacherHome';
import PrivateRoute from './pages/PrivateRoute';
import TeacherStudents from './pages/TeacherComponent/TeacherStudents';
import AttendanceDetail from './pages/TeacherComponent/AttendanceDetail';
import StudentAttendanceDetail from './pages/AdminComponent/StudentAttendanceDetail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AddSubject from './pages/AdminComponent/AddSubject';
import AddExam from './pages/AdminComponent/AddExam';
import AddMarks from './pages/TeacherComponent/AddMarks';
import Updatesubject from './pages/AdminComponent/Updatesubject';
import UpdateExam from './pages/AdminComponent/UpdateExam';
import EditMark from './pages/TeacherComponent/EditMark';
import Markdetails from './pages/AdminComponent/Markdetails';
import AllAttendanceDetail from './pages/TeacherComponent/AllAttendanceDetail';
import Loader from './pages/Loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };

    fakeDataFetch();
  }, []);

  return (
    isLoading ? (
    
       <Loader/>
      
    ) : (
      <div className="App" style={{ height: '100%', overflow: 'auto' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/instituteregistration" element={<InstituteRegistration />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            <Route path="/adminhomepage/:IId/" element={<PrivateRoute><AdminHomePage /></PrivateRoute>}>
              <Route path="d" element={<AdminHomeNav />} />
              <Route path="AddStudent" element={<AddStudent />} />
              <Route path="" element={<Home />} />
              <Route path="addteacher" element={<AddTeacher />} />
              <Route path="addclass" element={<AddClass />} />
              <Route path="studentdetails" element={<StudentDetails />} />
              <Route path="teacherdetails" element={<TeacherDetail />} />
              <Route path="classdetails" element={<ClassDetails />} />
              <Route path="updatestudent/:SId" element={<UpdateStudent />} />
              <Route path="updateteacher/:TId" element={<UpdateTeacher />} />
              <Route path="updateclass/:CId" element={<UpdateClasss />} />
              <Route path="attendacedetails/:SId" element={<StudentAttendanceDetail />} />

              <Route path="subject" element={<AddSubject />} />
              <Route path="exam" element={<AddExam />} />
              <Route path="updatesubject/:SubjectName" element={<Updatesubject />} />
              <Route path="updateExam/:ExamName" element={<UpdateExam />} />

              <Route path="mark/:SId" element={<Markdetails />} />
            </Route>

            <Route path="/teacherhomepage/:TId/" element={<PrivateRoute><TeacherHomepage /></PrivateRoute>}>
              <Route path="" element={<TeacherHome />} />
              <Route path="teacherstudentdetails" element={<TeacherStudents />} />
              <Route path="marks/:SId" element={<AddMarks />} />
              <Route path="attendance" element={<AttendanceRegister />} />
              <Route path="nav" element={<TeacherHomenav />} />
              <Route path="attendacedetails/:SId" element={<AttendanceDetail />} />
              <Route path="edit/:TId/:SId/:subject/:examName" element={<EditMark />} />

              <Route path="allattendance" element={<AllAttendanceDetail />} />
            </Route>

            <Route path="reset-password/:email/:token" element={<ResetPassword />}></Route>
            <Route path="/Teacherlogin" element={<TeacherLogin />} />
          </Routes>
        </BrowserRouter>

        <footer>
          <div className='footer-title'>
            <div className='widget'>
              <ul className='text-ul'>
                <li><h3>Developed by</h3></li>
                <li>Ashif M I</li>
                <li>Sanjith M S</li>
                <li>Ramshad K R</li>
                <li>Harshitha P K</li>
                <li>Leena H R</li>
              </ul>
            </div>
            <div className='widget'>
              <ul className='text-ul'>
                <li><h3>Under The Guidance of</h3></li>
                <li>Murali B N</li>
                <li>(Lecturer Dept Of Cs&E,Cauvery Polytechnic Gonikoppal)</li>
              </ul>
            </div>
            <div className='widget'>
              <ul className='Icon-ul'>
                <li><h3>Contact us&nbsp;</h3></li>
                <li>
                  <a href="https://mail.google.com/" className='footer-icon'><CgMail /></a>
                  <a href="https://www.instagram.com/" className='footer-icon'><AiFillInstagram /></a>
                  <a href="https://www.facebook.com/" className='footer-icon'><FaFacebook /></a>&nbsp;&nbsp;&nbsp;
                </li>
              </ul>
            </div>
          </div>
          <div className='Copywrite'>
            <p>Copyright &copy; All rights reserved | Cauvery Polytechnic Gonikoppal</p>
          </div>
        </footer>

        {/* Back and Previous buttons */}
       
      </div>
    )
  );
}

export default App;
