import React from 'react'

// SUPPOSED TO BE INTEGRATED AS MODAL!

export default class AdminChapterNew extends React.Component {
  render() {
    return (
      <div>
        {this.props.newFanficHidden == false ? (
          <div>
            <form onSubmit={function () { this.props.postFunction.bind(this) }}>
              <input ref={(ref) => { this.chapterTitle = ref }} name="chapterTitle"></input>
              <textarea ref={(ref) => { this.body = ref }} name="body"></textarea>
            </form>
          </div>
        ) : (
            <div />
          )}
      </div>
    )
  }
}