import React from 'react'
import Quill from 'react-quill'

export default class AdminFanficEdit extends React.Component {
  render() {
    const chapter = this.props.chapter
    return (
      <div>
        <form>
          <input defaultValue={chapter.title}></input>
          <Quill theme="snow" value={chapter.content} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}