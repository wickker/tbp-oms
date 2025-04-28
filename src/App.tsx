import { Route, Routes } from 'react-router'
import Main from './views/Main'

const App = () => (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route element={<NavigationBar />}>
        <Route element={<ScopesRequired />}>
          <Route element={<SocketRequired />}>
            <Route
              path={Path.DASHBOARD}
              element={<div>Live Chat Dashboard Page</div>}
            />
            <Route path={Path.CHAT} element={<Chat />} />
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<Fallback />} /> */}
    </Routes>
)

export default App
