import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import MirrorApp from './MirrorApp.jsx'
import ControlApp from './ControlApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MirrorApp />} />
        <Route path="/control" element={<ControlApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
