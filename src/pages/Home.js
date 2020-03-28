import React, { Component } from 'react'
import currency from 'currency.js'
import axios from 'axios'
import { getHoldingsData } from '../utils/herlper'
import FormContainer from '../compoents/FormContainer'
import Input from '../compoents/Input'
import Modal from '../compoents/Modal'
import HoldingsList from '../compoents/HoldingsList'
export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      tickerInput: '',
      sharesInput: '',
      avgPricePaidInput: '',
      holdings: [
        {
          ticker: 'CCI',
          shares: '4',
          avgPricePaid: '145.32',
          lastDividend: '',
          frequency: '',
          yearlyDividend: ''
        },
        {
          ticker: 'T',
          shares: '4',
          avgPricePaid: '30',
          lastDividend: '',
          frequency: '',
          yearlyDividend: ''
        },
        {
          ticker: 'O',
          shares: '4',
          avgPricePaid: '145',
          lastDividend: '',
          frequency: '',
          yearlyDividend: ''
        }
      ]
    }
  }

  componentDidMount() {
    getHoldingsData(this.state.holdings).then(data => {
      this.setState({ holdings: [...data] })
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

  handleAddHolding = evt => {
    evt.preventDefault()
    const { tickerInput, sharesInput, avgPricePaidInput, holdings } = this.state
    // get all companines the user ownes
    holdings.map((company, id) => {
      if (company.ticker === tickerInput) {
        const arrayItiemId = id

        // add all the shares
        const updatedShares = currency(company.shares)
          .add(sharesInput)
          .format()
        // add all the shares
        // MIGHT REMOVE
        const updatedAvgPricePaid = currency(company.avgPricePaid)
          .add(avgPricePaidInput)
          .format()

        const updatedArray = {
          ...company,
          shares: updatedShares,
          avgPricePaid: updatedAvgPricePaid
        }
        // remove current company from array
        holdings.splice(arrayItiemId, 1)
        // push updated company array
        holdings.push(updatedArray)

        this.setState({
          holdings: holdings
        })
      } else {
        const newHolding = {
          ticker: tickerInput,
          shares: sharesInput,
          avgPricePaid: avgPricePaidInput
        }
        // reset inputs,
        // hide modal
        // add holdings
        this.setState({
          showModal: false,
          tickerInput: '',
          sharesInput: '',
          avgPricePaidInput: '',
          holdings: [...this.state.holdings, newHolding]
        })
      }
    })
  }

  render() {
    const { showModal } = this.state

    return (
      <div>
        <h2>My Porfolio</h2>
        {showModal ? (
          <Modal>
            <FormContainer className="holding_form">
              <Input
                name="tickerInput"
                title="Ticker"
                type="text"
                placeholder="Ticker Symbol"
                handleChange={this.handleInputChange}
              />
              <Input
                name="sharesInput"
                title="Shares"
                type="text"
                placeholder="Number of shares"
                handleChange={this.handleInputChange}
              />
              <Input
                name="avgPricePaidInput"
                title="Avg Prigice Paid"
                type="text"
                placeholder="Price"
                handleChange={this.handleInputChange}
              />
              <button type="submit" onClick={this.handleAddHolding}>
                Add
              </button>
              <button onClick={this.toggleModal}>Cancel</button>
            </FormContainer>
          </Modal>
        ) : null}
        {this.handleHoldingsRender()}
        <button onClick={this.toggleModal}>Add holdings</button>
      </div>
    )
  }
}
