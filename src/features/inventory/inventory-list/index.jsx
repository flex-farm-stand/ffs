import styled from 'styled-components'

import { Title } from '@/features/ui'

const emptyInventoryText = 'There are no items in your inventory at the moment.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  max-width: 600px;
  overflow-x: auto;
`

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
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const ths = ({ name, display, Component }) => (
  <th key={name}>{display || <Component />}</th>
)

export function InventoryList({ attributes, handleCheckboxChange, inventory }) {
  const tbody = inventory.map((item) => (
    <tr key={item.index}>
      {attributes.map(({ name }) =>
        name === 'price' ? (
          <td key={name}>{'$' + item[name].toFixed(2)}</td>
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
    <Container>
      <Title text="Inventory" />
      <Greeting count={!inventory ? 0 : inventory.length} />
      <Table>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </Container>
  )
}
