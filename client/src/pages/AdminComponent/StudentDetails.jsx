import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import './Admin.css';

function StudentDetails() {
  const { IId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Add state for filtered data
  const [searchTerm, setSearchTerm] = useState('');
  const [nulldata, setNullData] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const ModalStyles = {
    content: {
      width: '300px',
      height: '150px',
      margin: 'auto',
      font: 'bold',
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
    Axios.get(`https://backend-sandy-six.vercel.app/api/studentdetail/${IId}`)
      .then((result) => {
        setData(result.data);
        if (result.data.length === 0) {
          setNullData('Student Not Present. Add Student.');
        } else {
          setNullData('');
        }
      })
      .catch((error) => {
        console.error(error);
       
      });
  }, [IId]);

  useEffect(() => {
    // Update filteredData whenever data changes
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    // Filter data based on the search term
    const filtered = data.filter((studentDetails) =>
      studentDetails.Regno.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openDeleteConfirmation = (student) => {
    setSelectedStudent(student);
    openModal(
      <div>
        <p>Are you sure you want to delete {student.Name}?</p>
        <button className="Model-Buttonyes" onClick={handleDeleteYes}>
          Yes
        </button>
        <button className="Model-ButtonNo" onClick={handleDeleteNo}>
          No
        </button>
      </div>
    );
  };

  const handleDeleteYes = () => {
    closeModal();
    if (selectedStudent) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/deletestudent/${IId}`, {
        SId: selectedStudent.Regno,
      })
        .then((response) => {
          if (response.data.message === 'Not found') {
            openModal('Student Not Found In this Institute');
          } else if (response.data.message === 'found') {
            openModal('Deleted Successfully');
            window.location.reload();
          } else {
            openModal('Unexpected Response From Server');
          }
        })
        .catch((error) => {
          openModal('Server Not Found');
        });
    }
  };

  const handleDeleteNo = () => {
    closeModal();
  };

  return (
    <div>
      <div className="Dash-heading">
        <p className="DashHeadname">Student</p>
        <Link to={`/adminhomepage/${IId}/addstudent`} className="detailbutton">
          Add Student
        </Link>
        {/* Add search input and button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button onClick={handleSearch}
                  className='Search-Button'>Search</button>
        </div>
      </div>
      <div className="Details">
        <div className="Detail-box">
          {filteredData.map((studentDetails, index) => (
            <div key={index} className="student-card">
              <div className="record">
                <label className="head">RegNo:</label>
                <p className="body">{studentDetails.Regno}</p>
              </div>

              <div className="record">
              <label className="head">Name:</label>
              <p className="body">{studentDetails.Name}</p>
            </div>
            <div className="record">
              <label className="head">D-O-B:</label>
              <p className="body">{studentDetails.StudentDOB}</p>
            </div>
            <div className="record">
              <label className="head">Father_Name:</label>
              <p className="body">{studentDetails.Father_name}</p>
            </div>
            <div className="record">
              <label className="head">Mother_Name:</label>
              <p className="body">{studentDetails.Mother_name}</p>
            </div>
            <div className="record">
              <label className="head">Address:</label>
              <p className="body">{studentDetails.Address}</p>
            </div>
            <div className="record">
              <label className="head">Class: </label>
              <p className="body">{studentDetails.SClassID}</p>
            </div>
              <div className="action-buttons">
                <Link
                  className="edit-button"
                  to={`/adminhomepage/${IId}/updatestudent/${studentDetails.Regno}`}
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => openDeleteConfirmation(studentDetails)}
                >
                  Delete
                </button>
               
              </div>
              <div className="action-buttons">
              <Link
                  to={`/adminhomepage/${IId}/attendacedetails/${studentDetails.Regno}`}
                >
                 Attendance Details
                </Link>
                </div>
             
            </div>
          ))}
        </div>
      </div>
      <p className="Null-details">{nulldata}</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        style={ModalStyles}
        className="ModelBox"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default StudentDetails;
