import React, { useState, useEffect } from 'react';
import '/src/index.css';

const API_BASE = 'http://localhost:5173'; // Update if using proxy

function Equipment_Data() {
  const [equipment, setEquipment] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const LIMIT = 10;

  const fetchEquipment = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/equipment?limit=${LIMIT}&offset=${offset}`);
      const { data } = await res.json();
      setEquipment(data);
    } catch (err) {
      console.error('Failed to fetch equipment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [offset]);

  const handleFilterCategoryChange = (category) => {
    setFilterCategory(category);
    setFilterValue('');
  };

  // Get the array of equipment data

  // Filter the equipment based on the selected category and input value
  const filteredEquipments = equipment.filter((equipment) => {
    if (!filterCategory || !filterValue) {
      return true;
    }
    // Filter by name
    if (filterCategory === 'equipment name') {
      return equipment.name.toLowerCase().includes(filterValue.toLowerCase());
    }
    // Filter by deployment
    if (filterCategory === 'deployment') {
      return equipment.deployment_name.some(dep =>
        dep.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // Filter by status
    if (filterCategory === 'status') {
      return equipment.status.toLowerCase().includes(filterValue.toLowerCase());
    }
  });

  return (
    <div>
      <h2>Equipment Status</h2>

      <div className="results-container">
        {isLoading ? (
          <p>Loading soldiers...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Equipment Name</th>
                <th>Deployment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipments.map((equipment, index) => (
                <tr key={index}>
                  <td>{equipment.name}</td>
                  <td>{equipment.deployment_name || 'N/A'}</td>
                  <td>{equipment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="pagination">
          <button
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(offset - LIMIT, 0))}
          >
            Previous
          </button>
          <span>Showing {offset + 1} – {offset + equipment.length}</span>
          <button
            disabled={equipment.length < LIMIT}
            onClick={() => setOffset(offset + LIMIT)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Equipment_Data;