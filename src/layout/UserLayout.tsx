import React, { FC } from 'react'
import Header from '../components/sections/Header';
// import { emphasize, styled } from '@mui/material/styles';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Chip from '@mui/material/Chip';
// import HomeIcon from '@mui/icons-material/Home';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Paper } from '@mui/material';


// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//     const backgroundColor =
//         theme.palette.mode === 'light'
//             ? theme.palette.grey[100]
//             : theme.palette.grey[800];
//     return {
//         backgroundColor,
//         height: theme.spacing(3),
//         color: theme.palette.text.primary,
//         fontWeight: theme.typography.fontWeightRegular,
//         '&:hover, &:focus': {
//             backgroundColor: emphasize(backgroundColor, 0.06),
//         },
//         '&:active': {
//             boxShadow: theme.shadows[1],
//             backgroundColor: emphasize(backgroundColor, 0.12),
//         },
//     };
// }) as typeof Chip;

// function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }



const AdminLayout: FC = ({ children }) => {
    return (
        <>
            <Header />
            {/* <Paper elevation={3} >
                <section className="breadcrumb p-2">
                    <div className="container-fluid">

                        <div role="presentation" onClick={handleClick}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <StyledBreadcrumb
                                    component="a"
                                    href="#"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}
                                />
                                <StyledBreadcrumb component="a" href="#" label="Catalog" />
                                <StyledBreadcrumb
                                    label="Accessories"
                                    deleteIcon={<ExpandMoreIcon />}
                                    onDelete={handleClick}
                                />
                            </Breadcrumbs>
                        </div>
                    </div>
                </section>
            </Paper> */}
            <main>{children}</main>
        </>
    )
}

export default AdminLayout;