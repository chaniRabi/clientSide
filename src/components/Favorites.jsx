

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/favoritesSlice';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoritesList = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFavorite(item));
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <Typography variant="h6">רשימת מועדפים ריקה</Typography>
      ) : (
        favorites.map((item) => (
          <Card key={item.id} style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <IconButton onClick={() => handleRemove(item)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
