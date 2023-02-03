import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import { App } from '@/features/layout'
import { RequireAuth } from '@/features/users'
import { About, Home, Login, Profile, SignUp } from '@/pages'

const elements = (
  <Route path="/" element={<App />}>
    <Route index={true} element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route
      path="/profile"
      element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>
)

export const router = createBrowserRouter(createRoutesFromElements(elements))
