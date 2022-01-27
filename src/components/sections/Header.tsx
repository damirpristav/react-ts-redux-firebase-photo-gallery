import React, { FC, useState } from 'react';
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

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { List, ListItem, ListItemText } from '@mui/material';




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



    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const [drawer, setDrawer] = useState<boolean>(false)

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <React.Fragment>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => setDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <SwipeableDrawer
                                anchor="left"
                                open={drawer}
                                onClose={() => setDrawer(false)}
                                onOpen={() => { }}
                            >
                                <div style={{ width: '230px' }}>
                                    <Box textAlign="center">
                                        <MenuItem>
                                            <Avatar /> {user?.userName}
                                        </MenuItem>
                                    </Box>
                                    <Divider />
                                    <List>
                                        <ListItem button onClick={() => history.push('/new-entry')}>
                                            <ListItemText primary={'New Entry'} />
                                        </ListItem>
                                    </List>
                                </div>
                            </SwipeableDrawer>
                        </React.Fragment>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            <Button onClick={() => history.push(!authenticated ? "/" : location.pathname === "/dashboard" ? "/" : "/dashboard")} color="inherit">Diamond App</Button>
                        </Typography>
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <ListItem button onClick={() => history.push('/new-entry')}>
                                    <ListItemText primary={'New Entry'} />
                                </ListItem>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
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
                                    <Avatar /> {user?.userName}
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => history.push('/dashboard')}>
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