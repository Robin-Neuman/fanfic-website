import React from 'react'
import Quill from 'react-quill'

export default class AdminFanficEdit extends React.Component {
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  formats = [
    "background",
            "bold", 
            "color", 
            "font", 
            "code", 
            "italic", 
            "link", 
            "size", 
            "strike", 
            "script",
            "underline", 
            "blockquote", 
            "indent", 
            "list",
            "align", 
            "direction", 
            "code-block", 
            "formula", 
            "image",
            "video"
  ]

  render() {
    const chapter = this.props.chapter
    const hidden = this.props.hidden
    const display = this.props.display
    const editChapter = this.props.editChapter
    const deleteChapter = this.props.deleteChapter
    const chapterId = this.props.chapterId
    const token = this.props.token
    return (
      <div>
        <button onClick={function () { display('chapter', 'edit', false) } }>Edit</button>
        <button onClick={function () { deleteChapter(chapterId, token) } }>Delete</button>
        {!hidden ? (
          <form onSubmit={ editChapter.bind(this) }>
          <input ref={(ref) => { this.newChapterTitle = ref }} name="newChapterTitle" defaultValue={chapter.title}></input>
          <Quill formats={this.formats} modules={this.modules} ref={(ref) => { this.newChapterContent = ref }} name="newChapterContent" theme="snow" value={chapter.content} />
          <button type="submit">Submit</button>
          <button onClick={function () { display('chapter', 'edit', true) } }>Cancel</button>
        </form>
        ) : (
          <div />
        )}
      </div>
    )
  }
}