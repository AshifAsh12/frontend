import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import './Admin.css';

function TeacherDetail() {
  const { IId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Add state for filtered data
  const [searchTerm, setSearchTerm] = useState('');
  const [nulldata, setNullData] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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
    Axios.get(`https://backend-kappa-gray.vercel.app/api/teacherdetail/${IId}`)
      .then(result => {
        setData(result.data);
        if (result.data.length === 0) {
          setNullData('Teacher Not Present. Add Teacher.');
        } else {
          setNullData('');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [IId]);

  useEffect(() => {
    // Update filteredData whenever data changes
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    // Filter data based on the search term
    const filtered = data.filter((teacherDetails) =>
      teacherDetails.TeacherID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openDeleteConfirmation = (teacher) => {
    setSelectedTeacher(teacher);
    openModal(
      <div>
        <p>Are you sure you want to delete {teacher.Name}?</p>
        <button className="Model-Button" onClick={handleDeleteYes}>
          Yes
        </button>
        <button className="Model-Button" onClick={handleDeleteNo}>
          No
        </button>
      </div>
    );
  };

  const handleDeleteYes = () => {
    closeModal();
    if (selectedTeacher) {
      Axios.post(`https://backend-kappa-gray.vercel.app/api/deleteteacher/${IId}`, {
        TeacherID: selectedTeacher.TeacherID,
      })
        .then((response) => {
          if (response.data.message === 'Not found') {
            openModal('Teacher Not Found In this Institute');
          } else if (response.data.message === 'found') {
            openModal('Deleted Successfully');
            window.location.reload();
          } else if (response.data.error === 'Data deletion failed') {
            openModal('Teacher is working in class. Please update teacher in class');
          }
        })
        .catch(() => {
          openModal('Server error');
        });
    }
  };

  const handleDeleteNo = () => {
    closeModal();
  };

  return (
    <div>
      <div className="Dash-heading">
        <p className="DashHeadname">Teacher</p>
        <Link to={`/adminhomepage/${IId}/addteacher`} className="detailbutton">
          Add Teacher
        </Link>
        {/* Add search input and button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search By TeacherID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button onClick={handleSearch} className='Search-Button'>
            Search
          </button>
        </div>
      </div>

      <div className="Details">
        <div className='Detail-box'>
          {filteredData.map((teacherDetails, index) => (
            <div key={index} className="student-card">
              <div className="record">
                <label className="head">TeacherID</label>
                <p className="body">{teacherDetails.TeacherID}</p>
              </div>
              <div className="record">
                <label className="head">Name:</label>
                <p className="body">{teacherDetails.Name}</p>
              </div>
              <div className="record">
                <label className="head">D-O-B:</label>
                <p className="body">{teacherDetails.TD_o_b}</p>
              </div>
              <div className="record">
                <label className="head">Email:</label>
                <p className="body">{teacherDetails.Email}</p>
              </div>
              <div className="record">
                <label className="head">Address:</label>
                <p className="body">{teacherDetails.Address}</p>
              </div>
              <div className="record">
                <label className="head">Password: </label>
                <p className="body">{teacherDetails.Password}</p>
              </div>
              <div className="action-buttons">
                <Link
                  className="edit-button"
                  to={`/adminhomepage/${IId}/updateteacher/${teacherDetails.TeacherID}`}
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => openDeleteConfirmation(teacherDetails)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className='Null-details'>{nulldata}</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        style={ModalStyles}
        className='ModelBox'
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default TeacherDetail;
