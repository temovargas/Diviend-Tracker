import React from 'react'
import { v4 as uuid } from 'uuid'
import currency from 'currency.js'

export default function HoldingsList(props) {
  return (
    <>
      <table className="holdings__table">
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost Per Share</th>
            <th>Equity</th>
            <th>Annual Income</th>
            <th>Frequency</th>
            <th>Last Dividend</th>
          </tr>
          {props.holdings.map(company => {
            const {
              ticker,
              shares,
              avgPricePaid,
              frequency,
              lastDividend,
              yearlyDividend
            } = company

            return (
              <tr key={uuid()}>
                <td>{ticker}</td>
                <td>{shares}</td>
                <td>{avgPricePaid}</td>
                <td>
                  {currency(avgPricePaid)
                    .multiply(shares)
                    .format(true)}
                </td>
                <td>
                  {currency(shares)
                    .multiply(yearlyDividend)
                    .format(true)}
                </td>
                <td>{frequency}</td>
                <td>{currency(lastDividend).format(true)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
