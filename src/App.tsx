import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { Login, Registration, Home, Leads, Profile } from './pages'
import Cookies from 'js-cookie'

function App() {
  const ProtectedRoute = () => {
    const checkAuthCookie = Cookies.get('Authorization')
    if (!checkAuthCookie) {
      alert('Você precisa estar logado para acessar essa página')
      return <Navigate to="/" replace />
    }
    return <Outlet />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Registration />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
