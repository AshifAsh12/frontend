import React ,{ useState}from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';

function TeacherLogin() {
    const lformvalue={iid:"",password:""};
    const [formdata,setformdata]=useState(lformvalue);

    const errorvalue={iid:"",password:""};
    const [errordata,seterrordata]=useState(errorvalue);
    



    const [modalIsOpen, setModalIsOpen] = useState(false);
const [modalContent, setModalContent] = useState('');






const openModal = (content) => {
setModalContent(content);
setModalIsOpen(true);
};

const closeModal = () => {
setModalIsOpen(false);
setModalContent('');
};

    const navigate=useNavigate();
    Axios.defaults.withCredentials=true;
    


    const Handleinput =(e) => {
      const {name,value}=e.target;

      setformdata({...formdata,[name]:value});

    }
   
    
    const HandleSubmit =(e) => {
      e.preventDefault();

      const newerror={}

      if(!formdata.iid){
        newerror.iid="*Institute-ID is required*";
      }
      if(!formdata.password)
      {
        newerror.password="*Password is required*"
      }
      else if(formdata.password.length<8)
      {
        newerror.password="*Password should contain 8 character *"
      }

      seterrordata(newerror);

      
      

      
      
      if (Object.keys(newerror).length === 0) {


        Axios.post('https://backend-sandy-six.vercel.app/api/Teacherlogin',{
          Iid: formdata.iid,
          password:formdata.password,
        })
        .then((response) => {
          
          if (response.data.message === 'Success') {
            localStorage.setItem("valid",true);
            
            navigate('/teacherhomepage/' + response.data.TId);
           
          } else {
            openModal('Invalid Username or Password');
          }
        })
        
          .catch((error) => {
            alert('Server-Not-Found');
          });
      }
      
      
    
    }
  
     

    

return (
  <div className='wrapper'>

    <div className='login-box'>
    <form onSubmit={HandleSubmit}>
      
      <h3>
        Login As Teacher
      </h3>
      
      <div className='input-box'>
      
      <input 
      type="text"
      name="iid"
      placeholder='Teacher-ID'
      value={formdata.iid}
      onChange={Handleinput}></input>
      
       <p className='error'>{errordata.iid}</p>
       </div>



       <div className='input-box'>
      <input 
      type="password"
      name="password"
      value={formdata.password}
      placeholder='Password'
      onChange={Handleinput}></input>
      
       <p className='error'>{errordata.password}</p>

      </div>
      
      <button>Login</button> 

      <div className='register-link' >  </div>


      <div className='remember-forgot'> 
      <Link to="/" className='link'>Admin Login</Link> 
      </div>
      
    </form>
    </div>

    <div
className='Model-Container'>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Error Modal"
      className='ModelBox'
      >
      <p>{modalContent}</p>
      <button  className="Model-Button" onClick={closeModal}>Close</button>
    </Modal>
    </div>
  </div>
)
}

export default TeacherLogin
