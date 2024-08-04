import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // שימוש ב-useNavigate

const Conditions = () => {
  const navigate = useNavigate(); // יצירת אובייקט ניווט

  const handleHomeClick = () => {
    navigate('/'); // ניווט לדף הבית
  };

  const handleContinueShoppingClick = () => {
    navigate('/products'); // ניווט לדף המוצרים
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        תנאים והגבלות
      </Typography>
      <Typography variant="body1" paragraph>
        ברוך הבא לחנות שלנו! אנא קרא את התנאים וההגבלות לפני הרכישה.
      </Typography>
      <Typography variant="body1" paragraph>
        1. כל המוצרים כפופים למדיניות החזרת מוצרים.
      </Typography>
      <Typography variant="body1" paragraph>
        2. תשלום יתקבל רק באמצעות כרטיסי אשראי מאושרים.
      </Typography>
      <Typography variant="body1" paragraph>
        3. המשלוח יתבצע תוך 3-5 ימי עסקים.
      </Typography>
      {/* ... הוסף עוד פרטים לפי הצורך */}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>

      <Button variant="contained" color="primary" onClick={handleHomeClick}>
        חזרה לדף הבית
      </Button>
      <Button variant="contained" color="secondary" onClick={handleContinueShoppingClick} style={{ marginLeft: '10px' }}>
        המשך קנייה
      </Button>
      </Box>

    </Container>
  );
};

export default Conditions;
