import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FooterComponent } from './Footer';

export function Layout() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" style={{ flex: 1 }}>
        <Outlet />
      </Box>
      <FooterComponent />
    </Box>
  );
}
