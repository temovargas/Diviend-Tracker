import currency from 'currency.js'

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
