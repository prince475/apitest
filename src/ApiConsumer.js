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
    localStorage.setItem('jwtToken', token);
    setAuthToken(token); // Set the token in Axios headers
  };

  useEffect(() => {
    const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYzMTg5MzUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzE0OCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NzE0OCJ9.fUwKkLzWKx_e1IZz_1_PbbNwL_15E5AOJNpRpYmrS1M');
    if (token) {
      setAuthToken(token); // Set the token in Axios headers
      // Make your API request here
      axios.get('https://developer.britam.com/api/IdeasPortal/GetChallenges')
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
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ApiConsumer;