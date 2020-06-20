import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminFanfics from '../../components/admin-components/AdminFanfics'

export default class AdminFanfic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      fanfics: this.props.fanfics
    }
  }

  render() {
    return (
      <div>
        <AdminHeader />
        <AdminSidebar />
        <AdminFanfics fanfics={this.state.fanfics} admin={true} />
      </div> 
    ) 
  } 
}   