import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const API_BASE = 'http://localhost:8080';


const Edit = () => {

  const {id} = useParams();

  let [soldier, setSoldier] = useState({
    first_name: '',
    last_name: '',
    deployment_name: '',
    mos_name: ''
  })

  useEffect(()=>{
    fetch(`${API_BASE}/soldiers/${id}`)
    .then((res) => res.json())
      .then((data) => setSoldier(data))
      .catch((err) => console.error('Failed to fetch soldier:', err));
  }, [id]);

  const Patch = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/soldiers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(soldier),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      alert('Soldier updated successfully!');
    } catch (err) {
      console.error('Error updating soldier:', err);
      alert('Failed to update soldier');
    }
  };

  const Save = (e) => {
    setSoldier((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <form onSubmit={Patch}>
      <div>
        <h3>
          <label htmlFor="first_name">First Name: </label>
          <input type="text" id="first_name" value={soldier.first_name} onChange={Save} />
          <label htmlFor="last_name">Last Name: </label>
          <input type="text" id="last_name" value={soldier.last_name} onChange={Save} />
        </h3>

        <label htmlFor="deployment_name">Deployment: </label>
        <input type="text" id="deployment_name" value={soldier.deployment_name} onChange={Save} />
        <label htmlFor="mos_name">MOS: </label>
        <input type="text" id="mos_name" value={soldier.mos_name} onChange={Save} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default Edit;