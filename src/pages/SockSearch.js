import React, { Component } from 'react'
import axios from 'axios'
// import components
import NewsList from '../compoents/NewsList'
import Input from '../compoents/Input/Input'
import FormContainer from '../compoents/FormContainer'

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
