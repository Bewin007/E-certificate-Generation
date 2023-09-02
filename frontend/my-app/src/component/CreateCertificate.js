import React, { useState } from 'react';
import axios from 'axios';

function CreateCertificate() {
  const [formData, setFormData] = useState({
    Reg_no: '',
    name: '',
    email: '',
    event_name: '',
    file: null, // Store the selected file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the file
    const formDataToSend = new FormData();
    formDataToSend.append('Reg_no', formData.Reg_no);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('event_name', formData.event_name);
    formDataToSend.append('file', formData.file);

    // Replace with your backend API endpoint URL
    const apiUrl = 'http://localhost:8000/admin/';

    axios
      .post(apiUrl, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for file upload
        },
      })
      .then((response) => {
        console.log('Data posted successfully:', response.data);
        // You can perform additional actions here, like showing a success message or redirecting the user
      })
      .catch((error) => {
        console.error('Error posting data:', error);
        // Handle errors, show error messages, etc.
      });
  };

  return (
    <div>
      <h2>Create a Certificate</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Reg_no">Registration Number:</label>
          <input
            type="text"
            id="Reg_no"
            name="Reg_no"
            value={formData.Reg_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="event_name">Event Name:</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="file">Upload File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateCertificate;
