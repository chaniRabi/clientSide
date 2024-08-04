




import { Box, Button, CircularProgress, colors, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { Colors } from '../../styles/adminTheme';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setProducts, addProduct, deleteProduct, editProduct } from '../../features/productsSlice';
import { GetProducts, AddProduct, RemoveProduct, UpdateProduct } from '../../utils/product';
import Swal from 'sweetalert2';
import Search from '../Search';



//פונקציה שתייבא את כל המוצרים
// const products =[{
//     _id: 1345678,
//     name: 'מדבקה',
//     price: 1.90,
//     quantity: 1,
//     description: 'מדבקות צבעוניות',
//     categoryId: 2 ,
// }]


// סכמת וולידציה
const validationSchema = Yup.object({
    Name: Yup.string().required('שם המוצר הוא שדה חובה'),
    Price: Yup.number().required('מחיר הוא שדה חובה').positive('המחיר חייב להיות מספר חיובי'),
    Description: Yup.string().optional()
});



export default function AdminProducts() {
    console.log("!!!!")
    const products = useSelector(state => state.product.products);
    console.log("!!!!", products);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [initialValues, setInitialValues] = useState({
        Name: '',
        Price: 0,
        Quantity: 0,
        CategoryId: 9,
        Description: '',
        Image: '',
        Id: 0
    });

    // פונקציה לשליחת הטופס
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const savedProduct = await AddProduct(values); // השתמש בפונקציה AddProduct
            if (savedProduct) {
                dispatch(addProduct(savedProduct));
                resetForm(); // ניקוי הטופס לאחר הצלחה
                setOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "המוצר נוסף לרשימת המוצרים",
                    showConfirmButton: false,
                    customClass: {
                        popup: 'custom-swal'
                    }
                });
            }

        } catch (error) {
            console.error('Failed to save the product:', error);
        }
    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const GetProductsList = async () => {
        const data = await GetProducts();
        dispatch(setProducts(data));
    }

    useEffect(() => {
        GetProductsList();
    }, [dispatch, products.length]);

    //טיפול בתרחיש שבו המוצרים עדיין נשלפים מה-API
    //מאפשר להציג הודעת טעינה לפני שליפת המוצרים ועיבודם במסך
    if (products?.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ p: 4 }}>
                <CircularProgress size={30} sx={{ mr: 5 }} />
                <Typography variant="h4" sx={{ mr: 5 }}>טוען מוצרים</Typography>
            </Box>
        );
    }

    const handleAddProduct = () => {
        console.log("הוסף מוצר")
    }

    const handelProductEdit = (product) => {
        setInitialValues(product);
        setOpen(true);
    }

    const handelDeletProduct = (product) => {
        console.log("מחק", product)
    }

    // const handelProductEditOpenDialog = (p) => {
    //     setEditProduct(p);
    //     setIsEdit(true);
    //     handleClickOpen();
    // }

    return (
        <>
            {/* <AdminEditProductDialog open={open} handleClose={handleClose} isEdit={isEdit} editProduct={editProduct}/> */}
            <Typography sx={{ md: 1 }} variant="h4">מוצרים</Typography>
            <Button startIcon={<AddIcon />} variant='contained' color='secondary'
                onClick={handleClickOpen}
            >הוסף מוצר </Button>
            <Search />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>שם</TableCell>
                            <TableCell>מחיר</TableCell>
                            <TableCell>כמות</TableCell>
                            <TableCell>תיאור</TableCell>
                            <TableCell>פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map(p =>
                            <TableRow key={p.id}>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>{p.quantity}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handelProductEdit(open)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handelDeletProduct(p)}>
                                        <DeleteForeverIcon sx={{ color: Colors.danger }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <AdminAddProduct/> */}
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
                    {({ dirty, isValid, getFieldProps }) => (
                        <Form>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="Name"
                                            label="שם המוצר" // תיקון תווית השדה
                                            required
                                            fullWidth
                                            variant="outlined"
                                            helperText={<ErrorMessage name="Name" />}
                                            error={Boolean(<ErrorMessage name="Name" />)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="Price"
                                            label="מחיר"
                                            type="number"
                                            required
                                            fullWidth
                                            variant="outlined"
                                            helperText={<ErrorMessage name="Price" />}
                                            error={Boolean(<ErrorMessage name="Price" />)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="Quantity"
                                            label="כמות במלאי"
                                            required
                                            fullWidth
                                            variant="outlined"
                                            helperText={<ErrorMessage name="Quantity" />}
                                            error={Boolean(<ErrorMessage name="Quantity" />)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="Description"
                                            label="תיאור"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            variant="outlined"
                                            helperText={<ErrorMessage name="Description" />}
                                            error={Boolean(<ErrorMessage name="Description" />)}
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                {
                                    getFieldProps('Id').value !== 0 ? (
                                        <Button
                                            disabled={!dirty || isValid}
                                            type="submit" variant="contained" color="primary">
                                            שמור עריכת מוצר
                                        </Button>
                                    ) : (
                                        <Button type="submit" variant="contained" color="primary" disabled={!dirty || !isValid}>
                                            הוסף מוצר
                                        </Button>
                                    )
                                }
                                <Button
                                    onClick={() => setOpen(false)}
                                    autoFocus>ביטול</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}