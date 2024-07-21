import { AppBar, Box } from "@mui/material";
import { duration, easing, styled } from '@mui/material/styles'
import { Colors, DrawerWidth } from "../../styles/adminTheme";
import { BrowserRouter as Router } from "react-router-dom";
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
      marginLeft: `-${DrawerWidth}px`,
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

    return (
        <Box sx={{display: 'flex', background: Colors.background, height: '100vh' }}>
          <AdminAppbar/>
          <NavDrawer open={open} setOpen={setOpen}/>
          
            <Main open={open}>
            
            </Main>
        </Box>
    )
}