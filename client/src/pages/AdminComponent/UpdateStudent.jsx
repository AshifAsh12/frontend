import React, { useState ,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import "./Admin.css"

function UpdateStudent() { 
  const { IId } = useParams();
  const { SId } = useParams();
  
const inputvalues = { Regno: '', name: '',Dob:'', Fname: '',Mname:'',Address:'',classname:''};
const [formdata, setform] = useState(inputvalues);

const errorvalues = { Regno: '', name: '',Dob:'', Fname: '',Mname:'',Address:'',classname:'' };
const [errordata, seterror] = useState(errorvalues);


const [data, setData] = useState([]);


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
    Axios.get(`https://backend-kappa-gray.vercel.app/api/updatestudentdetails/${SId}/`)
      .then(result => {
        setform(prevFormdata => ({
          ...prevFormdata,
          Regno: result.data[0].Regno,
          name: result.data[0].Name,
          Dob: result.data[0].StudentDOB,
          Fname: result.data[0].Father_name,
          Mname: result.data[0].Mother_name,
          Address: result.data[0].Address,
          classname: result.data[0].SClassID
        }));
        
        
        
        
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [IId]);

useEffect(() => {
  Axios.get(`https://backend-kappa-gray.vercel.app/api/classdetails/${IId}`)
    .then(result => {
      setData(result.data);
      if(result.data.length===0){
        errordata.classname = '*Enter the class First*';
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error');
    });
}, [IId]);
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
  if (!formdata.Fname) {
    newerror.Fname = '*Father-Name is Required*';
  }
  if (!formdata.Mname) {
    newerror.Mname = '*Mother-Name is Required*';
  }
  if (!formdata.Address) {
    newerror.Address = '*Address is Required*';
  }
  if(!formdata.classname){
    newerror.classname = '* Select the class*';
  }

  


  seterror(newerror);

  


  if (Object.keys(errordata).length === 0) {
    Axios.put(`https://backend-kappa-gray.vercel.app/api/updatestudent/${SId}`, {
      Regno: formdata.Regno,
      Name: formdata.name,
      Dob: formdata.Dob,
      Fname: formdata.Fname,
      Mname: formdata.Mname,
      Address:formdata.Address,
      classname:formdata.classname
      
    })
      .then((response) => {
        if (response.data.message === 'updated') {
          openModal('Student Updated Successfully');
          
        } else 
        if(response.data.message === 'failed') {
          openModal('StudentID Already Exist');
        }
      })
      .catch((error) => {
        openModal('Something Went Wrong');
      });
  }
};


return (
  <div>
            <div className='Details'>

    <div className='Add-box'>
      <form onSubmit={HandleSubmit}>
      
        <h3>Update Student</h3>
        <input
          type="text"
          name="Regno"
          placeholder='Register-No'
          value={formdata.Regno}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Regno}</p>

        <input
          type="text"
          name="name"
          placeholder='Student-Name'
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
          type="text"
          name="Fname"
          placeholder='Father-Name'
          value={formdata.Fname}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Fname}</p>

        <input
          type="text"
          name="Mname"
          placeholder='Mother-Name'
          value={formdata.Mname}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Mname}</p>

        <input
          type="text"
          name="Address"
          placeholder='Address'
          value={formdata.Address}
          onChange={InputChange}
        /><br></br>
        <p className='error'>{errordata.Address}</p>

        <div className='Select-box'>
    <label> Class  :</label>
        <select  name="classname" 
        id="classname"
        className='classname'
        onChange={InputChange}
>
  <option>Select Class</option>
  {
    data.map(getdata=>{
      return <option value={getdata.Class_ID}>{getdata.Class_Name}</option>
    })
  }

</select>
</div>
<p className='error'>{errordata.classname}</p>
<div className='Addbutton-box'>
        <button type="submit">Submit</button></div>
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
    <button className="Model-Button" onClick={closeModal}>OK</button>
  </Modal>
  </div>
)
}

export default UpdateStudent