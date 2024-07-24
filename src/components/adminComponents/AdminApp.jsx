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
export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  //לעטוף את קטע הקוד ב-TypeScript ב-/** */ כדי ש-JSX ידע לטפל בו כראוי
  /**
   * @type {{
  *  open?: boolean
  * }}
  */
  ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -DrawerWidth,
      ...(open && {
          transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
      }),
  })
);

export default function AdminApp() {
    const [open, setOpen]=useState(true);
//  backgroundColor: Colors.background, height: '100vh'
    return (
        <>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AdminAppbar/>
            <Main open={open}>
                <Outlet></Outlet>
            </Main>
            <NavDrawer open={open} setOpen={setOpen}/>
            
        </Box>
        </>
    )
}