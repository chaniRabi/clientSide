


//עמוד חשבון משתמש

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from '../actions/userActions';
import { TextField, Typography, Paper, Button } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(2),
//     margin: 'auto',
//     maxWidth: 600,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const AccountPage = () => {
  // const classes = useStyles();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [password, setPassword] = useState('');

  const handleUpdate = () => {
    // Update user information in Redux state
    dispatch(updateUser({ name, email, address }));
    alert('Account information updated successfully!');
  };

  return (
    <Paper>
      <Typography variant="h5" component="h3">
        Account Information
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
      >
        Update Account
      </Button>
    </Paper>
  );
};

export default AccountPage;