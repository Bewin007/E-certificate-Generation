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
import CertificateList from './component/CertificateList';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Routes>
          <Route path="create" element={<CreateCertificate />} />
          <Route path="list" element={<CertificateList />} />
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
