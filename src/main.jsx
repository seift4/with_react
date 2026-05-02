import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// إحنا هنا بنقول لـ React: "خد كل حاجة في App وحطها جوه الـ div اللي الـ id بتاعه root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)