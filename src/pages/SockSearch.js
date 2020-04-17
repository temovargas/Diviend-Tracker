import React, { Component } from 'react'
import axios from 'axios'
// import components
import NewsList from '../compoents/NewsList'

class SockSearch extends Component {
  state = { inputText: '', company: {}, news: [], quote: {} }

  fetchData = event => {
    event.preventDefault()

    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${this.state.inputText}/batch?types=quote,company,news&token=${process.env.REACT_APP_IXE_API_KEY}`
      )
      .then(res => {
        console.log(res.data)
        this.setState({
          ...res.data
        })
      })
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      inputText: e.target.value
    })
  }

  render() {
    return (
      <section className="stock_search">
        <form onSubmit={this.fetchData}>
          <input
            className="stock_search_input"
            value={this.state.inputText}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter Stock Ticker"
          />
          <button type="submit" disabled={!this.state.inputText}>
            Search
          </button>
        </form>
        <NewsList news={this.state.news} />
      </section>
    )
  }
}

export default SockSearch
