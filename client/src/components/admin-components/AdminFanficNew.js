import React from 'react'

// SUPPOSED TO BE INTEGRATED AS MODAL!

export default class AdminFanficNew extends React.Component {
  render() {
    const { display, postFunction} = this.props
    return (
      <div>
        <button onClick={function () { display(false) } }>New Fanfic</button>
        {this.props.hidden == false ? (
          <div>
            <form onSubmit={ postFunction.bind(this) }>
              <input ref={(ref) => { this.fanficTitle = ref }} name="fanficTitle"></input>
              <textarea ref={(ref) => { this.summary = ref }} name="summary"></textarea>
              <button type="submit">Submit</button>
            </form>
            <button onClick={function () { display(true) } }>Cancel</button>
          </div>
        ) : (
            <div />
          )}
      </div>
    )
  }
}