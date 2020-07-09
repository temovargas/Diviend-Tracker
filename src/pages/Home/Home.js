import React, { Component } from 'react'

import axios from 'axios'
import { getHoldingsData, batchformatArary } from '../../utils/herlper'
import FormContainer from '../../compoents/FormContainer'
import Input from '../../compoents/Input/Input'
import Modal from '../../compoents/Modal'
import HoldingsList from '../../compoents/HoldingsList/HoldingsList'

import holdingData from '../../holdings.json'

import './Home.css'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      tickerInput: '',
      sharesInput: '',
      avgPricePaidInput: '',
      holdings: []
    }
    this.handleAddNewHolding = this.handleAddNewHolding.bind(this)
  }

  componentDidMount() {
    // 1. load data from the json file
    this.setState({ holdings: holdingData }, () => {
      // 2. get data for each company from the api
      getHoldingsData(this.state.holdings).then(data => {
        this.setState({ holdings: [...data] })
      })
    })
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  handleHoldingsRender = () => {
    const { holdings } = this.state
    // if user has any holdings render the list of companies
    if (holdings.length !== 0) {
      return <HoldingsList holdings={this.state.holdings} />
    } else {
      return <p>Please add a new position to your portfolio</p>
    }
  }

  handleInputChange = evt => {
    const value = evt.target.value.toUpperCase()
    this.setState({
      ...this.state,
      [evt.target.name]: `${value}`
    })
  }

  // call to handle a signle holding.
  async handleAddNewHolding(event) {
    event.preventDefault()
    const { tickerInput, sharesInput, avgPricePaidInput } = this.state

    // get stock data
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickerInput}&types=dividends&range=1y&token=${process.env.REACT_APP_IXE_API_KEY}`
    )

    // format the data that is returned
    const formattedNewStock = batchformatArary(response)[0]
    // format the whole object with every data set needed
    const fomattedStockObject = {
      ...formattedNewStock,
      shares: sharesInput,
      avgPricePaid: avgPricePaidInput
    }

    // set state
    this.setState(state => {
      return {
        showModal: false,
        tickerInput: '',
        sharesInput: '',
        avgPricePaidInput: '',
        holdings: [...state.holdings, fomattedStockObject]
      }
    })
  }

  render() {
    const { showModal } = this.state

    return (
      <>
        <h2 className="profolio_name">My Porfolio</h2>
        {showModal ? (
          <Modal>
            <FormContainer className={'holding_form'}>
              <Input
                className="holding_form_input"
                name="tickerInput"
                title="Ticker"
                type="text"
                placeholder="Ticker Symbol"
                handleChange={this.handleInputChange}
              />
              <Input
                className="holding_form_input"
                name="sharesInput"
                title="Shares"
                type="text"
                placeholder="Number of shares"
                handleChange={this.handleInputChange}
              />
              <Input
                className="holding_form_input"
                name="avgPricePaidInput"
                title="Avg Prigice Paid"
                type="text"
                placeholder="Price"
                handleChange={this.handleInputChange}
              />
              <div className="buttons">
                <button
                  type="submit"
                  className="btn btn__confirm"
                  onClick={this.handleAddNewHolding}
                >
                  Add
                </button>
                <button className=" btn btn__alert" onClick={this.toggleModal}>
                  Cancel
                </button>
              </div>
            </FormContainer>
          </Modal>
        ) : null}
        {this.handleHoldingsRender()}
        <button className={' btn btn__cta'} onClick={this.toggleModal}>
          Add holdings
        </button>
      </>
    )
  }
}
