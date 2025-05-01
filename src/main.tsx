import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import SignIn from './modules/pages/SignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
