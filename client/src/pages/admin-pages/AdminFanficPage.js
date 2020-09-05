import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminChapterEdit from '../../components/admin-components/AdminChapterEdit'
import AdminFanficEdit from '../../components/admin-components/AdminFanficEdit'
import Axios from 'axios'
import Select from 'react-select'
import AdminChapterNew from '../../components/admin-components/AdminChapterNew'
import AdminFanficNew from '../../components/admin-components/AdminFanficNew'

export default class AdminFanficPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      fanfics: this.props.fanfics.fanfics,
      newFanficHidden: true,
      newChapterHidden: true,
      selectedChapter: 3
    }
    this.fetchChapters = this.fetchChapters.bind(this)
    this.switchMode = this.switchMode.bind(this)
    this.selectChapter = this.selectChapter.bind(this)
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

  selectChapter(sel) {
    this.setState({ selectedChapter: sel.value })
  }

  newFanfic() {
    const fanfic_id = this.id.value
    const title = this.newFanficTitle.value
    const summary = this.newSummary.value
    const token = this.props.token
    try {
      Axios({
        url: '/admin/fanfic',
        method: 'post',
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

  editFanfic() {
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
            console.log(response.data)
          }
        })
    } catch (error) {
      console.log(error)
    }
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
            <AdminFanficNew postFunction={this.newChapter} hidden={this.state.newFanficHidden} />
            <AdminFanficEdit
              fanfics={fanfics} fanficId={this.props.match.params.fanficId} deleteFanfic={this.deleteFanfic}
              editFanfic={this.editFanfic} switchMode={this.switchMode} token={this.props.token}
            />
            <AdminChapterNew postFunction={this.newFanfic} hidden={this.state.newChapterHidden} />
            <div>
              <Select
                defaultValue={this.state.chapters.map((chapter, key) => {
                  if (selectedChapter == chapter.id) {
                    return (
                      {value: chapter.id, label: chapter.title}
                    )
                  }
                })}
                options={this.state.chapters.map((chapter, key) => {
                  return (
                    {value: chapter.id, label: chapter.title}
                  )
                })}
                onChange={this.selectChapter} />
            </div>
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