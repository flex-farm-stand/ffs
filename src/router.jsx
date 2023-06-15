import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { App } from '@/features/layout'
import { ProtectedWrapper } from '@/features/users'
import * as pages from '@/pages'

const elements = (
  <Route path="/" element={<App />} errorElement={<pages.Error />}>
    <Route index={true} element={<pages.Home />} />
    <Route path="/about" element={<pages.About />} />
    <Route
      path="/inventory"
      element={
        <ProtectedWrapper>
          <pages.Inventory />
        </ProtectedWrapper>
      }
    />
    <Route
      path="/orders"
      element={
        <ProtectedWrapper>
          <pages.Orders />
        </ProtectedWrapper>
      }
    />
    <Route path="/product/:id" element={<pages.Product />} />
    <Route
      path="/profile"
      element={
        <ProtectedWrapper>
          <pages.Profile />
        </ProtectedWrapper>
      }
    />
    <Route path="/login" element={<pages.Login />} />
    <Route path="/signup" element={<pages.SignUp />} />
  </Route>
)

export const router = createBrowserRouter(createRoutesFromElements(elements))
