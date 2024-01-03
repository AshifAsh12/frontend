import React, { useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import "./Admin.css"

function AddTeacher()
{
  const navigate = useNavigate();
    const { IId } = useParams();
  
const inputvalues = { Regno: '', name: '',Dob:'',email:'',Address:'',password:'' };
const [formdata, setform] = useState(inputvalues);

const errorvalues = { Regno: '', name: '',Dob:'',email:'',Address:'',password:'' };
const [errordata, seterror] = useState(errorvalues);

const [loginerror,setloginerror]=useState("")


const [modalIsOpen, setModalIsOpen] = useState(false);
const [modalContent, setModalContent] = useState('');

const ModalStyles = {
  content: {
    width: '200px',  // Set your desired width
    height: '100px', // Set your desired height
    margin: 'auto', 
    border:'none',
    
  },
 
};


const openModal = (content) => {
  setModalContent(content);
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
  setModalContent('');
};

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
    Axios.post(`https://backend-sandy-six.vercel.app/api/addteacher/${IId}`, {
      Regno: formdata.Regno,
      Name: formdata.name,
      Dob: formdata.Dob,
      email:formdata.email,
      Address:formdata.Address,
      password:formdata.password      
    })
      .then((response) => {
        if (response.data.message === 'Data inserted successfully2') {
          openModal('Teacher Added Successfully');
          navigate(`/adminhomepage/${IId}/teacherdetails`);
        } else {
          openModal('Teacher Already Added');
        }
      })
      .catch((error) => {
        openModal('Teacher Already Added');
      });
  }
};


return (
  <div>
    <div className='Details'>
      <div className='Add-box'>
      <div className='Input-box'>

     
      <form onSubmit={HandleSubmit}>
      <p className='lerror'>{loginerror}</p>
        <h3>Add Teacher</h3>
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
        <div className='Date'>
                <label>Date of Birth: </label>
        <input
          type="date"
          name="Dob"
          placeholder='D_O_B'
          value={formdata.Dob}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Dob}</p>
        </div>
       
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
        <button type="submit" className='submit'>Add</button>
        </div>
      </form>
      </div>
      </div>
    </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        style={ModalStyles}
        className='ModelBox'
      >
        <p>{modalContent}</p>
        <button  className="Model-Button" onClick={closeModal}>Ok</button>
      </Modal>
  </div>
)
}

export default AddTeacher