import { MdOutlineClose } from 'react-icons/md'
import styled from 'styled-components'

import { Button, Title } from '@/features/ui'
import { capitalize, parseDate } from '@/features/utils'

const emptyListText = "You haven't made any orders so far."

function VanillaFilter({ className, filterRef, onChange, query, resetQuery }) {
  return (
    <div className={className}>
      <input
        onChange={onChange}
        placeholder="Search by ID or Seller"
        ref={filterRef}
        type="text"
        value={query}
      />
      <Button onClick={resetQuery} style="text">
        <MdOutlineClose />
      </Button>
    </div>
  )
}

const Filter = styled(VanillaFilter)`
  & {
    border: 1px solid
      ${(props) =>
        props.query ? props.theme.body.secondary : props.theme.body.dim};
    border-radius: 5px;
    display: flex;
    padding: 5px;
  }
  &:focus-within {
    outline: 2px solid powderblue;
  }
  input {
    background-color: unset;
    border: none;
    flex-grow: 2;
    margin-right: 5px;
  }
  input:focus {
    outline: none;
  }
  input,
  button {
    color: ${(props) =>
      props.query ? props.theme.body.text : props.theme.form.border};
  }
`

function Greeting({ count, countFiltered, query }) {
  return (
    <p>
      {query
        ? `Showing ${countFiltered} order${
            countFiltered > 1 ? 's' : ''
          } that matched your query.`
        : count
        ? `You have made ${count} orders.`
        : emptyListText}
    </p>
  )
}

function VanillaIcon({ className, imageUrl }) {
  return <img alt="Order icon" className={`icon ${className}`} src={imageUrl} />
}
const Icon = styled(VanillaIcon)`
  max-height: 85px;
  max-width: 85px;
`

function VanillaIconFiller({ className }) {
  return <div className={`icon ${className}`}>Icon Missing</div>
}
const IconFiller = styled(VanillaIconFiller)`
  align-items: center;
  background-color: ${({ theme }) => theme.missing.bg};
  color: ${({ theme }) => theme.missing.text};
  display: flex;
  font-size: 0.9rem;
  height: 85px;
  text-align: center;
  user-select: none;
  width: 85px;
`

const List = styled.ul`
  & {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin-top: 16px;
  }
  article {
    border: 2px solid ${({ theme }) => theme.body.dim};
    border-radius: 5px;
  }
  section {
    display: flex;
  }
  section.heading {
    & {
      background-color: ${({ theme }) => theme.menu.bg};
      border-bottom: 2px solid ${({ theme }) => theme.body.dim};
      border-radius: 5px 5px 0 0;
      font-size: 0.8rem;
      padding: 8px;
    }
    & > div {
      margin-right: 15px;
    }
    & > div:last-child {
      flex-grow: 1;
      margin-right: 0;
      text-align: right;
    }
    .title {
      font-size: 0.7rem;
      text-transform: uppercase;
    }
  }
  section.body {
    & {
      align-items: center;
    }
    .icon {
      margin: 8px;
    }
    .seller {
      font-size: 0.8rem;
    }
    .seller label {
      color: ${({ theme }) => theme.body.secondary};
    }
  }
`

function ListItem({ order: { date, id, imageUrl, name, price, seller } }) {
  const formattedDate = parseDate(date)
  return (
    <li>
      <article>
        <section className="heading">
          <div>
            <div className="title">Order placed</div>
            <div>{formattedDate}</div>
          </div>
          <div>
            <div className="title">Total</div>
            <div>{price}</div>
          </div>
          <div>
            <div className="title">Order # {id.slice(0, 5)}</div>
          </div>
        </section>
        <section className="body">
          {imageUrl ? <Icon imageUrl={imageUrl} /> : <IconFiller />}
          <div>
            <div>{capitalize(name)}</div>
            <div className="seller">
              <label>Sold by: </label>
              <span>{seller}</span>
            </div>
          </div>
        </section>
      </article>
    </li>
  )
}

export function OrderList({
  filterRef,
  onChangeQuery,
  ordersAsABuyer: { data, error, isError, isLoading },
  query,
  resetQuery,
}) {
  const ordersFiltered = data?.filter(matchesIdOrSeller)
  const orders = query ? ordersFiltered : data

  function matchesIdOrSeller({ id, seller }) {
    return (
      id.startsWith(query) || seller.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div>
      <Title text="Orders" />
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Greeting
            count={data.length}
            countFiltered={ordersFiltered.length}
            query={query}
          />
          <Filter
            filterRef={filterRef}
            onChange={onChangeQuery}
            query={query}
            resetQuery={resetQuery}
          />
          <List>
            {orders.map((order) => (
              <ListItem key={order.id} order={order} />
            ))}
          </List>
        </>
      )}
    </div>
  )
}
