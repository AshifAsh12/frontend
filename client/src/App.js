
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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






function App() {





  return (


    <div className="App" style={{ height: '100%', overflow: 'auto' }}>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login></Login>}></Route>
          
          <Route path="/instituteregistration" element={<InstituteRegistration/>}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>



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
            <Route path="updateclass/:CId" element={<UpdateClasss/>} />
            <Route path="attendacedetails/:SId" element={<StudentAttendanceDetail/>} />

          </Route>
          <Route path="/teacherhomepage/:TId/" element={<PrivateRoute><TeacherHomepage/></PrivateRoute>}>
          <Route path="" element={<TeacherHome/>}/>
          <Route path="teacherstudentdetails" element={<TeacherStudents/>}/>
          <Route path="attendance" element={<AttendanceRegister/>}/>
          <Route path="nav" element={<TeacherHomenav/>}/>
          <Route path="attendacedetails/:SId" element={<AttendanceDetail/>} />
          </Route>
          <Route path="/Teacherlogin" element={<TeacherLogin/>}/>
         
        
        
        </Routes>






      </BrowserRouter>


    </div>
  );
}

export default App;
