import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import { Link } from 'react-router-dom'

export default class AdminFanficEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      chapters: this.props.location.state.chapters
    }
  }

  render() {
    return (
      <div>
        <AdminHeader />
        <AdminSidebar />
        <div>
          {this.state.chapters.map((chapter, key) => {
            if (chapter.id == this.props.match.params.chapterId) {
              return (
                <div key={key}>
                  <form>
                    <input defaultValue={chapter.title}></input>                    
                    <textarea defaultValue={chapter.content}></textarea>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}