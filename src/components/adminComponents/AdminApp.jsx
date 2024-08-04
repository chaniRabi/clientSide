import { AppBar, Box, CssBaseline } from "@mui/material";
import { duration, easing, styled } from '@mui/material/styles'
import { Colors, DrawerWidth } from "../../styles/adminTheme";
import { Outlet, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../../App";
import { useState } from "react";
import { padding } from "polished";
import NavDrawer from "./NavDrawer"
import AdminAppbar from "./AdminAppbar";

//קונטיינר לצורך הנאב באר
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -DrawerWidth,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
      }),
      position: 'relative',
    }),
  );

export default function AdminApp() {
    const [open, setOpen]=useState(true);
//  backgroundColor: Colors.background, height: '100vh'
    return (
        <Box sx={{
          display: 'flex',
          background: Colors.background,
          height:'100vh'
          }}>
            <CssBaseline/>
            {/* <AdminAppbar/> */}
            {/* <NavDrawer open={open} setOpen={setOpen}/> */}

            <Main open={open}>
                <Outlet></Outlet>
            </Main>
            {/* <AdminAppbar/>  */}
            <NavDrawer open={open} setOpen={setOpen}/>
        </Box>
    )
}