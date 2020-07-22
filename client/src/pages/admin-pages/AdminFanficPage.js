import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminChapterEdit from '../../components/admin-components/AdminChapterEdit'
import AdminFanficEdit from '../../components/admin-components/AdminFanficEdit'
import Axios from 'axios'

export default class AdminFanficPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      fanfics: this.props.fanfics.fanfics,
      newFanficHidden: true,
      newChapterHidden: true,
      selectedChapter: 1
    }
    this.fetchChapters = this.fetchChapters.bind(this)
    this.switchMode = this.switchMode.bind(this)
  }

  fetchChapters() {
    if (this.props.match) {
      Axios.get(`/content/chapters/${this.props.match.params.fanficId}`)
        .then((response) => {
          if (response.data) {
            this.setState({ loaded: true, chapters: response.data.chapters })
          }
        })
    }
  }

  selectChapter() {

  }

  newFanfic() {

  }

  editFanfic(e) {
    e.preventDefault()
    const fanfic_id = this.id.value
    const title = this.newFanficTitle.value
    const summary = this.newSummary.value
    const token = this.props.token
    try {
      Axios({
        url: '/admin/fanfic',
        method: 'put',
        data: {
          title: title,
          summary: summary,
          fanfic_id: fanfic_id
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
    const selectedChapter = this.state.selectedChapter
    return (
      <div>
        {this.state.loaded ? (
          <div>
            <AdminHeader />
            <AdminSidebar />
            <AdminFanficEdit
              fanfics={fanfics} fanficId={this.props.match.params.fanficId} deleteFanfic={this.deleteFanfic}
              editFanfic={this.editFanfic} switchMode={this.switchMode} token={this.props.token}
            />
            {this.state.chapters.map((chapter, key) => {
              if (selectedChapter == chapter.id) {
                return (
                  <div key={key}>
                    <h1>{chapter.title}</h1>
                    <AdminChapterEdit chapter={chapter} deleteChapter={this.deleteChapter} editChapter={this.editChapter} selectChapter={this.selectChapter} />
                  </div>
                )
              }
            })}
          </div>
        ) : (
            <div />
          )}
      </div>
    )
  }
}