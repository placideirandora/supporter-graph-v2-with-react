import * as React from 'react';
import { useState } from 'react';
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Box,
  Avatar,
  Paper,
} from '@mui/material';
import { mockUsers } from '../data/mockUser';
import { mockSupporterGraphDataMap } from '../data/mockSupporterGraphDataMap';
import SupporterGraphMUI from './SupporterGraphMUI';

const sequences = Object.keys(mockSupporterGraphDataMap);
const dates = ['2025-10-24', '2025-10-23'];

const GraphDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState('user1');
  const [selectedSequence, setSelectedSequence] = useState(sequences[0]);
  const [selectedDay, setSelectedDay] = useState(dates[0]);

  const user = mockUsers.find(u => u.id === selectedUserId);
  const rawData = mockSupporterGraphDataMap[selectedSequence]?.[selectedDay];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Top Row: Title + User Switch */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Welcome, {user?.name}</Typography>
        <FormControl size="small">
          <Select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            {mockUsers.map(u => (
              <MenuItem key={u.id} value={u.id}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar>{u.avatar}</Avatar>
                  {u.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Summary Section */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Paper elevation={2} sx={{ p: 2, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom align="center">
            Summary
          </Typography>
          <Box display="flex" justifyContent="space-around">
            <Typography>Sequence: {selectedSequence}</Typography>
            <Typography>Date: {selectedDay}</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Dropdowns */}
      <Box display="flex" justifyContent="center" gap={4} mb={3}>
        {/* SEQUENCE DROPDOWN */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sequence</InputLabel>
          <Select value={selectedSequence} label="Sequence" onChange={(e) => setSelectedSequence(e.target.value)}>
            {sequences.map(seq => <MenuItem key={seq} value={seq}>{seq}</MenuItem>)}
          </Select>
        </FormControl>

        {/* DATE DROPDOWN */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Day</InputLabel>
          <Select value={selectedDay} label="Day" onChange={(e) => setSelectedDay(e.target.value)}>
            {dates.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {/* Graph */}
      <Box display="flex" justifyContent="center">
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          {user?.canViewGraph ? (
            rawData ? (
              <SupporterGraphMUI rawData={rawData} />
            ) : (
              <Alert severity="warning">No data available for this selection.</Alert>
            )
          ) : (
            <Alert severity="error">Access denied. You need special permission to view this graph.</Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default GraphDashboard;
