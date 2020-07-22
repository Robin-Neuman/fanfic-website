import React from 'react'

export default class AdminNewFanfic extends React.Component {
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
