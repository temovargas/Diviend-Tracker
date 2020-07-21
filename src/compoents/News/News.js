import React from 'react'
import './News.css'
const News = props => {
  const date = new Date(props.date).toDateString()
  return (
    <div className="artical">
      <a href={props.url} className="artical_link artical_wrapper"></a>

      <div className="artical_data">
        <div>
          <p className="artical_data_publisher">{props.source}</p>
          <span className="artical_data_date">{date}</span>
        </div>
        <h3 className="artical_data_headline">{props.headline}</h3>
        <p className="artical_data_content">{props.summary}</p>
      </div>
    </div>
  )
}

export default News
