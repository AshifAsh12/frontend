import React from 'react'
import { useState ,useEffect} from 'react';
import Axios from 'axios'
import { useParams ,useNavigate} from 'react-router-dom';
import Modal from 'react-modal';

function AddClass() {
const {IId}=useParams()
const navigate = useNavigate();
const inputValues = { classid:"",classname: '' ,teachername:''};
const [formData, setForm] = useState(inputValues);

const errorValues = {  classid:"" ,classname: '',teachername:'' };
const [errorData, setError] = useState(errorValues);



const [data, setData] = useState([]);

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



useEffect(() => {
  Axios.get(`https://backend-sandy-six.vercel.app/api/teacherdetail/${IId}`)
    .then(result => {
      setData(result.data);
      if(!result.data.length){
        errorData.teachername="Add Teacher First"
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error');
    });
}, [IId]);

const InputChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...formData, [name]: value });
  console.log(formData.teachername)
};

const HandleSubmit = (e) => {
  e.preventDefault();
  const newError = {};

  if (!formData.classid) {
    newError.classid= '*Enter the Class-ID*';
  }
  if (formData.classid.length>4) {
    newError.classid= '*ClassID Should Less Than 4*';
  }
  if (!formData.classname) {
    newError.classname= '*Enter the Class-Name*';
  }
  if (formData.classname.length>10) {
    newError.classname= '*Only 10 Character Valid*';
  }
  if(!formData.teachername){
    newError.teachername= '*Select the Teacher*';
  }

  setError(newError);

  if (Object.keys(newError).length === 0) {
    Axios.post(`https://backend-sandy-six.vercel.app/api/addclass/${IId}`, {
    ClassID:formData.classid,
    Classname:formData.classname,
    Teachername:formData.teachername,
    


    
    })
      .then((response) => {
        if (response.data.message === 'Available') {
          openModal('Class Already Added');
        } 
        else if (response.data.message === 'failed') {
          openModal('Teacher is Handling other class');
          
        } else if (response.data.message === 'Class added successfully') {
          openModal('Class Added Successfully');
          navigate(`/adminhomepage/${IId}/classdetails`);
        } 
      })
      .catch((error) => {
        openModal('Server Not Found');
      });
  }
};

return (
<div>
<div className='Details'>
<div className='Add-box'>

  <form onSubmit={HandleSubmit}>
 
    <h3>Add Class</h3>
    <input
      type="text"
      name="classid"
      placeholder="Class-ID"
      value={formData.classid}
      onChange={InputChange}
    />
    <br />
    <p className="error">{errorData.classid}</p>

    <input
      type="text"
      name="classname"
      placeholder="Class-Name"
      value={formData.classname}
      onChange={InputChange}
    />
    <br />
    <p className="error">{errorData.classname}</p>
  <div className='Select-box'>
  <label> Teacher Name :</label>
    <select  name="teachername" 
            id="teachername"
            className='teacherselect'
            onChange={InputChange}
    >
      <option>Select Teacher</option>
      {
        data.map(getdata=>{
          return <option value={getdata.TeacherID}>{getdata.TeacherID}\{getdata.Name}</option>
        })
      }

    </select>
    </div>
    <p className="error">{errorData.teachername}</p>
    

   
    <div className='Addbutton-box'>
    <button type="submit" className='submit'>Add Class</button>
    </div>
  </form>
  </div>
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
        <button   className="Model-Button"  onClick={closeModal}>OK</button>
      </Modal>
      </div>
</div>
);
}

export default AddClass