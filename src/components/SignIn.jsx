import { useState, useEffect } from "react";
import { Login } from '../utils/usersAPI';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../features/userSlice";
import { Button, TextField, Grid, Typography, Container, IconButton, FormControlLabel } from '@mui/material';
import { AppbarContainer, AppbarHeader } from '../styles/headerStyle';
import { PersonAdd } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // בדיקת פרטי משתמש מקומיים ב-Local Storage
  //   const storedUser = localStorage.getItem('loggedUser');
  //   if (storedUser) {
  //     dispatch(setLoggedUser(JSON.parse(storedUser)));
  //     navigate('/');
  //   }
  // }, [dispatch, navigate]);
  useEffect(() => {
    setPassword("");
  }, [error]);

  const handleClickReturnBack = () => {
    try {
      navigate("/");
    } catch {
      setError(error.message);
      console.log("page not found");
    }
  };

  const handleClickLogin = () => {
    if (email === "" || password === "") {
      setError("חובה למלא את כל השדות");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("כתובת האימייל אינה חוקית");
    } else {
      const user = {
        Email: email,
        Password: password
      };
      Login(user).then(res => {
        if (res.status === 200) {
          console.log('!!', res.data);
          // שמירה של הנתונים על המשתמש שחזרו מהקריאת שרת - שמירה שלהם ברידקס
          dispatch(setLoggedUser(res.data));
          // שמירה ל-Local Storage
          // ניווט של המשתמש המחובר לדף הבית
          if(res.data.tipeUser == "admin"){
            navigate('/admin');
          }else{
            navigate('/');
          }
        } else {
          setError("אחד מהנתונים שגוי");
        }
      });
    }
  };

  const handleChangeEmail = (event) => {
    setError("");
    let value = event.target.value;
    setEmail(value);
  };

  const handleChangePassword = (event) => {
    setError("");
    let value = event.target.value;
    setPassword(value);
  };

  return (
    <>
      <AppbarContainer>
        <AppbarHeader>Welcome to Shine's Stock</AppbarHeader>
      </AppbarContainer>
      <Container maxWidth="xs" style={{ marginTop: '150px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          התחברות משתמש קיים
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="כתובת מייל"
              name="email"
              type="email"
              fullWidth
              onChange={handleChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="סיסמה"
              name="password"
              type="password"
              fullWidth
              onChange={handleChangePassword}
            />
              <FormControlLabel
              control={<Checkbox value="remember" style={{ color: "black" }} />}
              label="זכור אותי"
            />
          </Grid>
        </Grid>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={handleClickLogin}>
          התחברות
        </Button>
        
        {error && <Typography color="error">{error}</Typography>}
        <br></br>
        <Typography variant="body2" align="center" gutterBottom>
        <br></br>

          <Link to="/forgot-password">שכחת סיסמה?</Link>
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
        <br></br>
        <br></br>

        הרשמה למשתמש חדש
        <Button
          color="inherit"
          component={Link}
          to="/signUp"
          startIcon={<PersonAdd style={{ fontSize: 40 }}/>}
        >
        </Button>
        {/* <Button color='inherit' component={Link} to="/signUp"></Button> */}
        </Typography>

      </Container>
    </>
  );
};

export default SignIn;
