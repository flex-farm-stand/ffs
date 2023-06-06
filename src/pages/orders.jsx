import { useOrdersAsABuyer, OrderList } from '@/features/orders'
import { CenterAndLimitWidth } from '@/features/ui'

export function Orders() {
  const ordersAsABuyer = useOrdersAsABuyer()

  return (
    <CenterAndLimitWidth>
      <OrderList ordersAsABuyer={ordersAsABuyer} />
    </CenterAndLimitWidth>
  )
}
