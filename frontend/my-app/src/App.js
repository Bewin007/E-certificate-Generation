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

import ManipulateCertificate from './component/ManipulateCertificate';
import CreateCertificate from './component/CreateCertificate';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CertificateList from './component/CertificateList';
import OrganizationForm from './component/OrganizationForm'
import CertificateForm from './component/CertificateForm'
import CertificateList from './admin/CertificateList'
import AddCertificate from './admin/AddCertificate '
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Routes>
          <Route path="create" element={<AddCertificate />} />
          <Route path="list" element={<CertificateList />} />
          <Route path="org" element={<OrganizationForm />} />
          <Route path="certificate" element={<CertificateForm />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
