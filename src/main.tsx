import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider } from 'react-router'
import router from './router/router.tsx'
  import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
    <ToastContainer position="top-center" autoClose={3000}/>
    <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)
