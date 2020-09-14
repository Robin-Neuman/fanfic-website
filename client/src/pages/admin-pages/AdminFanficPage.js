import React from 'react'
import AdminHeader from '../../components/admin-components/AdminHeader'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminChapterEdit from '../../components/admin-components/AdminChapterEdit'
import AdminFanficEdit from '../../components/admin-components/AdminFanficEdit'
import Axios from 'axios'
import Select from 'react-select'
import AdminChapterNew from '../../components/admin-components/AdminChapterNew'

export default class AdminFanficPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      fanfics: this.props.fanfics.fanfics,
      newHidden: {
        fanfic: true,
        chapter: true
      },
      editHidden: {
        fanfic: true,
        chapter: true
      },
      selectedChapter: 0
    }
    this.fetchChapters = this.fetchChapters.bind(this)
    this.displayForm = this.displayForm.bind(this)
    this.selectChapter = this.selectChapter.bind(this)
  }

  fetchChapters() {
    if (this.props.match) {
      Axios.get(`/content/chapters/${this.props.match.params.fanficId}`)
        .then((response) => {
          if (response.data) {
            let selected = 0
            if (response.data.chapters[0]) {
              selected = response.data.chapters[0].id
            }
            this.setState({ loaded: true, chapters: response.data.chapters, selectedChapter: selected })
          }
        })
    }
  }

  displayForm(item, type, mode) {
    console.log(item, type, mode)
    const newHidden = this.state.newHidden
    const editHidden = this.state.editHidden

    if (item == 'fanfic') {
      if (type == 'new') {
        newHidden.fanfic = mode
        this.setState({ newHidden: newHidden })
      } else if (type == 'edit') {
        editHidden.fanfic = mode
        this.setState({ editHidden: editHidden })
      }
    } else if (item == 'chapter') {
      if (type == 'new') {
        newHidden.chapter = mode
        this.setState({ newHidden: newHidden })
      } else if (type == 'edit') {
        editHidden.chapter = mode
        this.setState({ editHidden: editHidden })
      }
    }
  }

  selectChapter(sel) {
    this.setState({ selectedChapter: sel.value })
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

  newChapter() {
    const title = this.chapterTitle.value
    const body = this.body.value
    const token = this.props.token
    const fanfic_id = this.props.fanficId
    try {
      Axios({
        url: '/admin/chapter',
        method: 'post',
        data: {
          title: title,
          summary: body,
          id: fanfic_id
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

  editChapter() {
    const fanfic_id = this.props.fanficId
    const id = this.props.chapterId
    const title = this.newChapterTitle.value
    const content = this.newChapterContent.state.value
    const token = this.props.token
    try {
      Axios({
        url: '/admin/chapter',
        method: 'put',
        data: {
          title: title,
          content: content,
          fanfic_id: fanfic_id,
          id: id
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

  deleteChapter(id, token) {
    try {
      Axios({
        url: '/admin/chapter',
        method: 'delete',
        data: {
          id: id
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
            <div className="adminCont">
            <AdminFanficEdit
              fanfics={fanfics} fanficId={this.props.match.params.fanficId} hidden={this.state.editHidden.fanfic}
              editFanfic={this.editFanfic} display={this.displayForm} token={this.props.token}
            />
            <AdminChapterNew
              token={this.props.token} fanficId={this.props.match.params.fanficId} display={this.displayForm}
              newChapter={this.newChapter} hidden={this.state.newHidden.chapter}
            />
            <div>
              <Select
                defaultValue={this.state.chapters.map((chapter, key) => {
                  if (selectedChapter == chapter.id) {
                    return (
                      { value: chapter.id, label: chapter.title }
                    )
                  }
                })}
                options={this.state.chapters.map((chapter, key) => {
                  return (
                    { value: chapter.id, label: chapter.title }
                  )
                })}
                onChange={this.selectChapter} />
            </div>
            {this.state.chapters.map((chapter, key) => {
              if (selectedChapter == chapter.id) {
                return (
                  <div key={key}>
                    <h1>{chapter.title}</h1>
                    <AdminChapterEdit
                      token={this.props.token} chapter={chapter} deleteChapter={this.deleteChapter} editChapter={this.editChapter} fanficId={this.props.match.params.fanficId}
                      selectChapter={this.selectChapter} display={this.displayForm} hidden={this.state.editHidden.chapter} chapterId={chapter.id}
                    />
                  </div>
                )
              }
            })}
            </div>
          </div>
        ) : (
            <div />
          )}
          
      </div>
    )
  }
}