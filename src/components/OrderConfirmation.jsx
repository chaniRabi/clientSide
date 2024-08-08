



// import React from 'react';
// import { Box, Typography, Button, Paper } from '@mui/material';

// const OrderConfirmation = ({ orderDetails, onReturnToShop }) => {
//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Paper sx={{ padding: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           תודה על הרכישה!
//         </Typography>
//         <Typography variant="h6" gutterBottom>
//           מספר הזמנה: {orderDetails.orderId}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           ההזמנה שלך בוצעה בהצלחה. תקבל/י דוא"ל עם פרטי ההזמנה וסטטוס האספקה.
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           סיכום ההזמנה:
//         </Typography>
//         <ul>
//           {orderDetails.items.map((item) => (
//             <li key={item.id}>
//               {item.name} - {item.quantity} x {item.price}
//             </li>
//           ))}
//         </ul>
//         <Typography variant="h6" gutterBottom>
//           סה"כ: {orderDetails.totalCost}
//         </Typography>
//         <Button variant="contained" color="primary" onClick={onReturnToShop}>
//           חזור לחנות
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default OrderConfirmation;
