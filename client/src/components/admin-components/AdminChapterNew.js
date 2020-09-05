import React from 'react'

// SUPPOSED TO BE INTEGRATED AS MODAL!

export default class AdminChapterNew extends React.Component {
  render() {
    const display = this.props.display
    const newChapter = this.props.newChapter
    return (
      <div>
        <button onClick={function () { display('chapter', 'new', false) } }>New Chapter</button>
        {this.props.hidden == false ? (
          <div>
            <form onSubmit={ newChapter.bind(this) }>
              <input ref={(ref) => { this.chapterTitle = ref }} name="chapterTitle"></input>
              <textarea ref={(ref) => { this.body = ref }} name="body"></textarea>
              <button type="submit">Submit</button>
            </form>
            <button onClick={function () { display('chapter', 'new', true) } }>Cancel</button>
          </div>
        ) : (
            <div />
          )}
      </div>
    )
  }
}