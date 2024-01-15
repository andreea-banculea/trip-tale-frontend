import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommentCard.css'

function CommentCard(props) {
  const {id,userId, dateAndTime,content} = props;
  const [username, setUsername] = useState();
  const [profilePhoto, setProfilePhoto] = useState();

  useEffect(() => {
    getUserById();
  }, );

  const dateObj = new Date(dateAndTime);
  const formattedDate = dateObj.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      setUsername(response.data.username)
      setProfilePhoto(response.data.profilePhotoURL)
      console.log(profilePhoto);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="review-card-container">
      <div className="review-card">
        <div className="row">
          <div className="col-1">
            <img
              className="rounded-circle shadow-1-strong"
              src={profilePhoto}
              alt="avatar"
              width="30"
              height="30"
            />
          </div>
          <div className="col-11">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1"style={{fontSize:10}}>
                  {username} <span class="small" style={{fontSize:7}}> - {formattedDate}</span>
                </p>
              </div>
              <p className="small mb-0" style={{fontSize:6}}>
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
