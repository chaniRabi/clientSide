

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProduct } from '../features/productsSlice';
// import { Card, CardContent, CardMedia, Typography, CircularProgress, Alert } from '@mui/material';

// //הגדרת קומפוננטה פונקציונלית בשם SingleProduct, המקבלת productId כ-prop.
// const SingleProduct = ({ productId }) => {
//     //שימוש ב-hooks של Redux
//   const dispatch = useDispatch();//מספק גישה לפונקציית dispatch של Redux, המאפשרת שליחה של פעולות.
//     //מאפשר גישה למצב (state) של Redux.
//     //כדי לקבל את הנתונים הרלוונטיים מ-state:
//   const product = useSelector((state) => state.products.product);//האובייקט המייצג את המוצר הנוכחי
//   const loading = useSelector((state) => state.products.loading);//משתנה בוליאני המציין אם הנתונים נטענים
//   const error = useSelector((state) => state.products.error);//משתנה שמכיל את הודעת השגיאה אם התרחשה בעיה בטעינת הנתונים

//   //שימוש ב-useEffect לטעינת הנתונים
//   //מופעל כאשר הקומפוננטה נטענת לראשונה או כאשר dispatch או productId משתנים
//   useEffect(() => {
//     dispatch(fetchProduct(productId));//שליחת פעולה (action) ל-Redux כדי לטעון את פרטי המוצר לפי ה-id.
//   }, [dispatch, productId]);

//   //טיפול במצבי טעינה ושגיאה
//   if (loading) return <CircularProgress />;//אם הנתונים נמצאים בטעינה (loading הוא true), הקומפוננטה מחזירה אינדיקטור טעינה מעגלי (CircularProgress).
//   if (error) return <Alert severity="error">{error}</Alert>;//אם יש שגיאה (error לא ריק), הקומפוננטה מחזירה הודעת שגיאה (Alert).
// console.log("!!!!",product.image);
//   //הצגת פרטי המוצר
//   return (
//     // Card: מגדיר את מבנה הכרטיס עם עיצוב מסוים (רוחב מרבי של 345 ופער של 2).
//     <Card sx={{ maxWidth: 345, margin: 2 }}>
//         {/* CardMedia: מציג את תמונת המוצר עם פרטים כמו אלטרנטיבי (alt), גובה, והקישור לתמונה. */}
//       <CardMedia   
//         component="img"
//         alt={product.name}
//         height="140"
//         image={product.image}
//       />
//       {/* CardContent: מכיל את תוכן הכרטיס. */}
//       <CardContent>
//       {/* Typography: משמש לעיצוב הטקסטים השונים: */}
//         <Typography gutterBottom variant="h5" component="div"> 
//           {product.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.description}
//         </Typography>
//         <Typography variant="body1" color="text.primary">
//           מחיר: ש"ח{product.price}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };
// // ייצוא הקומפוננטה
// export default SingleProduct;

