import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { Home } from './pages'

const elements = <Route path="/" element={<Home />}></Route>

export const router = createBrowserRouter(createRoutesFromElements(elements))
