import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

// import ManipulateCertificate from './component/ManipulateCertificate';
import AdminForm from './admin/AdminForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CertificateList from './component/CertificateList';
// import OrganizationForm from './component/OrganizationForm'
// import CertificateForm from './component/CertificateForm'
import OrganizationForm from './admin/OrganizationForm'
import Certificate from './components/Certificate'
import Viewcertificate from './components/viewcertificate'
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Routes>
          <Route index element={<Certificate />} />   {/* view for user */}
           <Route path="list" element={<OrganizationForm />}  />   {/* add organization */}
          <Route path="create" element={<AdminForm />} /> {/* create certificate */}
          <Route path="view" element={<Viewcertificate />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
