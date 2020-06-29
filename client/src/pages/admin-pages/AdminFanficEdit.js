import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminChapterEdit from '../../components/admin-components/AdminChapterEdit'
import Axios from 'axios'

export default class AdminFanficEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      fanfics: this.props.fanfics.fanfics
    }
    this.fetchChapters = this.fetchChapters.bind(this)
    this.switchMode = this.switchMode.bind(this)
  }

  fetchChapters() {
    Axios.get(`/content/chapters/${this.props.match.params.fanficId}`)
      .then((response) => {
        if (response.data) {
          this.setState({ loaded: true, chapters: response.data.chapters })
        }
      })
  }

  newFanfic() {

  }

  editFanfic() {

  }

  deleteFanfic() {

  }

  newChapter() {

  }

  editChapter() {

  }

  deleteChapter() {

  }

  switchMode(id, mode) {
    let fanfics = this.state.fanfics
    console.log(fanfics)
    for (let i = 0; i < fanfics.length; i++) {
      if (fanfics[i].id === id) {
        fanfics[i].mode = mode
        this.setState({ fanfics: fanfics })
      }
    }
  }

  componentDidMount() {
    if (!this.state.chapters) {
      this.fetchChapters()
    }
  }

  render() {
    const fanfics = this.state.fanfics
    return (
      <div>
        <AdminHeader />
        <AdminSidebar />
        <div>
          {this.state.loaded ? (
            <div>
              {fanfics.map((fanfic, key) => {
                const deleteFanfic = this.deleteFanfic
                const switchMode = this.switchMode
                if (fanfic.id == this.props.match.params.fanficId) {
                  return (
                    <div key={key}>
                      <form onSubmit={this.newFanfic}>
                        {fanfic.mode === 'edit' ? (
                          <div>
                            <button type="submit">Submit</button>
                            <button onClick={function (e) { switchMode(fanfic.id, 'view') }}>Cancel</button>
                          </div>
                        ) : (
                            <div>
                              <h1>{fanfic.title}</h1>
                              <p>{fanfic.summary}</p>
                              <button onClick={function (e) { e.preventDefault(); deleteFanfic(fanfic.id) }}>Delete</button>
                              <button onClick={function (e) { e.preventDefault(); switchMode(fanfic.id, 'edit') }}>Edit</button>
                            </div>
                          )}
                      </form>
                    </div>
                  )
                }
              })}
              {this.state.chapters.map((chapter, key) => {
                return (
                  <div key={key}>
                    <h1>{chapter.title}</h1>
                    <AdminChapterEdit chapters={this.state.chapters} chapterId={chapter.id} />
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