import React, { Component } from 'react'
import axios from 'axios'
import { calcDiviendPay } from '../utils/herlper'
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
          avgPricePaid: '145'
        },
        {
          ticker: 'T',
          shares: '4',
          avgPricePaid: '145'
        },
        {
          ticker: 'O',
          shares: '4',
          avgPricePaid: '145'
        }
      ]
    }
  }

  componentDidMount() {
    if (this.state.holdings.length > 0) {
      const companies = this.state.holdings.map(company => {
        return company.ticker
      })
      const companiesString = companies.toString()
      axios
        .get(
          `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${companiesString}&types=dividends&range=1y&token=${process.env.REACT_APP_IXE_API_KEY}`
        )
        .then(dividends => {
          /* I needed to format the retured object
           so I can read it better, and I don't need 
           all the infomation
          */
          const data = Object.entries(dividends.data)
          const formattedArry = []
          // format object
          for (const key in data) {
            const element = data[key]
            const lastDividend = element[1].dividends[0].amount
            const frequency = element[1].dividends[0].frequency
            const yearlyDividend = calcDiviendPay(lastDividend, frequency)
            // push to new array
            formattedArry.push({
              ticker: element[0],
              lastDividend,
              frequency,
              yearlyDividend
            })
          }
          // update holding with lastDividend,frequency,yearlyDividend
          let currentHoldings = this.state.holdings
          // TESTING FORM
          let newState = []

          formattedArry.map((formattedArray, index) => {
            currentHoldings.map((holdingArray, index) => {
              if (formattedArray.ticker == holdingArray.ticker) {
                console.log(formattedArray.ticker, holdingArray.ticker)
                newState.push({ ...formattedArray, ...holdingArray })
              }
            })
          })
          this.setState({ holdings: [...newState] }, () => {
            console.log('FINAL STATE:', this.state.holdings)
          })
        })
    }
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
    const { tickerInput, sharesInput, avgPricePaidInput } = this.state

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
