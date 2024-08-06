




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
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


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
    name: Yup.string().required('שם המוצר הוא שדה חובה'),
    price: Yup.number().required('מחיר הוא שדה חובה').positive('המחיר חייב להיות מספר חיובי'),
    description: Yup.string().optional()
});



export default function AdminProducts() {
    const products = useSelector(state => state.product.products);
    console.log("!!!!", products);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // הוספת סטייט לחיפוש
    // const [isEdit, setIsEdit] = useState(false);
    // const [editProduct, setEditProduct] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: '',
        price: 0,
        quantity: 0,
        categoryId: 9,
        description: '',
        image: '',
        id: 0
    });

    // פונקציה לשליחת הטופס
    const handleSubmit = async (values, { resetForm }) => {
        console.log("submit");
        if (initialValues.id != 0) {
            console.log("update");
            try {
                const savedProduct = await UpdateProduct(values.id, values);
                dispatch(editProduct(savedProduct));
                resetForm(); // ניקוי הטופס לאחר הצלחה
                setOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "המוצר עודכן ברשימת המוצרים",
                    showConfirmButton: false,
                    customClass: {
                        popup: 'custom-swal'
                    }
                });
            } catch (error) {
                console.error('Failed to edid the product:', error);
            }
        }

        else {
            console.log("add");
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

    // const handleAddProduct = () => {
    //     console.log("הוסף מוצר")
    // }

    const handelProductEdit = (product) => {
        console.log("מוצר", product)
        setInitialValues(product);
        setOpen(true);
    }

    const handelDeletProduct = async (id) => {
        Swal.fire({
            title: "בטוח למחוק מוצר מהרשימה ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "כן, מחק מוצר מהרשימה!"
        }).then((result) => {
            if (result.isConfirmed) {
                RemoveProduct(id).then(res => {
                    dispatch(deleteProduct(res))
                    Swal.fire({
                        title: "בוצע בהצלחה",
                        text: "המוצר נמחק מרשימת המוצרים!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }).catch(err => console.log(err));
            }
        });
    }

    // const handelProductEditOpenDialog = (p) => {
    //     setEditProduct(p);
    //     setIsEdit(true);
    //     handleClickOpen();
    // }
    // סינון מוצרים לפי מחרוזת החיפוש
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* <AdminEditProductDialog open={open} handleClose={handleClose} isEdit={isEdit} editProduct={editProduct}/> */}
            <Typography sx={{ md: 1 }} variant="h4">מוצרים</Typography>
            <Button startIcon={<AddIcon />} variant='contained' color='secondary'
                onClick={handleClickOpen}
            >הוסף מוצר </Button>
            {/* <Search /> */}
            {/* שדה חיפוש */}
            <TextField
                label="חיפוש מוצר"
                variant="outlined"
                fullWidth
                sx={{ my: 2 }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
            />

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
                        {/* {products?.map(p => */}
                        {filteredProducts.map(p =>

                            <TableRow key={p.id}>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>{p.quantity}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handelProductEdit(p)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handelDeletProduct(p.id)}>
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
                {initialValues.id != 0 ? <DialogTitle>עריכת מוצר</DialogTitle> :
                    <DialogTitle>הוסף מוצר</DialogTitle>
                }

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ dirty, isValid, getFieldProps }) => (
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
                                            name="quantity"
                                            label="כמות במלאי"
                                            required
                                            fullWidth
                                            variant="outlined"
                                            helperText={<ErrorMessage name="quantity" />}
                                            error={Boolean(<ErrorMessage name="quantity" />)}
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
                                {
                                    getFieldProps('id').value !== 0 ? (
                                        <Button
                                            // disabled={!dirty || isValid}
                                            type="submit" variant="contained" color="primary">
                                            שמור עריכת מוצר
                                        </Button>
                                    ) : (
                                        <Button type="submit" variant="contained" color="primary" disabled={!dirty || !isValid}>
                                            הוסף מוצר
                                        </Button>
                                    )
                                }
                                {/* <Button type="submit" variant="contained" color="primary" disabled={!dirty || !isValid}>
                                            הוסף מוצר
                                        </Button> */}


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