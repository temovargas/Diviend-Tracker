import currency from 'currency.js'
import axios from 'axios'
// calc the yearly dividend pay
// (lastDividendPayed * frequency)  = yearlyDividendPay
export const calcDiviendPay = (lastDividendPayed, frequency) => {
  let yearlyDividendPay = currency(lastDividendPayed)
  if (frequency === 'annual') {
    yearlyDividendPay = yearlyDividendPay.multiply(2)
  } else if (frequency === 'quarterly') {
    yearlyDividendPay = yearlyDividendPay.multiply(4)
  } else if (frequency === 'monthly') {
    yearlyDividendPay = yearlyDividendPay.multiply(12)
  }
  return yearlyDividendPay.format()
}

export let getHoldingsData = async holdings => {
  // get all tickers
  if (holdings.length > 0) {
    const companies = holdings.map(company => {
      return company.ticker
    })
    // turn tickers into string to search
    const companiesString = companies.toString()

    let res = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${companiesString}&types=dividends&range=1y&token=${process.env.REACT_APP_IXE_API_KEY}`
    )

    let dividends = res.data
    // format array for better readablity
    const data = Object.entries(dividends)
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
    let currentHoldings = holdings
    // TESTING FORM
    let newState = []
    // new array with state
    formattedArry.map(formattedArray => {
      currentHoldings.map(holdingArray => {
        if (formattedArray.ticker === holdingArray.ticker) {
          console.log(formattedArray.ticker, holdingArray.ticker)
          newState.push({
            ...holdingArray,
            ...formattedArray
          })
        }
      })
    })
    // return new state
    return newState
  }
}
