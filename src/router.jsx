import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

function Test() {
  return <div>Test</div>
}

const elements = <Route path="/" element={<Test />}></Route>

export const router = createBrowserRouter(createRoutesFromElements(elements))
