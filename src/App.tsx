import { Route, Routes } from 'react-router'
import Main from './views/Main'

const App = () => (
  <Routes>
    <Route path='/' element={<Main />} />
  </Routes>
)

export default App
