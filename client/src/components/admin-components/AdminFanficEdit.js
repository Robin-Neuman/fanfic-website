import React from 'react'

export default class AdminFanficEdit extends React.Component {
  render() {
    const fanfics = this.props.fanfics
    const editFanfic = this.props.editFanfic
    const deleteFanfic = this.props.deleteFanfic
    const switchMode = this.props.switchMode
    return (
      <div>
        {fanfics.map((fanfic, key) => {
          if (fanfic.id == this.props.fanficId) {
            return (
              <div key={key}>
                {fanfic.mode === 'edit' ? (
                  <div>
                    <form onSubmit={editFanfic.bind(this)}>
                      <input ref={(ref) => { this.newFanficTitle = ref }} name="newFanficTitle" defaultValue={fanfic.title}></input>
                      <textarea ref={(ref) => { this.newSummary = ref }} name="newSummary" defaultValue={fanfic.summary}></textarea>
                      <input ref={(ref) => { this.id = ref }} name="id" defaultValue={fanfic.id} hidden></input>
                      <button type="submit">Submit</button>
                      <button onClick={function (e) { e.preventDefault(); switchMode(fanfic.id, 'view') }}>Cancel</button>
                    </form>
                  </div>
                ) : (
                    <div>
                      <h1>{fanfic.title}</h1>
                      <p>{fanfic.summary}</p>                      
                      <button onClick={function (e) { e.preventDefault(); switchMode(fanfic.id, 'edit') }}>Edit</button>
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
