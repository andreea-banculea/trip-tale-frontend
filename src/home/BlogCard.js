import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BlogCard(props) {
  const { id, userId, photoURL, title, content, location, buttonLink } = props;
  const [city, setCity] = useState();
  const [region, setRegion] = useState();
  const [country, setCountry] = useState();

  const truncateContent = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    getLocation();
  },);

  const getLocation = async () => {
    const response = await axios.get(
      `http://localhost:8080/locations/${location}`
    );
    setCity(response.data.city);
    setRegion(response.data.region);
    setCountry(response.data.country);
  };

  return (
<div className="card" style={{ marginTop: 20, marginBottom: 50, display: 'flex', flexDirection: 'column', height: '100%' }}>
  <img
    className="card-img-top"
    src={photoURL}
    alt="Card image cap"
    height={'100px'}
  />
  <div className="card-body" style={{ flex: '1', overflow: 'hidden', padding: '10px', position: 'relative' }}>
    <h4 className="card-title">
      <a>{title}</a>
    </h4>
    <p className="card-text" style={{ overflow: 'hidden' }}>
      {truncateContent(content, 100)}
    </p>
  </div>
  <Link
  to="/blog"
  state={{
    id: id,
    title: title,
    userId: userId,
    location: city + ", " + region + ", " + country,
    content: content,
    photoURL: photoURL
  }}
  className="btn btn-primary bg-dark"
  style={{ position: 'absolute', bottom: '10px', left: '10px', marginTop: '20px' }}
>
  Open
</Link>
</div>
  );
}

export default BlogCard;
