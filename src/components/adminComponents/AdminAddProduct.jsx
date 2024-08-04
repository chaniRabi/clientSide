
//קומפוננטה נפרדת להוסף מוצר
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/productsSlice';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AddProduct } from '../../utils/product';
import Grid from '@mui/material/Unstable_Grid2';

// סכמת וולידציה
const validationSchema = Yup.object({
  name: Yup.string().required('שם המוצר הוא שדה חובה'),
  price: Yup.number().required('מחיר הוא שדה חובה').positive('המחיר חייב להיות מספר חיובי'),
  description: Yup.string().optional()
});

// הקומפוננטה כוללת טופס להוספת מוצר חדש, הכולל שדות לשם המוצר, מחיר ותיאור.
const AdminAddProduct = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch(); // מחבר את הקומפוננטה ל-Redux כדי לשלוח פעולות לסטור
  const [initialValues, setInitialValues] = useState({
    name: '',
    price: 0,
    quantity: 0,
    categoryId: 0,
    description: ''
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // פונקציה לשליחת הטופס
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const savedProduct = await AddProduct(values); // השתמש בפונקציה AddProduct
      dispatch(addProduct(savedProduct));
      resetForm(); // ניקוי הטופס לאחר הצלחה
    } catch (error) {
      console.error('Failed to save the product:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth='lg'
    >
      <DialogTitle>הוסף מוצר</DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // תיקון שגיאת כתיב כאן
      >
        {({ dirty, isValid }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="שם המוצר" // תיקון תווית השדה
                    required
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="name" />}
                    error={Boolean(<ErrorMessage name="name" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="price"
                    label="מחיר"
                    type="number"
                    required
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="price" />}
                    error={Boolean(<ErrorMessage name="price" />)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="description"
                    label="תיאור"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="description" />}
                    error={Boolean(<ErrorMessage name="description" />)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary" disabled={!dirty || !isValid}>
                הוסף מוצר
              </Button>
              <Button
                onClick={() => setOpen(false)}
                autoFocus>ביטול</Button>

            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AdminAddProduct;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addProduct } from '../../features/productsSlice';
// import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import * as Yup from 'yup';
// import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
// import { AddProduct } from '../../utils/product';
// import Grid from '@mui/material/Unstable_Grid2';

// //סכמת וולידציה
// const validationSchema = Yup.object({
//   name: Yup.string().required('שם המוצר הוא שדה חובה'),
//   price: Yup.number().required('מחיר הוא שדה חובה').positive('המחיר חייב להיות מספר חיובי'),
//   description: Yup.string().optional()
// });

// //הקומפוננטה כוללת טופס להוספת מוצר חדש, הכולל שדות לשם המוצר, מחיר ותיאור.
// const AdminAddProduct = () => {
//   const dispatch = useDispatch();//מחבר את הקומפוננטה ל-Redux כדי לשלוח פעולות לסטור
//   // const [name, setName] = useState('');//מאחסן את הערכים הנכנסים לשדות הקלט של הטופס
//   // const [price, setPrice] = useState('');
//   // const [description, setDescription] = useState('');
//   const [initialValues, setInitialValues] = useState({
//     _id: '',
//     name: '',
//     price: '',
//     quantity: '',
//     description: ''
//   });

//   // פונקציה לשליחת הטופס
//   const handleSubmit = async (values, { resetForm }) => {
//     // const newProduct = { name, price, description };
//     // שליחת הנתונים ל-Database
//     try {
//       const savedProduct = await AddProduct(values); // השתמש בפונקציה AddProduct
//       dispatch(addProduct(savedProduct));
//       resetForm(); // ניקוי הטופס לאחר הצלחה
//     } catch (error) {
//       console.error('Failed to save the product:', error);
//     }
//   };


//   return (
//     <Dialog
//       open={true}
//       fullWidth
//       maxWidth='lg'
//     >
//       <DialogTitle>הוסף מוצר </DialogTitle>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSummit={handleSubmit}>
//         {({ dirty, isValid, getFieldProps }) => (
//           <Form>
//             <DialogContent>
//               <Grid container spacing={2}>
//                 <Grid sx={12}>
//                   <Field as={TextField}
//                     name="name"
//                     lable="Name"
//                     required
//                     fullWidth
//                   />
//                   <ErrorMessage name="name">{message =>
//                     <Typography color={'red'}>{message}</Typography>
//                   }
//                   </ErrorMessage>

//                 </Grid>
//               </Grid>
//             </DialogContent>

//             <DialogActions>

//             </DialogActions>
//           </Form>
//         )}
//       </Formik>

//     </Dialog>
//     //   <Box
//     //   component="div"
//     //   sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto', mt: 5 }}
//     // >
//     //   <Typography variant="h4" component="h1" textAlign="center">הוסף מוצר</Typography>
//     //   <Formik
//     //     initialValues={{ name: '', price: '', description: '' }}
//     //     validationSchema={validationSchema}
//     //     onSubmit={handleSubmit}
//     //   >
//     //     {() => (
//     //       <Form>
//     //         <Field
//     //           name="name"
//     //           as={TextField}
//     //           label="שם המוצר"
//     //           variant="outlined"
//     //           fullWidth
//     //           required
//     //           helperText={<ErrorMessage name="name" />}
//     //           error={Boolean(<ErrorMessage name="name" />)}
//     //         />
//     //         <Field
//     //           name="price"
//     //           as={TextField}
//     //           label="מחיר"
//     //           variant="outlined"
//     //           type="number"
//     //           fullWidth
//     //           required
//     //           helperText={<ErrorMessage name="price" />}
//     //           error={Boolean(<ErrorMessage name="price" />)}
//     //         />
//     //         <Field
//     //           name="description"
//     //           as={TextField}
//     //           label="תיאור"
//     //           variant="outlined"
//     //           multiline
//     //           rows={4}
//     //           fullWidth
//     //           helperText={<ErrorMessage name="description" />}
//     //           error={Boolean(<ErrorMessage name="description" />)}
//     //         />
//     //         <Button variant="contained" color="primary" type="submit">
//     //           הוסף מוצר
//     //         </Button>
//     //       </Form>
//     //     )}
//     //   </Formik>
//     // </Box>
//   );
// };

// export default AdminAddProduct;
