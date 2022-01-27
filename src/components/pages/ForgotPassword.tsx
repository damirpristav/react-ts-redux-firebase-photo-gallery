import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../UI/Message';
import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
      if (success) {
        dispatch(setSuccess(''));
      }
    }
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(''));
    }
    if (error) {
      dispatch(setError(''));
    }
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, "Email sent!"));
    setLoading(false);
  }

  const theme = createTheme();


  return (
    <section className="forgot-passwrd">
      {/* <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Reset password</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          {success && <Message type="success" msg={success} />}
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Button text={loading ? "Loading..." : "Send password reset email"} className="is-primary is-fullwidth mt-5" disabled={loading} />
        </form>
      </div> */}

      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset password
              </Typography>
              <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? "Loading..." : "Send password reset email"}
                </Button>
                {error && <Message type="danger" msg={error} />}
                {success && <Message type="success" msg={success} />}
                <Grid container>
                  <Grid item>
                    <Link to="/signin">Please SignIn Here</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </section>
  );
}

export default ForgotPassword;