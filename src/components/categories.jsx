
import React, {useEffect, useState} from 'react';//שימוש בהוק אפקט יביא נתוני מוצר כאשר נטען הרכיב
import { GetCategories } from '../utils/categoryAPI';//באמצעות הפונקציה יביא רשימה של מוצרים
import { setCategries } from '../features/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { List, ListItem, ListItemText, Button } from '@mui/material';//-List מייצג את הרשימה עצמה, -ListItem מייצג כל פריט ברשימה
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const Categories = () =>{
  const categories = useSelector((state) => {
    console.log(state);
    return state.categories?.categories;
  });
     const navigatev = useNavigate();

     const dispatch = useDispatch();


  const handleCategoryClick = (link) => {
    navigatev.push(link);
  };

    useEffect(()=>{
        const fetchCategories = async () => {
            const data = await GetCategories();
             //דחיפת הנתונים לריקדס
            dispatch(setCategries(data));
        };

        if(categories?.length === 0){
            //שליפת נתונים מהשרת
             fetchCategories();
        }
    }, []);

return (
    // <div>
    //   <h2>קטגוריות</h2>
    //   <List component="nav" aria-label="categories">
    //        {this.state.categories.map(category => (
    //         <ListItem key={category.id} component="div">
    //           <Button component={Link} to={`/categories/${category.id}`} variant="text">
    //             <ListItemText primary={category.name} />
    //           </Button>
    //         </ListItem>
    //     ))}
    //   </List>
    // </div>
    <Grid container spacing={4}>
    {categories?.map((category) => (
      <Grid item key={category.id} xs={12} sm={6} md={4}>
        <Card>
          <CardActionArea onClick={() => handleCategoryClick(category.link)}>
            <CardMedia
              component="img"
              alt={category.name}
              height="140"
              image={category.pathToImeg}
            />
               <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>

  );
};

export default Categories;