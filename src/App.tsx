import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import './App.css'

function AppInner() {
  const [loading, setLoading] = useState(true)
  const { pathname } = useLocation()

  // The navbar is gated on the loader only on the home page.
  // Any other route (e.g. /work loaded directly) shows it immediately.
  const navVisible = pathname !== '/' || !loading

  return (
    <>
      <ScrollToTop />
      <Navbar visible={navVisible} />
      <Routes>
        <Route
          path="/"
          element={<HomePage loading={loading} setLoading={setLoading} />}
        />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}

export default App
