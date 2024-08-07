import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScopedCssBaseline, Tooltip, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from "../styles/themeStyle";
import { AppBar, Toolbar, Typography, Button, useTheme, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from "../IMG/logo1.png";
import Nav from './nav';
import CartIcon from './CartIcon';
import { AppbarHeader } from '../styles/headerStyle';
import PersonIcon from '@mui/icons-material/Person';
import Search from './Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoritesList from './Favorites';

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const logedUser = useSelector(state => state.user.logedUser);


  //פונקציה שכאשר המסך קטן התפריט יהיה כלפי מטה
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  // State to manage whether the user is logged in
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  // const handleLogout = () => {
  // Implement your logout logic here
  //   setIsLoggedIn(false);
  // };
  return (

    <AppBar position="fixed" sx={{ justifyContent: 'space-between', padding: '7px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ display: 'flex' }} >
        <img style={{ width: 100, height: 50, marginTop: 1 }}
          className='image'
          src={logo} alt="logo" />
        <Search fromNavBar={true}></Search>

        <Tooltip title="המוצרים שאני אוהב">
          <IconButton edge="end" component={Link} to="/favorite">
            <FavoriteIcon color='secondary' />
          </IconButton>
        </Tooltip>

      </div>

      <Nav />
      <div style={{ display: 'flex', alignItems: 'center' }}>

        {/* // isLoggedIn ? (
          //   <Tooltip title="התנתקות">
          //     <IconButton edge="end" color="inherit" component={Link} to="/signIn" label="התנתק">
          //       <LogoutIcon style={{ fontSize: 40 }} />
          //     </IconButton>
          //   </Tooltip>
          // ) : */}
        {logedUser?.tipeUser == "admin" && <Tooltip title=" מנהל מערכת">
          <Link to="/admin" style={{ color: "white" }}>
            <AdminPanelSettingsIcon style={{ fontSize: 40 }} />
          </Link>
        </Tooltip>}
        {(
          <Tooltip title="התחברות">
            <IconButton edge="end" color="inherit" component={Link} to="/signIn">
              <PersonIcon style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="עגלת קניות">
          <Link to="/cart" style={{ color: "white" }}>
            <CartIcon style={{ fontSize: 40 }} />
          </Link>
        </Tooltip>


        <AppbarHeader>Shine's Stock</AppbarHeader>
      </div>
    </AppBar>
  );
};

export default Header;


