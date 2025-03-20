import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home.jsx';
import BN_Dashboard from './Components/Dashboard/BN_Commander.jsx';
import BDE_Dashboard from './Components/Dashboard/BDE_Commander.jsx';
import Div_Dashboard from './Components/Dashboard/Div_Commander.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BN_Dashboard" element={<BN_Dashboard />} />
        <Route path="/BDE_Dashboard" element={<BDE_Dashboard />} />
        <Route path="/Div_Dashboard" element={<Div_Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App



