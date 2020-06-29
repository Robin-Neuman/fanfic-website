import React from 'react'
import Quill from 'react-quill'

export default class AdminFanficEdit extends React.Component {

  render() {
    return (
      <div>
        {this.props.chapters.map((chapter, key) => {
          if (chapter.id === this.props.chapterId) {
            return (
              <div key={key}>
                <form>
                  <input defaultValue={chapter.title}></input>
                  <Quill theme="snow" value={chapter.content} />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )
          }
        })}
        <button>Edit</button>
      </div>
    )
  }
}