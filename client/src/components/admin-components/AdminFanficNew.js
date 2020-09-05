import React from 'react'

// SUPPOSED TO BE INTEGRATED AS MODAL!

export default class AdminFanficNew extends React.Component {
  render() {
    return (
      <div>
        {this.props.newFanficHidden == false ? (
          <div>
            <form onSubmit={function () { this.props.postFunction.bind(this) }}>
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