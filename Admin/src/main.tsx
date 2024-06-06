import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <PersistGate persistor={persistor}>
<Provider store={store}>
<App />
</Provider>

   </PersistGate>
  </React.StrictMode>,
)
