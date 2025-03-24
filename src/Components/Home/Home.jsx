import BN_Dashboard from '../Dashboard/BN_Commander.jsx';
import BDE_Dashboard from '../Dashboard/BDE_Commander.jsx';
import Div_Dashboard from '../Dashboard/Div_Commander.jsx';
import Equipment_Data from '../Dashboard/Equipment/EquipmentDashBoard.jsx'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Sentinel Division Dashboard</h1>
      <Link to={"/BN_Dashboard"}>
        <button>View as BN Commander</button>
      </Link>
      <Link to={"/BDE_Dashboard"}>
        <button>View as BDE Commander</button>
      </Link>
      <Link to={"/Div_Dashboard"}>
        <button>View as Division Commander</button>
      </Link>
      <Link to={"/Equipment_Data"}>
        <button>View Equipment</button>
      </Link>
    </div>
  );
}

export default Home;