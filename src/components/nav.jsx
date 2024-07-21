import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  AppbarActionIcons,
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../styles/headerStyle";
import { styled } from '@mui/system';

const pages = [
  {name:"דף הבית", url:'/'},
    {name:"מוצרים", url:'/products'},
  {name:"צור קשר", url:'/contact'},
  {name:"אודות", url:'/about'}
];

const StyledBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: { xs: 'none', md: 'flex' },
  gap: 3,
  position: 'fixed',
  top: 0,
  width: '100%',
  backgroundColor: '#333',
  zIndex: 1000,
  padding: '10px 0',
}));

const Nav = () => {
  const navigate = useNavigate();
  const handleClickNavigate = (url) => {
    console.log(url);
    navigate(url);
  }
  return (
    <div >
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}, gap: 3 }}>
       {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}> */}
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleClickNavigate(page.url)}
                sx={{ my: 1, color: 'white', display: 'block', fontSize: '18px',
                  //  marginRight: '5px',
                  // fontFamily: '"Montez", "cursive"',
                 }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
      </div>
  );

};

export default Nav;


