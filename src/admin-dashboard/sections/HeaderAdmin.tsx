import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// import Button from '../UI/Button';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { authenticated, user } = useSelector((state: RootState) => state.auth);

    const logoutClickHandler = () => {
        dispatch(signout());
        history.push('/signin')
    } 


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            <Button onClick={() => history.push(!authenticated ? "/" : location.pathname === "/admin/dashboard" ? "/admin/dashboard" : "/admin/dashboard")} color="inherit">Admin Diamond App</Button>
                        </Typography>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                {!authenticated ?
                                    <ButtonGroup disableElevation variant="contained">
                                        <Button onClick={() => history.push('/signup')} >signup</Button>
                                        <Button onClick={() => history.push('/signin')} >login</Button>
                                    </ButtonGroup>
                                    :
                                    <div>
                                        <Tooltip title="Account settings">
                                            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                                <Avatar sx={{ width: 32, height: 32 }}>{user && user.userName.charAt(0).toUpperCase()}</Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                }
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={() => history.push('/admin/dashboard')}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={logoutClickHandler}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );
}

export default Header;