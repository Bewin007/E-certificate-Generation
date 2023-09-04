import React, { useState, useEffect } from 'react';
import { Box, Button, Center, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import axios from 'axios';

const AddCertificate = () => {
  const [certificateData, setCertificateData] = useState({
    reg_no: '',
    name: '',
    email: '',
    event_name: '',
    summary_event: '',
    organization: 1, // Set the default organization ID to 1 for "KHacks"
    file: null, // Initialize the file to null
  });

  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch organizations from your Django API when the component mounts
    axios.get('http://localhost:8000/org/')
      .then((response) => {
        setOrganizations(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateData({
      ...certificateData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCertificateData({
      ...certificateData,
      file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('reg_no', certificateData.reg_no);
    formData.append('name', certificateData.name);
    formData.append('email', certificateData.email);
    formData.append('event_name', certificateData.event_name);
    formData.append('summary_event', certificateData.summary_event);
    formData.append('organization', certificateData.organization);
    formData.append('file', certificateData.file);
    
    // Send a POST request with the FormData
    axios.post('http://localhost:8000/certificates/', formData)
    
      .then((response) => {
        console.log('Certificate added successfully:', response.data);
        // Optionally, you can redirect the user to the certificate list page or show a success message.
      })
      .catch((error) => {
        console.error('Error adding certificate:', error);
        console.log(formData)
        // Handle errors and display appropriate messages to the user.
      });
      
  };

  return (
    <Center>
      <Box mt="4">
        <form onSubmit={handleSubmit}>
          <FormControl id="reg_no" mb="4">
            <FormLabel>Registration No</FormLabel>
            <Input
              type="text"
              name="reg_no"
              value={certificateData.reg_no}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="name" mb="4">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={certificateData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="email" mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={certificateData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="event_name" mb="4">
            <FormLabel>Event Name</FormLabel>
            <Input
              type="text"
              name="event_name"
              value={certificateData.event_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="summary_event" mb="4">
            <FormLabel>Summary Event</FormLabel>
            <Textarea
              name="summary_event"
              value={certificateData.summary_event}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="organization" mb="4">
            <FormLabel>Select Organization</FormLabel>
            <Select
              name="organization"
              value={certificateData.organization}
              onChange={handleChange}
              required
            >
              {/* Manually include "KHacks" as an option */}
              <option value="1">KHacks</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="file" mb="4">
            <FormLabel>Upload File</FormLabel>
            <Input
              type="file"
              name="file"
              accept=".pdf, .jpg, .jpeg, .png" // Define the accepted file types
              onChange={handleFileChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Add Certificate
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default AddCertificate;
