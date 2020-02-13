import React from 'react'

const News = props => {
  const date = new Date(props.date).toDateString()
  return (
    <li className="artical">
      <a href={props.url} className="artical_link">
        <div className="artical_data">
          <div>
            <p className="artical_data_publisher">{props.source}</p>
            <span className="artical_data_date">{date}</span>
          </div>
          <h3 className="artical_data_headline">{props.headline}</h3>
          <p className="artical_data_content">{props.summary}</p>
        </div>
        <div className="artical_image">
          <img src={props.image} alt="artical" />
        </div>
      </a>
    </li>
  )
}

export default News
