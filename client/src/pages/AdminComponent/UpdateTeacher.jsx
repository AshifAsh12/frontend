import React, { useState ,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import "./Admin.css"

function UpdateTeacher() {
    
   
    const { TId } = useParams();
  
const inputvalues = { Regno: '', name: '',Dob:'',email:'',Address:'',password:'' };
const [formdata, setform] = useState(inputvalues);

const errorvalues = { Regno: '', name: '',Dob:'',email:'',Address:'',password:'' };
const [errordata, seterror] = useState(errorvalues);




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


useEffect(() => {
    Axios.get(`https://backend-kappa-gray.vercel.app/api/updateteacherdetails/${TId}/`)
      .then(result => {
        setform(prevFormdata => ({
          ...prevFormdata,
          Regno: result.data[0].TeacherID,
          name: result.data[0].Name,
          Dob: result.data[0].TD_o_b,
          email: result.data[0].Email,
          Address: result.data[0].Address,
          password: result.data[0].Password
        }));
        
        
        
        
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [TId]);





const InputChange = (e) => {
  const { name, value } = e.target;
  setform({ ...formdata, [name]: value });
};

const HandleSubmit = (e) => {
  e.preventDefault();
  const newerror = {};

  if (!formdata.Regno) {
    newerror.Regno = '* Register-No is Required*';
  }
  if (!formdata.name) {
    newerror.name = '*Name is Required*';
  }
  if (!formdata.Dob) {
    newerror.Dob = '*D-O-B is Required*';
  }
  if (!formdata.email) {
    newerror.email = '*Email is Required*';
  }
  
  if (!formdata.Address) {
    newerror.Address = '*Address is Required*';
  }

  if(!formdata.password)
  {
    newerror.password="*Password is required*"
  }
  else if(formdata.password.length<8)
  {
    newerror.password="*Password should contain 8 character *"
  }


  seterror(newerror);

  


  if (Object.keys(newerror).length === 0) {
    Axios.put(`https://backend-kappa-gray.vercel.app/api/updateteacher/${TId}`, {
      Regno: formdata.Regno,
      Name: formdata.name,
      Dob: formdata.Dob,
      email:formdata.email,
      Address:formdata.Address,
      password:formdata.password      
    })
      .then((response) => {
        if (response.data.message === 'updated') {
          openModal('Teacher updated Successfully');
          
        } else if(response.data.message === 'failed') {
          openModal('TeacherId Already Exist');
        }
      })
      .catch((error) => {
        openModal('Something went wrong');
      });
  }
};


return (
  <div>
        <div className='Details'>
    
    <div className='Add-box'>
      <form onSubmit={HandleSubmit}>
      
        <h3>Update Teacher</h3>
        <input
          type="text"
          name="Regno"
          placeholder='Teacher-ID'
          value={formdata.Regno}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Regno}</p>

        <input
          type="text"
          name="name"
          placeholder='Teacher-Name'
          value={formdata.name}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.name}</p>

        <input
          type="date"
          name="Dob"
          placeholder='D_O_B'
          value={formdata.Dob}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Dob}</p>

       
        <input
            type="email"
            name="email"
            placeholder='Email'
            value={formdata.email}
            onChange={InputChange}
          /><br></br>
          <p className='error'>{errordata.email}</p>
       

        <input
          type="text"
          name="Address"
          placeholder='Address'
          value={formdata.Address}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Address}</p>

        <input 
    type="password"
    name="password"
    placeholder='Password'
    value={formdata.password}
    onChange={InputChange}></input><br></br>
     <p className='error'>{errordata.password}</p>
     <div className='Addbutton-box'>
        <button type="submit">Update</button></div>
      </form>
      </div>
    </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className='ModelBox'
      >
        <p>{modalContent}</p>
        <button className="Model-Button"  onClick={closeModal}>OK</button>
      </Modal>
  </div>
)
}

export default UpdateTeacher