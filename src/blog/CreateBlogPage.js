import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from '../home/Navbar';
import { useNavigate } from "react-router-dom";

function CreateBlogPage() {
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [content, setContent] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [locationId, setLocationId] = useState(17);
    const [userId, setUserId] = useState();

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    const handleRegion = (event) => {
        setRegion(event.target.value);
    };

    const handleCountry = (event) => {
        setCountry(event.target.value);
    };
    const handlePhotoURL = (event) => {
        setPhotoURL(event.target.value);
    };
    const handleContent = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        getUser();
    },);

    const getUser = async () => {
        const response = await axios.get(
            `http://localhost:8080/users/getLoggedUser`
        );
        setUserId(response.data.id);
    };

    const handleLocation = async () => {
        const location = {
            city: city,
            region: region,
            country: country,
        }
        const response = await axios
            .post(`http://localhost:8080/locations`, location)
        console.log(response);
        setLocationId(response.data.id)
    };

    const handleSubmit = async (e) => {

        handleLocation();
        const blog = {
            title: title,
            locationId: locationId,
            userId: userId,
            content: content,
            photoURL: photoURL
        };
        console.log(blog);
        await axios
            .post(`http://localhost:8080/blogs`, blog)

        navigate('/home');
    };

    return (
        <div>
            <Navbar />

            <form style={{ maxWidth: '1000px', margin: '20px auto' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="title" style={{ marginRight: '47px' }}>
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitle}
                        required
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="city" style={{ marginRight: '50px' }}>
                        City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleCity}
                        required
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="region" style={{ marginRight: '27px' }}>
                        Region:
                    </label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={region}
                        onChange={handleRegion}
                        required
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="country" style={{ marginRight: '20px' }}>
                        Country:
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={country}
                        onChange={handleCountry}
                        required
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="photoURL" style={{ marginRight: '6px' }}>
                        PhotoURL:
                    </label>
                    <input
                        type="text"
                        id="photoURL"
                        name="photoURL"
                        value={photoURL}
                        onChange={handlePhotoURL}
                        required
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="content" style={{ verticalAlign: 'top', marginRight: '20px' }}>
                        Content:
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows="20"
                        cols="150"
                        value={content}
                        onChange={handleContent}
                        required
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    ></textarea>
                </div>

                <button onClick={handleSubmit} type="submit" class="bg-dark" style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#4caf50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Submit
                </button>
            </form>
        </div>
    );
}
export default CreateBlogPage;
