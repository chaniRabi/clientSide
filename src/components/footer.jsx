

// import React from 'react';
// import { Container, Grid, Typography, Link } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// export default function Footer() {
//   return (
//     <Container maxWidth="md" component="footer" sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}`, mt: 8, py: [3, 6] }}>
//       <Grid container spacing={4} justifyContent="space-evenly">
//         <Grid item xs={6} sm={3}>
//           <Typography variant="h6" color="textPrimary" gutterBottom>
//             <Link component={RouterLink} to="/about" underline="none">
//               אודות
//             </Link>
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             מידע עלינו ועל החברה.
//           </Typography>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Typography variant="h6" color="textPrimary" gutterBottom>
//             <Link component={RouterLink} to="/contact" underline="none">
//               צור קשר
//             </Link>
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             דרכים ליצירת קשר איתנו.
//           </Typography>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Typography variant="h6" color="textPrimary" gutterBottom>
//             <Link component={RouterLink} to="/privacy" underline="none">
//               פרטיות
//             </Link>
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             המדיניות שלנו בנושא פרטיות.
//           </Typography>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Typography variant="h6" color="textPrimary" gutterBottom>
//             <Link component={RouterLink} to="/terms" underline="none">
//               תנאים
//             </Link>
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             התנאים וההגבלות לשימוש באתר.
//           </Typography>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }



import React from 'react';

import styled from "@emotion/styled";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
  Container,
  Link
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/themeStyle";
import { SubscribeTf, FooterTitle } from "../styles/footerStyle";
import SendIcon from "@mui/icons-material/Send";
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      sx={{
        background: Colors.shaft,
        color: Colors.white,
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: '15px', md: '13px' }
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">
            כתובת: מאה שערים 9, ירושלים
            <br></br>
            <br></br>טלפון: 073-736-7844
            <br></br>
            <br></br>
            שעות פעילות:
            9:00-21:00
          </FooterTitle>
          <Typography variant="caption2">
          </Typography>
          <Box
            sx={{
              mt: 4,
              color: Colors.dove_gray,
            }}
          >
            {/* <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon /> */}
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">מידע</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                <Link component={RouterLink} to="/about" underline="none">
                  אודות
                </Link>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                החזרות/החלפות
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">החשבון שלי</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              <Link component={RouterLink} to="/signIn" underline="none">
                התחברות
                </Link>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              <Link component={RouterLink} to="/cart" underline="none">
                העגלה שלי
                </Link>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              <Link component={RouterLink} to="/order" underline="none">
                הזמנות
                </Link>
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                החשבון שלי
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                רשימת Like
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">ניוזלטר</FooterTitle>
          <Stack>
            <SubscribeTf
              color="primary"
              label="Email"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
              sx={{ mt: 4, mb: 4 }}
              variant="contained"
            >
              {/* הצטרפות */}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}