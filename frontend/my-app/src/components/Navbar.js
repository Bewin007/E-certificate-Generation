import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from React Router
import { Box, Button, Input, Select, Stack, Text, Alert, AlertIcon,Image } from '@chakra-ui/react';

function Viewcertificate() {
  const location = useLocation(); // Get the location object
    let a =location.state.data
    console.log(a)
    const domain = 'http://localhost:8000/';
  return (
    <Box>
        <Image src={`${domain}${a}`} alt="Organization Logo" />
    </Box>
  );
}

export default Viewcertificate;
