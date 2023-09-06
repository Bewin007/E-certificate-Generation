import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    description: '',
    logo: null, // Initialize 'logo' as null
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const logoFile = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, logo: logoFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send the file
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('logo', formData.logo); // Append the logo file

      // Make a POST request to your API with the FormData
      const response = await axios.post('http://localhost:8000/org/', formDataToSend);

      // Check the response status and show a success message
      if (response.status === 201) {
        toast({
          title: 'Organization created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle other response statuses as needed
        toast({
          title: 'Error creating organization',
          description: 'An error occurred while creating the organization.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error creating organization:', error);
      toast({
        title: 'Error creating organization',
        description: 'An error occurred while creating the organization.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Logo</FormLabel>
            <Input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Create Organization
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default OrganizationForm;
