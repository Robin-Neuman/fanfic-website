import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminDash from '../../components/admin-components/AdminDash'

export default class Admin extends React.Component {
    render() {
        return (
            <div>
                <AdminHeader />
                <AdminSidebar />
                <AdminDash />
            </div>
        )
    }
}