import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AdminAddProduct from './AdminAddProduct';
import { List, ListItem, ListItemText } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AdminEditProductDialog({open, handleClose, order}) {

  return (
    <>
    {/* <AdminAddProduct/> */}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* .... */}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          פרטי הזמנה
        </DialogTitle>
        {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        <DialogContent dividers>
          {/* <Typography gutterBottom>
           {JSON.stringify(order)}
          </Typography> */}
          <List>
          {order.ordersProducts.map(orderProduct => (
            <React.Fragment key={orderProduct.id}>
              <ListItem>
                <ListItemText
                  primary={orderProduct.product?.name}
                  secondary={`כמות: ${orderProduct.amount} | מחיר: ${(orderProduct.product?.price) * orderProduct.amount} ש"ח`}
                  // secondary={`${item.price} ש"ח`}
                  sx={{ ml: 2, textAlign:'right' }}
                />
              </ListItem>
              </React.Fragment>))}
            </List>
            <Typography>סהכ לתשלום{order?.totalCost}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
          <Button autoFocus onClick={handleClose}>
ביטול          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}