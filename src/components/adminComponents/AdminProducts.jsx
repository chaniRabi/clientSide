




import { Box, Button, CircularProgress, colors, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { Colors } from '../../styles/adminTheme';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setProducts } from '../../features/productsSlice';
import { GetProducts } from '../../utils/product';
import AdminEditProductDialog from './AdminEditProductDialog';

//פונקציה שתייבא את כל המוצרים
// const products =[{
//     _id: 1345678,
//     name: 'מדבקה',
//     price: 1.90,
//     quantity: 1,
//     description: 'מדבקות צבעוניות',
//     categoryId: 2 ,
// }]

//סכמת ולידציה
const validationSchema = Yup.object().shape({

});



export default function AdminProducts() {
    console.log("!!!!")
    const products = useSelector(state => state.product.products);
    console.log("!!!!", products);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editProduct, setEditProduct] = useState(false);

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
        console.log("ערוך", product);
    }

    const handelDeletProduct = (product) => {
        console.log("מחק", product)
    } 

    const handelProductEditOpenDialog = (p) => {
        setEditProduct(p);
        setIsEdit(true);
        handleClickOpen();
    }
   
    return (
        <>
            <AdminEditProductDialog open={open} handleClose={handleClose} isEdit={isEdit} editProduct={editProduct}/>
            <Typography sx={{ md: 1 }} variant="h4">מוצרים</Typography>
            <Button startIcon={<AddIcon />} variant='contained'
                onClick={handleClickOpen}
            >הוסף מוצר</Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>שם</TableCell>
                            <TableCell>מחיר</TableCell>
                            <TableCell>כמות</TableCell>
                            <TableCell>תיאור</TableCell>
                            <TableCell>תמונה</TableCell>
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
                                    <IconButton onClick={()=> handelProductEditOpenDialog(p)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={()=> handelDeletProduct(p)}>
                                        <DeleteForeverIcon sx={{ color: Colors.danger}} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}