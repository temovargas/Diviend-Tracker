import React, { Component } from 'react'
// import components
import NewsList from '../compoents/News/NewsList'
import Input from '../compoents/Input/Input'
import FormContainer from '../compoents/FormContainer/FormContainer'

import axios from 'axios'
class SockSearch extends Component {
  state = { inputText: '', company: {}, news: [], quote: {} }

  fetchData = async event => {
    event.preventDefault()

    const ticker = this.state.inputText
    const response = axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/news?&token=${process.env.REACT_APP_IXE_API_KEY}`
    )
    const stockData = await response
    this.setState({
      news: [...stockData.data]
    })
  }

  handleChange = e => {
    const value = e.target.value.toUpperCase()
    this.setState({
      ...this.state,
      inputText: value
    })
  }

  render() {
    return (
      <section className="stock_search">
        <FormContainer onSubmit={this.fetchData}>
          <Input
            name="Ticker Name"
            title="Enter ticker"
            type="text"
            handleChange={this.handleChange}
            value={this.state.inputText}
            placeholder="Enter Stock Ticker"
          />
          <button
            className="btn btn__confirm {"
            type="submit"
            disabled={!this.state.inputText}
          >
            Search
          </button>
        </FormContainer>
        <NewsList news={this.state.news} />
      </section>
    )
  }
}

export default SockSearch
