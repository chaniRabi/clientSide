


import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import { Colors, DrawerWidth } from '../../styles/adminTheme';
import { colors, styled, Typography, useTheme } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AdminAppbar from './AdminAppbar'
import { useState } from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MyListItemButton = ({ selected, icon, text, label,  handleNavbarItemClicked }) => {
  return (
    <ListItemButton
      // כאשר לוחצים על הכפתור יופיע טקסט שיראה על מה לחצו
      onClick={() => handleNavbarItemClicked(text)}
      sx={{
        ...(selected && {
          background: Colors.white,
          borderRadius: 2,
          fontWeight: 'bold',
          color: Colors.black,
        }),
      }}
    >
      <ListItemIcon sx={{ color: selected && Colors.primary }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export default function NavDrawer({ open, setOpen }) {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(''); //  
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavbarItemClicked = (item) => {
    setSelectedItem(item);//משמש לצורך המעקב אחרי הפריט שנבחר בניווט
    navigate(item);
  };

  return (
    <>
    {/* <Box sx={{ display: 'flex' }}>
      <CssBaseline /> */}
      {/* <AdminAppbar open={open} handleDrawerOpen={handleDrawerOpen} /> */}
      <Drawer
        sx={{
          width: DrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DrawerWidth,
            boxSizing: 'border-box',
            backgroundColor: Colors.background
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        {open && 
        <Typography
          fontWeight={'bold'}
          color={Colors.light_gray} variant="h6" noWrap component="div">
            ניהול מערכת 
          </Typography>}
           <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
           </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"dashboard"}
              label = {"לוח ניהול"}
              icon={<DashboardIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('dashboard')}
            />
          </ListItem> 
           <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"products"}
              label = {"מוצרים"}
              icon={<ReceiptIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('products')}
            />
          </ListItem>
          <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"message"}
              label = {"הודעות"}
              icon={<EmailIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('message')}
            />
          </ListItem>
          <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"customers"}
              label = {"לקוחות"}
              icon={<GroupsIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('customers')}
            />
          </ListItem>
          <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"Settings"}
              label = {"הגדרות"}
              icon={<SettingsIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('Settings')}
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    {/* </Box> */}
    </>
  );
}







