import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>Login</>} />
        <Route path="/cadastro" element={<>Cadastro</>} />
        <Route path="/home" element={<>Home</>} />
        <Route path="/leads" element={<>leads</>} />
        <Route path="/perfil" element={<>perfil</>} />
      </Routes>
    </Router>
  )
}

export default App
