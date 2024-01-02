import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import Modal from 'react-modal';
import { FaSearch } from "react-icons/fa";

function ClassDetails() {
  const { IId } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Add state for filtered data
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [nulldata, setNullData] = useState('');

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
    Axios.get(`https://backend-sandy-six.vercel.app/api/classdetails/${IId}`)
      .then((result) => {
        setData(result.data);
        if (result.data.length === 0) {
          setNullData('Class Not Present. Add Class.');
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
    const filtered = data.filter((classDetails) =>
      classDetails.Class_ID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const openDeleteConfirmation = (classDetails) => {
    setSelectedClass(classDetails);
    openModal(
      <div>
        <p>Are you sure you want to delete {classDetails.Class_Name}?</p>
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
    if (selectedClass) {
      Axios.post(`https://backend-sandy-six.vercel.app/api/deleteclass/${IId}`, {
        ClassID: selectedClass.Class_ID,
      })
        .then((response) => {
          if (response.data.message === 'Not found') {
            openModal('Class Not Found In this Institute');
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
        <p className="DashHeadname">Class</p>
        <Link to={`/adminhomepage/${IId}/addclass`} className="detailbutton">
         + Add Class
        </Link>
        {/* Add search input and button */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Class-ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='Search-Input'
          />
          <button onClick={handleSearch} className='Search-Button'>
          <FaSearch />
          </button>
        </div>
      </div>
      <div className="Details">
        <div className="Detail-box">
          {filteredData.map((classDetails, index) => (
            <div key={index} className="student-card">
              <div className="record">
                <label className="head">ClassID</label>
                <p className="body">{classDetails.Class_ID}</p>
              </div>
              <div className="record">
                <label className="head">ClassName</label>
                <p className="body">{classDetails.Class_Name}</p>
              </div>
              <div className="record">
                <label className="head">TeacherName:</label>
                <p className="body">{classDetails.Class_TeacherID}</p>
              </div>
              <div className="action-buttons">
                <Link
                  className="edit-button"
                  to={`/adminhomepage/${IId}/updateclass/${classDetails.Class_ID}`}
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => openDeleteConfirmation(classDetails)}
                >
                  Delete
                </button>
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
        className='ModelBox'
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default ClassDetails;
