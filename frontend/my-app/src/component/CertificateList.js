// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CertificateList() {
//   const [certificates, setCertificates] = useState([]);

//   useEffect(() => {
//     // Make a GET request to your Django API
//     axios.get('http://localhost:8000/admin/')
//       .then((response) => {
//         setCertificates(response.data);
//         console.log(response)
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Certificates</h2>
//       <ul>
//         {certificates.map((certificate) => (
//           <li key={certificate.id}>
//             <p>Name: {certificate.name}</p>
//             <p>Email: {certificate.email}</p>
//             <p>Event Name: {certificate.event_name}</p>
//             <a href={`http://localhost:8000${certificate.file}`} target="_blank" rel="noopener noreferrer">
//               Download PDF
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// export default CertificateList;

// src/components/CertificateList.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    reg_no: "",
    name: "",
    email: "",
    event_name: "",
    summary_event: "",
  });

  useEffect(() => {
    // Fetch certificates from Django API when the component mounts
    axios.get("localhost:8000/certificates/").then((response) => {
      setCertificates(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Post a new certificate to Django API when the form is submitted
    axios.post("/api/certificates/", formData).then((response) => {
      setCertificates([...certificates, response.data]);
      // Clear the form fields after submission
      setFormData({
        reg_no: "",
        name: "",
        email: "",
        event_name: "",
        summary_event: "",
      });
    });
  };

  return (
    <Container maxW="xl">
      <Stack spacing={4} mt={4}>
        <Center>
          <Text fontSize="xl">Certificates</Text>
        </Center>
        <Stack direction="row">
          <FormControl>
            <FormLabel>Registration Number</FormLabel>
            <Input
              type="text"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
            />
          </FormControl>
          {/* Add similar FormControls for other fields */}
        </Stack>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Add Certificate
        </Button>
        <Center>
          <Box>
            {certificates.map((certificate) => (
              <div key={certificate.id}>
                <Text>{certificate.name}</Text>
                {/* Display other certificate details */}
              </div>
            ))}
          </Box>
        </Center>
      </Stack>
    </Container>
  );
}

export default CertificateList;
