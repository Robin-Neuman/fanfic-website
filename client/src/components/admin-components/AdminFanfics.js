import React from 'react'
import { Link } from 'react-router-dom'

export default class AdminFanfics extends React.Component {
  render() {
    const fanfics = this.props.fanfics.fanfics
    const deleteFanfic = this.props.deleteFanfic
    return (
      <div className="adminFanfics">
        <div className="fanficsCont">                   
          {fanfics ? fanfics.map((fanfic, key) => {
            return (
              <div className="fanficItem" key={key}>
                <h1>{fanfic.title}</h1>                
                <Link className="navBarItem" to={"/adminPage/fanfics/edit/" + fanfic.id}><button>Edit</button></Link>
                <button onClick={() => deleteFanfic(fanfic.id, this.props.token)}>Delete</button>
              </div>
            )
          }) : ( 
            <div className="fanficItem" />
          )}
        </div>
      </div>
    )
  }
}
