import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography, Box } from '@mui/material';

function EmptyCartMessage() {
  return (
    <Box 
      sx={{
        height: '100px',
        textAlign: 'center',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
      }}
    >
      {/* אייקון עם סגנון רקע */}
      <ShoppingCartIcon 
        sx={{
          fontSize: '80px',
          color: 'lightgray',
          position: 'absolute',
          top: '10px',
          zIndex: 1,
          opacity: 0.3
        }}
      />
      {/* טקסט */}
      <Typography 
        sx={{
          position: 'relative',
          zIndex: 2,
          color: 'gray',
        }}
      >
        אין מוצרים בעגלה
      </Typography>
    </Box>
  );
}

export default EmptyCartMessage;
