import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--color-card)',
            color: 'var(--color-off-white)',
            border: '1px solid var(--color-surface)'
          },
          success: {
            iconTheme: { primary: 'var(--color-success)', secondary: 'var(--color-bg)' }
          },
          error: {
            iconTheme: { primary: 'var(--color-accent)', secondary: 'var(--color-bg)' }
          }
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
