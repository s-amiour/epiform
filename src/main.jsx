// React lib manages Virtual DOM. It handles components, states, and performs
// the "Diffing" algorithm to compare this DOM with the actual DOM.
import React from 'react'
// ReactDOM manages the Actual DOM. It receives the instructions from React to render into the
// Actual DOM.
import ReactDOM from 'react-dom/client'
// Global styling (for all components)
import './index.css'
// Whole application layout (with its components)
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    // Strict Mode is a wrapper of your app that checks for unsafe or deprecated usages
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
