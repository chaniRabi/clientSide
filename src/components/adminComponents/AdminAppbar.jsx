


import { colors, InputBase, Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Colors, DrawerWidth } from "../../styles/adminTheme";
import { alpha, styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search';



const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${DrawerWidth}px)`,
      marginLeft: `${DrawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 25,
    backgroundColor: Colors.black,
    '&:hover': {
      backgroundColor: '1px solid $(Colors.light)'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // fontSize: '1.25rem',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus':{
          width:'50ch'
        }
      },
    },
  }));

export default function AdminAppbar({open, handleDrawerOpen}) {
    return(
        <AppBar position="fixed" elevation={0} open={open}>
        <Toolbar>
          <IconButton
            color={Colors.black}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {!open && <Typography
          fontWeight={'bold'}
          color={Colors.black} variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    )
}