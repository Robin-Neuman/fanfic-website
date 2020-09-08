import React from 'react'

export default class AdminFanficEdit extends React.Component {
  render() {
    const fanfics = this.props.fanfics
    const editFanfic = this.props.editFanfic
    const display = this.props.display
    const hidden = this.props.hidden
    return (
      <div>
        {fanfics.map((fanfic, key) => {
          if (fanfic.id == this.props.fanficId) {
            return (
              <div key={key}>
                {!hidden ? (
                  <div>
                    <form onSubmit={editFanfic.bind(this)}>
                      <input ref={(ref) => { this.newFanficTitle = ref }} name="newFanficTitle" defaultValue={fanfic.title}></input>
                      <textarea ref={(ref) => { this.newSummary = ref }} name="newSummary" defaultValue={fanfic.summary}></textarea>
                      <input ref={(ref) => { this.id = ref }} name="id" defaultValue={fanfic.id} hidden></input>
                      <button type="submit">Submit</button>
                      <button onClick={function () { display('fanfic', 'edit', true) }}>Cancel</button>
                    </form>
                  </div>
                ) : (
                    <div>
                      <h1>{fanfic.title}</h1>
                      <p>{fanfic.summary}</p>                      
                      <button onClick={function () { display('fanfic', 'edit', false) }}>Edit</button>
                    </div>
                  )}
              </div>
            )
          }
        })}        
      </div>
    )
  }
}
