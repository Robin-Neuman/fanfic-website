import React from 'react'
import { Link } from 'react-router-dom'

export default class AdminFanfics extends React.Component {
  render() {
    const fanfics = this.props.fanfics.fanfics
    return (
      <div className="adminFanfics">
        <div className="fanficsCont">
          {fanfics ? fanfics.map((fanfic, key) => {
            return (
              <div className="fanficItem" key={key}>
                <h1>{fanfic.title}</h1>                
                <Link className="navBarItem" to={"/admin/adminPage/fanfics/edit/" + fanfic.id}><button>Edit</button></Link>
              </div>
            )
          }) : ( 
            <div className="fanficItem" />
          )}
        </div>
        <div>
          <button>New</button>
        </div>
      </div>
    )
  }
}
