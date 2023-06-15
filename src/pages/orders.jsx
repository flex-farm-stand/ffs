import { useRef, useState } from 'react'

import { useOrdersAsABuyer, OrderList } from '@/features/orders'
import { CenterAndLimitWidth } from '@/features/ui'

export function Orders() {
  const filterRef = useRef(null)
  const [query, setQuery] = useState('')
  const ordersAsABuyer = useOrdersAsABuyer()

  function onChangeQuery(e) {
    setQuery(e.target.value)
  }
  function resetQuery() {
    setQuery('')
    filterRef.current.focus()
  }

  return (
    <CenterAndLimitWidth>
      <OrderList
        filterRef={filterRef}
        onChangeQuery={onChangeQuery}
        resetQuery={resetQuery}
        ordersAsABuyer={ordersAsABuyer}
        query={query}
      />
    </CenterAndLimitWidth>
  )
}
