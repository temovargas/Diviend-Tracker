import currency from 'currency.js'
import axios from 'axios'
// calc the yearly dividend pay
// (lastDividendPayed * frequency)  = yearlyDividendPay

/**
 * Calculates the yealy diviend using the
 * last dividend payed and the frequency
 * at which the stock pays.
 *
 * @param {string} lastDividendPayed - last dividend payed
 * @param {string} frequency - annual, quarterly, monthly
 *
 * @return {string} a string of the total amount payed
 *
 * @example
 *     calcDiviendPay('.34', 'annual')
 */
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

export const getHoldingsData = async holdings => {
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
/**
 * Gets quote, company and news for the ticker
 *
 * @param {string} ticker - ticker symbol
 * @return {array} an array with all the stock data
 *
 * @example
 *     fetchStockData('T')
 *     fetchStockData('t')
 */
export async function fetchStockDataBatch(ticker) {
  const response = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${ticker}/batch?types=quote,company,news&token=${process.env.REACT_APP_IXE_API_KEY}`
  )
  return await response.data
}
