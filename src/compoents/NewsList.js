import React, { Component } from 'react'
import uuid from 'uuid/v4'

// import components
import News from './News'

class NewsList extends Component {
  render() {
    const news = this.props.news
    const newsArray = Object.values(news)

    const renderNews = newsArray.map(artical => (
      <News
        key={uuid()}
        headline={artical.headline}
        source={artical.source}
        summary={artical.summary}
        date={artical.datetime}
        url={artical.url}
        image={artical.image}
      ></News>
    ))

    return (
      <div className="new_list">
        <h2 className="new_list_heading">News</h2>
        {this.props.news && renderNews}
      </div>
    )
  }
}

export default NewsList
