import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import BlogCard from './BlogCard';
import { useNavigate } from "react-router-dom";

import './HomePage.css';

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    fetchBlogs();
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get(
      `http://localhost:8080/users/getLoggedUser`
    );
    setUserId(response.data.id);
  };

  const fetchBlogs = async () => {
    setIsLoading(true);
    const response = await axios.get('http://localhost:8080/blogs');

    setBlogs(response.data);
    setIsLoading(false);
  };
  
  const handleButton = (e) => {
    navigate("/createBlog");
  }

  return (
    <div>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"></link>
      </head>
      <div >
        <Navbar />
        <div class="container-image">
          <img
            src="https://i.imgur.com/cErtIeO.jpeg"
            alt="Image"
            class="center-image" />
          <div class="image-overlay">
            <div class="image-text">Capture Memories That Last a Lifetime</div>
            <div class="image-description">Welcome to our travel website, where you can capture memories that last a lifetime. Explore stunning destinations, immerse yourself in vibrant cultures, and discover hidden gems off the beaten path. Get inspired, plan with confidence, and connect with fellow adventurers. Your extraordinary journey begins here.</div>
            <button onClick = {handleButton} class="rounded-button">Write a blog</button>
          </div>
        </div>
        <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <h1></h1>
          <div className="row">
            {blogs.map((blog) => (
              <div className="col-md-4" key={blog.id}>
                <BlogCard
                  id={blog.id}
                  userId={blog.userId}
                  title={blog.title}
                  content={blog.content}
                  location={blog.locationId}
                  photoURL={blog.photoURL} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
