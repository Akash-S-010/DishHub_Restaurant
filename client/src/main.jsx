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
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-off-white)',
            color: 'var(--color-black)',
            fontWeight: 'bold',
            border: '2px solid var(--color-primary)'
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
