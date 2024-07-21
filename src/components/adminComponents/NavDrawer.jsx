


import * as React from 'react';
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
// import Appbar from '../adminComponents/Appbar';
import { styled, Typography, useTheme } from '@mui/material';
import {useNavigate} from 'react-router-dom';
// import Appbar from './Appbar'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MyListItemButton = ({ selected, icon, text, handleNavbarItemClicked }) => {
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
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default function NavDrawer({ open, setOpen }) {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = React.useState(''); //  
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavbarItemClicked = (item) => {
    setSelectedItem(item);
    navigate(item);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <Appbar open={open} handleDrawerOpen={handleDrawerOpen} /> */}
      <Drawer
        sx={{
          width: DrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DrawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        {open && <Typography
          fontWeight={'bold'}
          color={Colors.black} variant="h6" noWrap component="div">
            Admin 
          </Typography>}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"לוח ניהול"}
              icon={<DashboardIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('לוח ניהול')}
            />
          </ListItem> */}
          {/* <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"מוצרים"}
              icon={<ReceiptIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('products')}
            /> */}
             <ListItem sx={{ display: 'block' }} onClick={()=>navigate("./products")}><ListItemText primary="מוצרים"/><ListItem/>
           
            
          </ListItem>
          {/* <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"הודעות"}
              icon={<EmailIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('הודעות')}
            />
          </ListItem>
          <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"לקוחות"}
              icon={<GroupsIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('לקוחות')}
            />
          </ListItem>
          <ListItem sx={{ display: 'block' }}>
            <MyListItemButton
              text={"הגדרות"}
              icon={<SettingsIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('הגדרות')}
            />
          </ListItem> */}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}







