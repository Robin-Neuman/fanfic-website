import React from 'react'

// SUPPOSED TO BE INTEGRATED AS MODAL!

export default class AdminChapterNew extends React.Component {
  render() {
    return (
      <div>
        {!this.props.newFanficHidden ? (
          <div>
            <form onSubmit={this.newFanfic}>
              <input ref={(ref) => { this.fanficTitle = ref }} name="fanficTitle"></input>
              <textarea ref={(ref) => { this.summary = ref }} name="summary"></textarea>
            </form>
          </div>
        ) : (
            <div />
          )}
      </div>
    )
  }
}