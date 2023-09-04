import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

function CertificateForm() {
  const [formData, setFormData] = useState({
    reg_no: '',
    name: '',
    email: '',
    event_name: '',
    summary_event: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('reg_no', formData.reg_no);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('event_name', formData.event_name);
    formDataToSend.append('summary_event', formData.summary_event);
    formDataToSend.append('file', formData.file);

    try {
      const response = await fetch('http://localhost:8000/certificates/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Certificate created successfully, handle as needed
        console.log('Certificate created successfully.');
      } else {
        // Handle errors here
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="4">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="reg_no">
            <FormLabel>Registration Number</FormLabel>
            <Input
              type="text"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="event_name">
            <FormLabel>Event Name</FormLabel>
            <Input
              type="text"
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="summary_event">
            <FormLabel>Summary of Event</FormLabel>
            <Textarea
              name="summary_event"
              value={formData.summary_event}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="file">
            <FormLabel>File</FormLabel>
            <Input
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default CertificateForm;
