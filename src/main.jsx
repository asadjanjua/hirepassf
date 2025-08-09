//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  {/* <StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  {/* </StrictMode> */}
  </Provider>
)
