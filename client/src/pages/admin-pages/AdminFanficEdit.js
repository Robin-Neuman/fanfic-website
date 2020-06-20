import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default class AdminFanficEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      fanfics: this.props.fanfics
    }
    this.fetchChapters = this.fetchChapters.bind(this)
  }

  fetchChapters() {
    Axios.get(`/content/chapters/${this.props.match.params.fanficId}`)
      .then((response) => {
          if (response.data) {
            this.setState({ loaded: true, chapters: response.data.chapters })
          }
      })
  }

  componentDidMount() {
    if (!this.state.chapters) {
      this.fetchChapters()
    } 
  }

  render() {
    const fanfics = this.state.fanfics.fanfics
    return (
      <div>
        <AdminHeader />
        <AdminSidebar />
        <div>
          {this.state.loaded ? (
            <div>
              {fanfics.map((fanfic, key) => {
                if (fanfic.id == this.props.match.params.fanficId) {
                  return (
                    <div key={key}>
                      <h1>{fanfic.title}</h1>
                      <button>Edit</button>
                      <p>{fanfic.summary}</p>
                      <button>Edit</button>
                    </div>
                  )
                }
              })}
              {this.state.chapters.map((chapter, key) => {
                return (
                  <div key={key}>
                    <h1>{chapter.title}</h1>                    
                    <Link className="navBarItem" to={{
                      pathname: "/admin/adminPage/chapter/edit/" + chapter.id,
                      state: {
                        chapters: this.state.chapters
                      }
                    }}><button>Edit</button></Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}