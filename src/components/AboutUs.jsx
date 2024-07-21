


import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';
import { MessageText, PromotionsContainer } from "../styles/promotiom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Promotions2 from './Promotion2';

const AboutUs = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        קצת עלינו
      </Typography>
    
      {/* <Typography variant="subtitle2" gutterBottom> */}
      <Typography variant="h5" component="h2">

        שיינ׳ס סטוק הכל לגן ולבית. חנות סטוקים גדולה עם מחלקות נרחבות לחומרי יצירה וכלי כתיבה עם הנחות מיוחדות לגננות ומוסדות,
        אנו מתמחים במכירת מוצרים איכותיים ובמתן שירות אישי ומקצועי ללקוחותינו.
        </Typography>
      <Promotions2/>
    </Container>
  );

  
  //     <Box mt={4}>
  //       <Grid container spacing={4}>
  //         <Grid item xs={12} md={6}>
  //           <Card>
  //             <CardMedia
  //               component="img"
  //               alt="תמונה של החנות"
  //               height="300"
  //               image="/IMG/בחנות/shop.jpg"
  //               title="תמונה של החנות"
  //             />
              // <CardContent>
              //   <Typography variant="h5" component="h2">
              //   החנות שלנו מציעה מגוון רחב של מוצרים איכותיים. אנחנו מחויבים למתן השירות הטוב ביותר ללקוחותינו.
              //   </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  החנות שלנו מציעה מגוון רחב של מוצרים איכותיים. אנחנו מחויבים למתן השירות הטוב ביותר ללקוחותינו.
                </Typography> */}
              // </CardContent>
  //           </Card>
  //         </Grid>
  //         <Grid item xs={12} md={6}>
  //           {/* <Card>
  //             <CardContent>
  //               <Typography variant="h5" component="h2">
  //               </Typography>
  //               <Typography variant="body2" color="textSecondary" component="p">
  //               </Typography>
  //             </CardContent>
  //           </Card> */}
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </Container>
  // );
};

export default AboutUs;
