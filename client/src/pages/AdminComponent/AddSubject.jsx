import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaTrashCan } from "react-icons/fa6";
import "./Admin.css";
import { useParams, Link } from 'react-router-dom';
import { BiSolidEditAlt } from "react-icons/bi";
import DotLoader from "react-spinners/RiseLoader";

function AddSubject() {
    const [subjectName, setSubjectName] = useState('');
    const [errorSubjectName, setErrorSubjectName] = useState('');
    const { IId } = useParams();
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false); 


    useEffect(() => {
        Axios.get(`https://backend-sandy-six.vercel.app/api/subjectdetail/${IId}`)
            .then((result) => {
                setdata(result.data);
                //console.log(result.data)
            })
            .catch((error) => {
                console.error(error);
                alert('Server Not Responding');
            });
    }, [IId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)

        
        setErrorSubjectName('');

        if (!subjectName) {
            setErrorSubjectName("Subject Name is Required");
            setLoading(false)
        } else {
            Axios.post(`https://backend-sandy-six.vercel.app/api/subject/${IId}`, {
                SubjectName: subjectName,
            })
                .then((response) => {
                    if (response.data.message === "available") {
                        alert("Subject Already Added")
                        setLoading(false)
                    }
                    else
                        if (response.data.message === "Added") {
                            alert("Subject  Added Successfully");
                            setLoading(false)
                            window.location.reload();


                        }
                        else {
                            alert("something went wrong")
                        }

                })
                .catch((error) => {
                    alert("error")
                });
        }
    };

    const handleDelete = (SubjectName) => {
        Axios.delete(`https://backend-sandy-six.vercel.app/api/deletesubject/${SubjectName}`)
            .then((response) => {
                if (response.data.message === 'deleted') {
                    alert("Subject deleted successfully");
                    window.location.reload()
                    // Refresh data after deletion

                }
            })
            .catch((error) => {
                alert("Server not found");
            });
    };

    return (
        <div>

            <div className='Wrapper'>


                <div className='form-container'>


                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            value={subjectName}
                            onChange={(event) => setSubjectName(event.target.value)}
                            placeholder='Subject Name'
                        />
                        {loading ? <div className='load'><DotLoader color="#ffff"/></div>
                        :
                         <button type="submit">Add Subject</button>}
                       
                        <br />
                        <p>{errorSubjectName}</p>
                    </form>

                </div>

                <div className='Table-container'>


                    <table>
                        <thead>
                            <tr>

                                <th>subject</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>


                            {data.length > 0 ? (
                                data.map((subject, index) => {
                                    // Split the exam name by the hyphen
                                    const subjectname = subject.SubjectName.split('-');
                                    // Take the part before the hyphen
                                    const displayedsubjectName = subjectname[0];

                                    return (
                                        <tr key={index}>
                                            <td>{displayedsubjectName}</td>

                                            <td>
                                                <button className="delete-button" onClick={() => handleDelete(subject.SubjectName)}><FaTrashCan /></button>

                                                <Link
                                                    className="edit-button"
                                                    to={`/adminhomepage/${IId}/updatesubject/${subject.SubjectName}`}
                                                >
                                                    <BiSolidEditAlt />

                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4">No Data</td>
                                </tr>
                            )}

                        </tbody>
                    </table>


                </div>


            </div>

            {/*<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Subject Added"
      >
       
        <button onClick={closeModal}>Close</button>
  </Modal>*/}
        </div>
    );
}

export default AddSubject;
