import { Link } from 'react-router-dom'

import { Title } from '@/features/ui'

export function Home() {
  return (
    <div>
      <Title text="Welcome home!" />
      <Link to="/about">About</Link>
    </div>
  )
}
