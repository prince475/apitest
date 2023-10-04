import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ApiConsumer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };


    const saveAuthToken = (token) => {
    // Save the token to localStorage with the key 'jwtToken'
    localStorage.setItem('jwtToken', token);
    // Set the token in Axios headers
    setAuthToken(token);
  };

  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY0MTU0MDcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzE0OCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzE0OCJ9.2xvHHqpW8tSeXT5zRue3cPJYplb50ywh7a02dnHjQ34';
saveAuthToken(jwtToken);

  useEffect(() => {
    // Retrieve the token from localStorage using the correct key 'jwtToken'
      const token = localStorage.getItem('jwtToken');
      
    if (token) {
      setAuthToken(token); // Set the token in Axios headers
      // Make your API request here
      axios.post('https://developer.britam.com/api/IdeasPortal/GetIdeas')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Data:</h1>
      <ul>
        {data.map((item) => (
            <li key={item.id}>
            <strong>Title:</strong> {item.title}<br />
            <strong>Potential benefits:</strong> {item.potential_BENEFIT}<br />
            <strong>Description:</strong> {item.description} <br />
            <strong>Department:</strong> {item.department} <br />
            <strong>Upvotes:</strong> {item.upvotes} <br />
            <strong>Comments:</strong> {item.comments} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiConsumer;