import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TimerApp from './components/TimerApp.jsx'
import './css/TimerApp.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimerApp />
  </StrictMode>,
)
