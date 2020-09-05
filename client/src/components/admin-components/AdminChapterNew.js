import React from 'react'

// SUPPOSED TO BE INTEGRATED AS MODAL!

export default class AdminChapterNew extends React.Component {
  render() {
    const display = this.props.display
    const postFunction = this.props.postFunction
    return (
      <div>
        <button onClick={function () { display("chapter", false) } }>New Chapter</button>
        {this.props.hidden == false ? (
          <div>
            <form onSubmit={ postFunction.bind(this) }>
              <input ref={(ref) => { this.chapterTitle = ref }} name="chapterTitle"></input>
              <textarea ref={(ref) => { this.body = ref }} name="body"></textarea>
              <button type="submit">Submit</button>
            </form>
            <button onClick={function () { display("chapter", true) } }>Cancel</button>
          </div>
        ) : (
            <div />
          )}
      </div>
    )
  }
}