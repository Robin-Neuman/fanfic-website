import React from 'react'
import AdminHeader from '../components/admin-components/AdminHeader'
import AdminMenu from '../components/admin-components/AdminMenu'
import AdminFooter from '../components/admin-components/AdminFooter'

export default class Admin extends React.Component {
    render() {
        return (
            <div>
                <AdminHeader />
                <AdminMenu />
                <AdminFooter />
            </div>
        )
    }
}