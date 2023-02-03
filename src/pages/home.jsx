import { Link } from 'react-router-dom'

import { Title } from '@/features/ui'

export function Home() {
  return (
    <div>
      <Title text="Welcome home!" />
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </div>
  )
}
