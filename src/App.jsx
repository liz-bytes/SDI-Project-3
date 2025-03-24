import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Components/Home/Home.jsx';
import BN_Dashboard from './Components/Dashboard/BN_Commander.jsx';
import BDE_Dashboard from './Components/Dashboard/BDE_Commander.jsx';
import Div_Dashboard from './Components/Dashboard/Div_Commander.jsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.jsx';
import Equipment_Data from './Components/Dashboard/Equipment/EquipmentDashBoard.jsx';
import Layout from './Components/Layout.jsx';
// import { SoldierProvider } from './Components/Context/SoldierContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/BN_Dashboard" element={<BN_Dashboard />} />
          <Route path="/BDE_Dashboard" element={<BDE_Dashboard />} />
          <Route path="/Div_Dashboard" element={<Div_Dashboard />} />
          <Route path="/Equipment_Data" element={<Equipment_Data />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



