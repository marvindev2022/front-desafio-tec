import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRoutes from './Router'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainRoutes/>
  </React.StrictMode>,
)
