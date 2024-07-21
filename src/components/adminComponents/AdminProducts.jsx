




import { Button, colors, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { Colors } from '../../styles/adminTheme';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';

//פונקציה שתייבא את כל המוצרים
const products =[{
    _id: 1345678,
    name: 'מדבקה',
    price: 1.90,
    quantity: 1,
    description: 'מדבקות צבעוניות',
    categoryId: 2 ,
}]

//סכמת ולידציה
const validationSchema = Yup.object().shape({

});



export default function AdminProducts() {
   
    const handleAddProduct = () => {
        console.log("הוסף מוצר")
    }
   
    const handelProductEdit = (product) => {
        console.log("ערוך", product)
    }

    const handelDeletProduct = (product) => {
        console.log("מחק", product)
    } 
   
    return (
        <>
            <Typography sx={{ md: 1 }} variant="h4">מוצרים</Typography>
            <Button startIcon={<AddIcon />} variant='contained'
                onClick={handleAddProduct}
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
                        {products.map(p =>
                            <TableRow key={p.id}>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>{p.quantity}</TableCell>
                                <TableCell>{p.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={()=> handelProductEdit(p)}>
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