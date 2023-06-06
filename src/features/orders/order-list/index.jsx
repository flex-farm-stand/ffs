import styled from 'styled-components'

import { Title } from '@/features/ui'

const emptyListText = "You haven't made any orders so far."

const FillerIcon = styled.div`
  align-items: center;
  background-color: #ddd;
  color: red;
  display: flex;
  font-size: 0.9rem;
  height: 85px;
  text-align: center;
  width: 85px;
`

function Greeting({ count }) {
  return <p>{count ? `You have made ${count} orders.` : emptyListText}</p>
}

const List = styled.ul`
  & {
    list-style: none;
    padding: 0;
  }
  article {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 85px 1fr 1fr;
    grid-template-areas: 'icon detail-1 detail-2';
    grid-gap: 8px;
    justify-items: start;
    align-items: center;
  }
  li {
    border-bottom: 1px solid ${({ theme }) => theme.body.dim};
    margin: 1rem 0;
    padding-bottom: 16px;
  }
  li:last-child {
    border-bottom: none;
  }
  .icon {
    grid-area: icon;
  }
  .detail-1 {
    grid-area: detail-1;
  }
  .detail-1 {
    grid-area: detail-1;
  }

  @media (width < 480px) {
    article {
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 85px 1fr;
      grid-template-areas:
        'icon detail-1'
        'icon detail-2';
    }
  }
`

function ListItem({ order: { date, id, price, seller } }) {
  return (
    <li>
      <article>
        <FillerIcon className="icon">Icon Missing</FillerIcon>
        <div className="detail-1">
          <div>
            <b>Order ID: </b>
            {id.slice(0, 5)}
          </div>
          <div>
            <b>Date: </b>
            {date}
          </div>
        </div>
        <div className="detail-2">
          <div>
            <b>Seller: </b>
            {seller}
          </div>
          <div>
            <b>Total: </b>
            {price}
          </div>
        </div>
      </article>
    </li>
  )
}

export function OrderList({
  ordersAsABuyer: { data, error, isError, isLoading },
}) {
  return (
    <div>
      <Title text="Orders" />
      {isLoading ? (
        'Loading...'
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Greeting count={!data ? 0 : data.length} />
          <List>
            {data.map((order) => (
              <ListItem key={order.id} order={order} />
            ))}
          </List>
        </>
      )}
    </div>
  )
}
