import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManipulateCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    // Fetch the list of certificates when the component mounts
    axios.get('http://localhost:8000/admin/')
      .then(response => {
        setCertificates(response.data);
      })
      .catch(error => {
        console.error('Error fetching certificates:', error);
      });
  }, []);

  const handleEdit = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleUpdate = () => {
    // Update the selected certificate using a PUT request
    axios.put(`http://localhost:8000/admi/${selectedCertificate.id}/`, selectedCertificate)
      .then(response => {
        // Handle success, e.g., show a success message or update the UI
        console.log('Certificate updated successfully');
        setSelectedCertificate(null); // Clear the selected certificate
      })
      .catch(error => {
        console.error('Error updating certificate:', error);
      });
  };

  const handleDelete = (certificateId) => {
    // Delete a certificate using a DELETE request
    axios.delete(`http://localhost:8000/admi/${certificateId}/`)
      .then(response => {
        // Handle success, e.g., show a success message or update the UI
        console.log('Certificate deleted successfully');
        // Remove the deleted certificate from the list
        setCertificates(certificates.filter(certificate => certificate.id !== certificateId));
      })
      .catch(error => {
        console.error('Error deleting certificate:', error);
      });
  };

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificates.map(certificate => (
          <li key={certificate.id}>
            {certificate.name} - {certificate.event_name}
            <button onClick={() => handleEdit(certificate)}>Edit</button>
            <button onClick={() => handleDelete(certificate.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedCertificate && (
        <div>
          <h3>Edit Certificate</h3>
          <input
            type="text"
            value={selectedCertificate.name}
            onChange={(e) => setSelectedCertificate({ ...selectedCertificate, name: e.target.value })}
          />
          <input
            type="text"
            value={selectedCertificate.event_name}
            onChange={(e) => setSelectedCertificate({ ...selectedCertificate, event_name: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ManipulateCertificate;
