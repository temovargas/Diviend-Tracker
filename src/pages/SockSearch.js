import React, { Component } from 'react'
// import components
import NewsList from '../compoents/NewsList'
import Input from '../compoents/Input/Input'
import FormContainer from '../compoents/FormContainer'
import { fetchStockDataBatch } from '../utils/herlper'

class SockSearch extends Component {
  state = { inputText: '', company: {}, news: [], quote: {} }

  fetchData = async event => {
    event.preventDefault()

    const ticker = this.state.inputText
    const stockData = await fetchStockDataBatch(ticker)

    this.setState({
      ...stockData
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
