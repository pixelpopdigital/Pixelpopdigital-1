import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar visible={!loading} />
      <Routes>
        <Route
          path="/"
          element={<HomePage loading={loading} setLoading={setLoading} />}
        />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
