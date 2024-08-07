

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { deleteMessage, setMessages } from '../../features/contactSlice';
import {  GetContcts } from '../../utils/lookupUtil'; 

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MessagesList = () => {
  const dispatch = useDispatch();
   const messages = useSelector(state =>  state.contact.messages);
  // console.log(messages);
//const messages=[]
  const loadMessages = async () => {
    const data = await GetContcts();
    console.log(data);
    dispatch(setMessages(data));
  }

  useEffect(() => {
    loadMessages();
  }, [dispatch]);

  if (!messages) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
        <CircularProgress size={30} sx={{ mr: 5 }} />
        <Typography variant="h4" sx={{ mr: 5 }}>טוען הודעות</Typography>
      </Box>
    );
  }

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            הודעות
          </Typography>
          <Paper sx={{ padding: 2 }}>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>שולח</TableCell>
                    <TableCell>נושא</TableCell>
                    <TableCell>תוכן</TableCell>
                    <TableCell>פעולות</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages != null && messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>{message.id}</TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>{message.massages}</TableCell>
                      <TableCell>{message.phone}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteMessage(message.id)}>
                          מחק
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessagesList;
