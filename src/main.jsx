import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// از اولین لحظه تم درست لود بشه (بدون فلش سفید/تیره)
const savedTheme = localStorage.getItem('darkMode')
if (savedTheme === 'false') {
  document.documentElement.classList.remove('dark')
} else {
  document.documentElement.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)