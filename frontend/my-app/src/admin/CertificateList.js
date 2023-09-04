import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Heading, Stack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Fetch certificates from your Django API when the component mounts
    axios.get('http://localhost:8000/certificates/')
      .then((response) => {
        setCertificates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching certificates:', error);
      });
  }, []);

  return (
    <Center>
      <Box mt="4">
        <Heading as="h1" mb="4">Certificate List</Heading>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Registration No</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Event Name</Th>
              <Th>Summary Event</Th>
              <Th>Organization</Th>
            </Tr>
          </Thead>
          <Tbody>
            {certificates.map((certificate) => (
              <Tr key={certificate.id}>
                <Td>{certificate.reg_no}</Td>
                <Td>{certificate.name}</Td>
                <Td>{certificate.email}</Td>
                <Td>{certificate.event_name}</Td>
                <Td>{certificate.summary_event}</Td>
                <Td>{certificate.organization.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};

export default CertificateList;
