import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  Alert,
  AlertIcon,Image
} from '@chakra-ui/react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function Certificate() {
  const [searchMethod, setSearchMethod] = useState('email');
  const [searchData, setSearchData] = useState('');
  const [certificates, setCertificates] = useState([]);
  const domain = 'http://localhost:8000/';
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      // console.log(searchMethod,searchData)
      const response = await axios.post('http://localhost:8000/certificates/', {
        search_method: searchMethod,
        data: searchData,
      });
      setCertificates(response.data);
      // setlogo(response.data.organization.logo)
      // console.log(response.data)
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Error searching certificates. Please try again.');
      console.error('Error searching certificates:', error);
    }
  };

  const handleViewButtonClick = (e) => {
    console.log(e)
    navigate('/view', { state: { data: e.file } });
  };


    const handleDownload = async (e) => {
      try {
        // Replace 'backendImageUrl' with the actual URL of the image on your backend
        const backendImageUrl = `${domain}${e.organization.logo}` ;
        
        // Fetch the image data from the backend
        const response = await fetch(backendImageUrl);
        const blob = await response.blob();
  
        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);
  
        // Create a hidden anchor element to trigger the download
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'image.jpg'; // Specify the desired filename here
        anchor.style.display = 'none';
        
        // Trigger a click event on the anchor to initiate the download
        document.body.appendChild(anchor);
        anchor.click();
  
        // Clean up the temporary URL and anchor element
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(anchor);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    };


  // console.log(logo)
  return (
    <Box p={4}>
      <Stack spacing={4} align="center">
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Input
          type="text"
          placeholder="Search data"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <Select
          value={searchMethod}
          onChange={(e) => setSearchMethod(e.target.value)}
        >
          <option value="email">Email</option>
          <option value="reg_no">Registration Number</option>
        </Select>
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
        <Box>
          {certificates.map((certificate) => (
            <Box
              key={certificate.id}
              borderWidth="1px"
              p={2}
              rounded="md"
              boxShadow="base"
            >
              <Text>Email: {certificate.email}</Text>
              <Text>Registration Number: {certificate.reg_no}</Text>
              <Text>Event Name: {certificate.event_name}</Text>
              <Text>Organization Name: {certificate.organization.name}</Text>
              <Text>Summary of Event: {certificate.summary_event}</Text>
              <Text>Participant Name: {certificate.name}</Text>
              <Image src={`${domain}${certificate.organization.logo}`} alt="Organization Logo" />
              {/* Add more fields as needed */}
            <Button  onClick={() => handleViewButtonClick(certificate)} >View</Button>
            <Button  onClick={() => handleDownload(certificate)} >Download</Button>
            </Box>
          ))}
          
        </Box>
            
      </Stack>

    </Box>
  );
}

export default Certificate;
