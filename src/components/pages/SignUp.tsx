import React, { useState, FormEvent, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../UI/Message';
import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';



import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const SignUp:FC = () => {
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (error) {
            dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signup({ email, userName, password, firstName, profileImg }, () => setLoading(false)));
    }

    const theme = createTheme();

    return (
        <section className="signUp">
            {/* <div className="container">
                <h2 className="has-text-centered is-size-2 mb-3">Sign Up</h2>
                <form className="form" onSubmit={submitHandler}>
                    {error && <Message type="danger" msg={error} />}
                    <Input
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                        placeholder="First name"
                        label="First name"
                    />
                    <Input
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.currentTarget.value)}
                        placeholder="username"
                        label="User name"
                    />
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                        label="Email address"
                    />
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Password"
                        label="Password"
                    />
                    <Button text={loading ? "Loading..." : "Sign Up"} className="is-primary is-fullwidth mt-5" disabled={loading} />
                </form>
            </div> */}


            <ThemeProvider theme={theme}>
                {progress ? loading : null}
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="user Name"
                                        name="userName"
                                        autoComplete="username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <input
                                        id="file"
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => setProfileImg(e.target.files[0])}
                                        accept="image/png, image/jpeg, image/jpg"
                                    /> */}
                                    {/* <img src={profileImg ? URL.createObjectURL(profileImg) : null} width="200px" height="200px" /> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? "Loading..." : "Sign Up"}
                            </Button>
                            {error && <Message type="danger" msg={error} />}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/signin">Already have an account? Sign in</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </section>
    );
}

export default SignUp;