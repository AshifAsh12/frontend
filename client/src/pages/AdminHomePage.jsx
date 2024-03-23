import React, { useState,useEffect }  from 'react';
import { Outlet, useParams,useNavigate} from 'react-router-dom';
import Axios from 'axios';
import AdminHomeNav from './AdminComponent/AdminHomeNav';
import './AdminComponent/Admin.css'

import logo from './AdminComponent/logo.png';
import icon from './icon.png';
import { FaCircleUser } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";


function AdminHomePage() {

  const errorvalues={name:"",iname:"",address:""}
  const [data,setData]=useState('')
  const [address,setaddress]=useState('')
  const [error,seterror]=useState(errorvalues)
  const [iname,setiname]=useState('')
  const [name,setname]=useState('')
  const [open,setopen]=useState(false)
  
  const {IId}=useParams()
  const navigate = useNavigate();
  //console.log(data)



  const handleSubmit = async (event) => {
    event.preventDefault();
    const newError={}

    if(!iname){
      newError.iname="*Institute Name Required"
    }
    if(!name){
      newError.name="*User-Name Required"
    }
    if(!address){
      newError.address="*Institute Name Required"
    }

    seterror(newError)


    if (Object.keys(newError).length === 0) {


      Axios.post(`https://backend-sandy-six.vercel.app/api/updateuser/${IId}`,{
        Iname:iname,
        Name:name,
        Address:address


      })
      .then((response) => {
        
        if (response.data.message === 'updated') {
          alert("updated successfully")
          setopen(false)
          
         
        } else {
          alert("something went wrong")
         
        }
      })
      
        .catch((error) => {
          alert('Server-Not-Found');
        });
    }
    
    
  
  }
  

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

  useEffect(() => {
    Axios.get(`https://backend-sandy-six.vercel.app/api/userdata/${IId}`)
      .then((result) => {

        if(result.data.length>0){
          setData(result.data[0]);

          setiname(result.data[0].Institute_Name)
          setname(result.data[0].Fname);
          setaddress(result.data[0].Institute_Address);
        }
       
      
        
      })
      .catch((error) => {
        console.error(error);
        alert('Server Not Responding');
      });
  }, [IId]);
  

  return (
    <div>
    <div className='wrapper2'>
    <div className='menu' >


      



    

<div className='Main_Head'>

<div className='site-logo'>



<img src={logo} className='logo-img'></img>
  </div>
  
  {/*<h3> {data.Institute_Name} ,{data.Institute_Address} </h3>*/}
    <div className='button-container'>


    

   

    <div className='menu-container'>

<div className='menu-trigger' onClick={()=>{setopen(!open)}}><img src={icon}/>


   </div>




<div className={`drop ${open? 'active':'inactive'}`}>

  <div>
    <FaCircleUser   className='user-icon'/></div>


  <h3> {data.InstitutePID} <br/><span>{data.Institute_Name}</span></h3>

  <ul>
    <form onSubmit={handleSubmit}>

    <li><input value={name}  placeholder='user-name' onChange={(e) => setname(e.target.value)}/>
    <p> {error.name}</p></li>
   
    <li><input value={iname} placeholder='Institute-Name' onChange={(e) => setiname(e.target.value)}/>
    <p>{error.iname}</p></li>
   
    
    <li><input value={address} placeholder='Institute-Address'  onChange={(e) => setaddress(e.target.value)}/>
    <p> {error.address}</p></li>
   
    <li>
      <button>Update</button>
    </li>

    
    </form>
  </ul>

    

  </div>

  



  </div>

  <button
                  className='site-btn'
                  onClick={() => {
                  handleLogout();
                  }}
                >
                  <BiLogOut/>
                  </button>


  


 

 

    


                  </div>
  
      </div>

      <div className='Account-Name'>

<h3> {data.InstitutePID} <br/><span>{data.Institute_Name}</span></h3>
  </div>

      <div className='redo-undo-button'>
          <button onClick={() => navigate(-1)}><FaArrowCircleLeft/></button>
          <button onClick={() => navigate(1)}><FaArrowCircleRight/></button>
        </div>
                   
   
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
