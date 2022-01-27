import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import Loader from './components/UI/Loader';
import firebase from './firebase/config';
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import { RootState } from './store';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import AdminDashboard from './admin-dashboard/pages/Dashboard';
import NotFound from './components/pages/NotFound'
import NewEntry from './components/pages/NewEntry';


const App: FC = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.auth);
    const [role, setRole] = useState(false);

    useEffect(() => {
        if (user?.userRoles) {
            setRole(user?.userRoles.includes('admin'))
        }
    }, [user])


    // Check if user exists
    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setLoading(true));
                await dispatch(getUserById(user.uid));
                if (!user.emailVerified) {
                    dispatch(setNeedVerification());
                }
            }
            dispatch(setLoading(false));
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }


    let userRoutes;
    let adminRoutes;

    if (role) {
        adminRoutes = (
            <>
                <Switch>
                    <Route exact path="/admin/dashboard" component={AdminDashboard} />
                    <PublicRoute exact path="/signup" component={SignUp} />
                    <PublicRoute exact path="/signin" component={SignIn} />
                    <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
                    <Route path="*" component={NotFound} />
                    <Redirect to="/admin/dashboard" />
                </Switch>
            </>
        )
    } else {
        userRoutes = (
            <>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <PublicRoute exact path="/signup" component={SignUp} />
                    <PublicRoute exact path="/signin" component={SignIn} />
                    <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
                    <PrivateRoute exact path="/new-entry" component={NewEntry} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <Route path="*" component={NotFound} /> 
                </Switch>
            </>
        )
    }
    return (
        <>
            {role ?
                <AdminLayout >{adminRoutes}</AdminLayout> :
                <UserLayout >{userRoutes}</UserLayout>
            }
        </>
    );
}

export default App;
