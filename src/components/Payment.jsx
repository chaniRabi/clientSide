import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, TextField, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { AddOrder } from '../utils/order';
import { getTotal } from '../productHelpers';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [errors, setErrors] = useState({});
    const cart = useSelector(state => state.cart.items); // Assuming you have cart in your Redux store
    console.log("cart", cart)
    const loggedUser = useSelector(state => state.user.logedUser);//בשביל שימוש מהסלייס - לזהות את המשתמש ונלקח מסלייס
    const products = useSelector(state => state.product.products);

    const total = getTotal(products, cart)

    const validate = () => {
        const newErrors = {};

        // Validate card number
        if (!cardNumber) newErrors.cardNumber = "מספר כרטיס הוא שדה חובה";
        else if (!/^\d{10}$/.test(cardNumber)) newErrors.cardNumber = "מספר כרטיס חייב להיות לפחות 10 ספרות";
       
        // Validate expiry date
        if (!expiryDate) newErrors.expiryDate = "תוקף הכרטיס הוא שדה חובה";
        else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) newErrors.expiryDate = "תוקף הכרטיס חייב להיות בפורמט MM/YY";
        else {
            const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));
            const currentYear = new Date().getFullYear() % 100; // get last 2 digits of current year
            const currentMonth = new Date().getMonth() + 1;
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiryDate = "תוקף הכרטיס פג";
            }
        }

        // Validate CVV
        if (!cvv) newErrors.cvv = "CVV הוא שדה חובה";
        else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = "CVV חייב להיות 3 או 4 ספרות";
        if (!cardHolderName) newErrors.cardHolderName = "ת.ז. של בעל הכרטיס הוא שדה חובה";
        return newErrors;
    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    // const handlePayment = () => {
    //     const validationErrors = validate();
    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //     } else {
    //         const data = {
    //             userId: loggedUser.id,
    //             totalCost: total,
    //             date: getCurrentDate(),
    //             statusId: 1,
    //             ordersProducts: cart.map(c => {return {...c, product: null}})
    //         }
    //         AddOrder(data).then(res => {
    //             if (res.status === 200) {
    //                 Swal.fire({
    //                     title: "תשלום בוצע בהצלחה!",
    //                     text: `ע"ס ${total} ש"ח`,
    //                     icon: "success"
    //                 });
    //                 setErrors({});
    //             }
    //         });
    //     }
    // };
    const handlePayment = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "עגלה ריקה",
                text: "העגלה שלך ריקה. נא להוסיף מוצרים לעגלה לפני ביצוע התשלום.",
                icon: "warning",
                confirmButtonText: 'OK',
                // You can redirect the user to the shopping page here if needed
                // e.g. window.location.href = '/shop';
            });
            return;
        }


        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const data = {
                userId: loggedUser.id,
                totalCost: total,
                date: getCurrentDate(),
                statusId: 1,
                ordersProducts: cart.map(c => {return {...c, product: null}})
            }
            AddOrder(data).then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "תשלום בוצע בהצלחה!",
                        text: `ע"ס ${total} ש"ח`,
                        icon: "success"
                    });
                    setErrors({});
                }
            });
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
