import React from 'react'
import Axios from 'axios'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminFanfics from '../../components/admin-components/AdminFanfics'
import AdminFanficNew from '../../components/admin-components/AdminFanficNew'

export default class AdminFanfic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      newHidden: true,
      fanfics: this.props.fanfics
    }
    this.displayFanfic = this.displayFanfic.bind(this)
  }

  newFanfic() {
    const title = this.fanficTitle.value
    const summary = this.summary.value
    const token = this.props.token
    try {
      Axios({
        url: '/admin/fanfic',
        method: 'post',
        data: {
          title: title,
          summary: summary
        },
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          if (response.data !== undefined && response.data !== null) {
            console.log(response.data)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }  
  
  deleteFanfic(id, token) {
    try {
      Axios({
        url: '/admin/fanfic',
        method: 'delete',
        data: {
          fanfic_id: id
        },
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          if (response.data !== undefined && response.data !== null) {
            window.location.reload()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  
  displayFanfic(mode) {
      this.setState({ newHidden: mode })
  }

  render() {
    console.log(this.state.fanfics)
    return (
      <div>
        <AdminHeader />
        <AdminSidebar />
        <AdminFanficNew token={this.props.token} display={this.displayFanfic} postFunction={this.newFanfic} hidden={this.state.newHidden} />
        <AdminFanfics token={this.props.token} fanfics={this.state.fanfics} deleteFanfic={this.deleteFanfic} />
      </div> 
    ) 
  } 
}   