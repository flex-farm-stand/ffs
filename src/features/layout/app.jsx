import { Outlet } from 'react-router-dom'
import './index.css'

export function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  )
}
