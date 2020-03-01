import React from 'react'
import { v4 as uuid } from 'uuid'
export default function HoldingsList(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost Per Share</th>
            <th>Yield</th>
            <th>Equity</th>
            <th>Price</th>
            <th>Annual Income</th>
          </tr>
          {props.holdings.map(company => (
            <tr key={uuid()}>
              <td>{company.ticker.toUpperCase()}</td>
              <td>{company.shares}</td>
              <td>{company.avgPricePaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
