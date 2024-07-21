


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { sendPasswordResetEmail } from '../features/userSlice'; // פעולה לשליחת מייל לשחזור סיסמה

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('כתובת האימייל אינה חוקית');
      return;
    }

    dispatch(sendPasswordResetEmail(email))
      .then(response => {
        if (response.error) {
          setError('שגיאה בשליחת מייל לשחזור סיסמה');
        } else {
          setSuccess('מייל לשחזור סיסמה נשלח בהצלחה');
        }
      })
      .catch(err => setError('שגיאה בשליחת מייל לשחזור סיסמה'));
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '150px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        שחזור סיסמה
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="כתובת מייל"
            name="email"
            type="email"
            fullWidth
            onChange={handleChangeEmail}
            value={email}
          />
        </Grid>
      </Grid>
      <Button
        type="button"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        שלח קישור לשחזור סיסמה
      </Button>
      
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
    </Container>
  );
};

export default ForgotPassword;
