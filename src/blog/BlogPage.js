import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../home/Navbar';
import CommentCard from './CommentCard';
import './BlogPage.css'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BlogPage() {
    let { state } = useLocation();
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [profilePhotoURL, setProfilePhotoURL] = useState();


    const navigate = useNavigate();

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        getUser();
        getLoggedUser();
    },);

    const getLoggedUser = async () => {
        const response = await axios.get(
            `http://localhost:8080/users/getLoggedUser`
        );
        setUserId(response.data.id);
    };

    const getUser = async () => {
        const response = await axios.get(
            `http://localhost:8080/users/${state.userId}`
        );
        setUsername(response.data.username);
        setProfilePhotoURL(response.data.profilePhotoURL);
    };
    axios.defaults.withCredentials = true;
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comments/byBlogId/${state.id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/blogs/${state.id}`);
        navigate("/home");
    };

    return (
        <div>
            <Navbar />
            <div className="container-image">
                <button userId={state.userId} className="delete-button bg-dark" onClick={handleDelete} style={{
                    position: 'fixed',
                    top: '30px',
                    right: '10px',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '5px',
                }}>
                    Delete
                </button>
                <img src={state.photoURL} alt="Image" className="center-image" />
                <div className="image-overlay">
                    <div className="text-border">
                        <div className="image-title">{state.title}</div>
                        <div className="image-location">{state.location}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:10 }}>
                    <div>
                        <div className="col-1" style={{}}>
                            <img
                                className="rounded-circle shadow-1-strong"
                                src={profilePhotoURL}
                                alt="avatar"
                                width="30"
                                height="30"
                                style={{ marginLeft: '25px' }}
                            />
                        </div>
                        <div className="col-11">
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1" style={{ fontSize: 10 }}>
                                        {username}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blog-content">{state.content}</div>
                {comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        id={comment.id}
                        userId={comment.userId}
                        dateAndTime={comment.dateAndTime}
                        content={comment.content}
                    />
                ))}
            </div>
        </div >
    );
};

export default BlogPage;
