


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { setName, setEmail, setMessage, clearForm, setIsSubmitted } from '../features/contactSlice';
import axios from 'axios';
import { AddContct } from '../utils/lookupUtil';
import Swal from 'sweetalert2';

export default function ContactForm() {
    const dispatch = useDispatch();
    const { name, email, message, isSubmitted } = useSelector((state) => state.contact);
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = "שם הוא שדה חובה";
        if (!email) {
            newErrors.email = "אימייל הוא שדה חובה";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "אנא הכנס כתובת אימייל חוקית";
        }
        if (!message) newErrors.message = "הודעה היא שדה חובה";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            AddContct({
                name,
                email,
                message
            }).then(res => {
                if (res.status === 200) {
                    dispatch(clearForm());
                    dispatch(setIsSubmitted(true));
                    setErrors({});
                    setSubmissionError(null);
                    Swal.fire('!!')
                }
                else
                    setSubmissionError("Failed to send the message. Please try again.");

            })

        }
    };

    const handleBack = () => {
        dispatch(setIsSubmitted(false));  // חזרה למצב שלפני השליחה
    };

    return (
        <Container maxWidth="sm">
            {isSubmitted ? (
                <Box textAlign="center" mt={4}>
                    <Alert severity="success">
                        הפנייה נשלחה בהצלחה!
                    </Alert>
                    <Button variant="contained" color="primary" onClick={handleBack} sx={{ mt: 2 }}>
                        חזור
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        צור קשר
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="שם"
                                variant="outlined"
                                value={name}
                                onChange={(e) => dispatch(setName(e.target.value))}
                                error={!!errors.name}
                                helperText={errors.name}
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="אימייל"
                                variant="outlined"
                                value={email}
                                onChange={(e) => dispatch(setEmail(e.target.value))}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                label="הודעה"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => dispatch(setMessage(e.target.value))}
                                error={!!errors.message}
                                helperText={errors.message}
                                required
                            />
                        </Box>
                        {submissionError && (
                            <Box mb={2}>
                                <Alert severity="error">{submissionError}</Alert>
                            </Box>
                        )}
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" color="primary" type="submit">
                                שלח
                            </Button>
                        </Box>
                    </form>
                </>
            )}
        </Container>
    );
}