import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, Textarea, Select } from '@chakra-ui/react';
import axios from 'axios';

function AdminForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    reg_no: '',
    name: '',
    email: '',
    event_name: '',
    summary_event: '',
    organization: '', 
    file: null,// Add the organization field
  });

  const [organizations, setOrganizations] = useState([]); // Store organization data

  useEffect(() => {
    // Fetch organizations when the component mounts
    axios.get('http://localhost:8000/org/')
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      
      // Append each field from formData to formDataToSend
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      console.log(formDataToSend);

      const response = await axios.post('http://localhost:8000/admin/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      // Handle successful response (e.g., show a success message or redirect)
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error:', error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Check if the input field is a file input
    if (type === 'file') {
      // Set the selected file in the formData state
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <Box maxWidth="400px" margin="0 auto">
      <form onSubmit={handleSubmit}>
        <Text fontSize="xl" marginBottom="4">Admin Login</Text>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          marginBottom="2"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          marginBottom="4"
        />
        <Input
          type="text"
          name="reg_no"
          placeholder="Registration Number"
          value={formData.reg_no}
          onChange={handleChange}
          marginBottom="2"
        />
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          marginBottom="2"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          marginBottom="2"
        />
        <Input
          type="text"
          name="event_name"
          placeholder="Event Name"
          value={formData.event_name}
          onChange={handleChange}
          marginBottom="2"
        />
        <Textarea
          name="summary_event"
          placeholder="Summary of Event"
          value={formData.summary_event}
          onChange={handleChange}
          marginBottom="4"
        />
        <Input
          type="file"
          name="file"
          accept="application/pdf" // Specify the allowed file type(s)
          onChange={handleChange}
          marginBottom="4"
        />
        <Select
          name="organization"
          placeholder="Select Organization"
          value={formData.organization}
          onChange={handleChange}
          marginBottom="4"
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </Select>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default AdminForm;
