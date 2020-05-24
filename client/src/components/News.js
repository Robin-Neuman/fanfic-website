import React from 'react'

export default class News extends React.Component {
  render() {
    const news = this.props.news.news
    return (
      <div>
        <div className="news">
          {news ? news.map((newsItem, key) => {
            return (
              <div className="newsItem" key={key}>
                <h1>{newsItem.title}</h1>
                <p>{newsItem.content}</p>
                <p>{newsItem.created}</p>
              </div>
            )
          }
          ) : (
            <div className="news" />
          )}
        </div>
      </div>
    )
  }
}
