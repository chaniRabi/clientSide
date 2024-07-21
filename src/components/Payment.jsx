import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, TextField, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { AddOrder } from '../utils/order';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [errors, setErrors] = useState({});
    const cart = useSelector(state => state.cart.items); // Assuming you have cart in your Redux store

    const total = Array.isArray(cart) ? cart.reduce((acc, item) => acc + (item.price * item.productInCarts[0]?.amount), 0).toFixed(2) : '0.00';

    const validate = () => {
        const newErrors = {};
        if (!cardNumber) newErrors.cardNumber = "מספר כרטיס הוא שדה חובה";
        else if (!/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "מספר כרטיס חייב להיות 16 ספרות";
        if (!expiryDate) newErrors.expiryDate = "תוקף הכרטיס הוא שדה חובה";
        else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) newErrors.expiryDate = "תוקף הכרטיס חייב להיות בפורמט MM/YY";
        if (!cvv) newErrors.cvv = "CVV הוא שדה חובה";
        else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = "CVV חייב להיות 3 או 4 ספרות";
        if (!cardHolderName) newErrors.cardHolderName = "ת.ז. של בעל הכרטיס הוא שדה חובה";
        return newErrors;
    };

    const handlePayment = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            AddOrder();
            Swal.fire({
                title: "תשלום בוצע בהצלחה!",
                text: `ע"ס ${total} ש"ח`,
                icon: "success"
            });
            setErrors({});
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    פרטי תשלום
                </Typography>
                <form noValidate autoComplete="off">
                    <Box mb={2}>
                        <TextField
                            label="מספר כרטיס"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="תוקף (MM/YY)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            error={!!errors.expiryDate}
                            helperText={errors.expiryDate}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="CVV"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            error={!!errors.cvv}
                            helperText={errors.cvv}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="ת.ז. של בעל הכרטיס"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            error={!!errors.cardHolderName}
                            helperText={errors.cardHolderName}
                        />
                    </Box>
                </form>
                <Typography variant="h6" gutterBottom>
                    סה"כ לתשלום: {total} ש"ח
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={handlePayment}>
                    לחץ לביצוע התשלום
                </Button>
            </CardActions>
        </Card>
    );
};

export default Payment;
