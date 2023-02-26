import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { App } from '@/features/layout'
import { RequireAuth } from '@/features/users'
import * as pages from '@/pages'

const elements = (
  <Route path="/" element={<App />} errorElement={<pages.Error />}>
    <Route index={true} element={<pages.Home />} />
    <Route path="/about" element={<pages.About />} />
    <Route
      path="/inventory"
      element={
        <RequireAuth>
          <pages.Inventory />
        </RequireAuth>
      }
    />
    <Route
      path="/profile"
      element={
        <RequireAuth>
          <pages.Profile />
        </RequireAuth>
      }
    />
    <Route path="/login" element={<pages.Login />} />
    <Route path="/signup" element={<pages.SignUp />} />
  </Route>
)

export const router = createBrowserRouter(createRoutesFromElements(elements))
