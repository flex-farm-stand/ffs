import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Title } from '@/features/ui'
import { capitalize } from '@/features/utils'

const emptyInventoryText = 'There are no items in your inventory at the moment.'

function Greeting({ count }) {
  return (
    <p>
      {count ? `You have ${count} items in your inventory` : emptyInventoryText}
    </p>
  )
}

const Table = styled.table`
  & {
    border-collapse: collapse;
    margin: 0 auto;
    width: 100%;
  }
  th {
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.table.border};
  }
  th,
  td {
    padding: 0 0.3rem;
  }
  tr {
    height: 2.5rem;
  }
  tbody > tr:nth-child(even) {
    background-color: ${({ theme }) => theme.table.bg};
  }
  tbody > tr:hover {
    background-color: ${({ theme }) => theme.table.bgHover};
  }
`

// Helper functions for mapping over
//  - table heading attributes
//  - table row values
//  - table rows
const ths = ({ name, display, Component }) => (
  <th key={name}>{display || <Component />}</th>
)

export function InventoryList({ attributes, handleCheckboxChange, inventory }) {
  const tbody = inventory.map((item) => (
    <tr key={item.index}>
      {attributes.map(({ name }) =>
        name === 'price' ? (
          <td key={name}>{'$' + item[name].toFixed(2)}</td>
        ) : name === 'name' ? (
          <td key={name}>
            <Link to={item.url}>{capitalize(item[name])}</Link>
          </td>
        ) : name === 'checked' ? (
          <td key={name}>
            <input
              onChange={() => handleCheckboxChange(item.index)}
              type="checkbox"
              checked={item[name]}
            />
          </td>
        ) : (
          <td key={name}>{capitalize(item[name])}</td>
        )
      )}
    </tr>
  ))
  const thead = attributes.map(ths)

  return (
    <div>
      <Title text="Inventory" />
      <Greeting count={!inventory ? 0 : inventory.length} />
      <Table>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </div>
  )
}
