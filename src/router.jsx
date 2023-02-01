import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { App } from '@/features/layout'
import { About, Home } from '@/pages'

const elements = (
  <Route path="/" element={<App />}>
    <Route index={true} element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
)

export const router = createBrowserRouter(createRoutesFromElements(elements))
