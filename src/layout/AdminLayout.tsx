import React, { FC } from 'react'
import HeaderAdmin from '../admin-dashboard/sections/HeaderAdmin';


const AdminLayout: FC = ({ children }) => {
    return (
        <>
            <HeaderAdmin />
            <main>{children}</main>
        </>
    )
}

export default AdminLayout;