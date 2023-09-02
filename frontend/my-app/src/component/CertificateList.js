import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CertificateList() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Make a GET request to your Django API
    axios.get('http://localhost:8000/upload')
      .then((response) => {
        setCertificates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <p>Name: {certificate.name}</p>
            <p>Email: {certificate.email}</p>
            <p>Event Name: {certificate.event_name}</p>
            <a href={`http://localhost:8000${certificate.file}`} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CertificateList;
