import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Title } from '@/features/ui'

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

function TableBody({ attributes, checkMarks, data, handleCheckboxChange }) {
  const inner = data.map((d, i) => (
    <tr key={i}>
      {attributes.map(({ name }) => (
        <td key={name}>
          {name === 'name' ? (
            <Link to={d.url}>{d[name]}</Link>
          ) : name === 'checked' ? (
            <input
              checked={checkMarks[i] ? 'checked' : ''}
              onChange={() => handleCheckboxChange(i)}
              type="checkbox"
            />
          ) : (
            d[name]
          )}
        </td>
      ))}
    </tr>
  ))

  return <tbody>{inner}</tbody>
}

function TableHead({ attributes }) {
  const inner = attributes.map(({ Component, name, display }) => (
    <th key={name}>{display || <Component />}</th>
  ))

  return (
    <thead>
      <tr>{inner}</tr>
    </thead>
  )
}

export function InventoryList({
  attributes,
  checkMarks,
  fetchProductsBySeller,
  handleCheckboxChange,
}) {
  return (
    <div>
      <Title text="Inventory" />
      {fetchProductsBySeller.status === 'loading' ? (
        'Loading...'
      ) : fetchProductsBySeller.status === 'error' ? (
        <span>Error: {fetchProductsBySeller.error.message}</span>
      ) : (
        <>
          <Greeting
            count={
              !fetchProductsBySeller.data
                ? 0
                : fetchProductsBySeller.data.length
            }
          />
          <Table>
            <TableHead attributes={attributes} />
            <TableBody
              attributes={attributes}
              checkMarks={checkMarks}
              data={fetchProductsBySeller.data}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Table>
        </>
      )}
    </div>
  )
}
