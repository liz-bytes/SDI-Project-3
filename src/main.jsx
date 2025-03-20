import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

//Component Imports
import App from './App.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import BN_Dashboard from './Components/Dashboard/BN_Commander.jsx';

// const router = createBrowserRouter([
//   {path: "/", element:
//     <App>
//       <Home/>
//     </App>
//   },
//   {path: "/BN_Commander", element:
//     <App>
//       <BN_Commander/>
//     </App>
//   },
// ]);