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

function TableBody({ attributes, data, handleCheckboxChange }) {
  const inner = data.map((d) => (
    <tr key={d.index}>
      {attributes.map(({ name }) => (
        <td key={name}>
          {name === 'name' ? (
            <Link to={d.url}>{d[name]}</Link>
          ) : name === 'checked' ? (
            <input
              onChange={() => handleCheckboxChange(d.index)}
              type="checkbox"
              checked={d[name]}
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
  const inner = attributes.map(({ name, display, Component }) => (
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
  data,
  error,
  handleCheckboxChange,
  status,
}) {
  return (
    <div>
      <Title text="Inventory" />
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Greeting count={!data ? 0 : data.length} />
          <Table>
            <TableHead attributes={attributes} />
            <TableBody
              attributes={attributes}
              data={data}
              handleCheckboxChange={handleCheckboxChange}
            />
          </Table>
        </>
      )}
    </div>
  )
}
