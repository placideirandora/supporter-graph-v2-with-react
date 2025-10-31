import * as React from 'react';
import { CssBaseline, Box } from '@mui/material';
import GraphDashboard from './components/GraphDashboard';
import Demo from './components/Demo';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw', // ✅ Full viewport width
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            backgroundColor: '#ffffff',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <GraphDashboard />
          <Demo />
        </Box>
      </Box>
    </>
  );
}

export default App;
