/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('equipment_table').del();

  // Retrieve deployment IDs from `deployments_table`
  const deployments = await knex('deployments_table')
    .whereIn('name', [
      'Operation Rift Sentinel',
      'Operation Titan’s Descent',
      'Operation Phantom Veil',
      'Operation Void Genesis',
      'Operation Eclipse Watch',
      'Operation Chrono Storm',
      'Operation Abyss Walker',
      'Operation Nexus Breaker',
      'Operation Celestial Beacon',
      'Operation Paradox Rift',
      'Operation Silent Horizon',
      'Operation Obsidian Ghost'
    ]);

  // Create a mapping of deployment names to IDs
  const deploymentMap = deployments.reduce((acc, deployment) => {
    acc[deployment.name] = deployment.id;
    return acc;
  }, {});

  // Insert equipment into `equipment_table`
  await knex('equipment_table').insert([
    { id: 1, name: 'M1A2 Dimensional Rift Gateway', id_deployments: deploymentMap['Operation Rift Sentinel'], status: 'Fully Operational' },
    { id: 2, name: 'Aether-Forged Combat Suit', id_deployments: deploymentMap['Operation Titan’s Descent'], status: 'Experimental Testing' },
    { id: 3, name: 'Echo-Phase Tactical Comms', id_deployments: deploymentMap['Operation Phantom Veil'], status: 'Field Ready' },
    { id: 4, name: 'Oblivion-Class Void Rifle', id_deployments: deploymentMap['Operation Void Genesis'], status: 'Restricted Access' },
    { id: 5, name: 'Singularity Breach Charge', id_deployments: deploymentMap['Operation Eclipse Watch'], status: 'Armed & Ready' },
    { id: 6, name: 'Chrono Stabilizer Beacon', id_deployments: deploymentMap['Operation Chrono Storm'], status: 'Active Monitoring' },
    { id: 7, name: 'Shadow Dagger Mk-VII', id_deployments: deploymentMap['Operation Abyss Walker'], status: 'Prototype' },
    { id: 8, name: 'Nexus-Linked Field Generator', id_deployments: deploymentMap['Operation Nexus Breaker'], status: 'Online' },
    { id: 9, name: 'Celestial Navigation Core', id_deployments: deploymentMap['Operation Celestial Beacon'], status: 'Operational' },
    { id: 10, name: 'Quantum Disruption Array', id_deployments: deploymentMap['Operation Paradox Rift'], status: 'Under Maintenance' },
    { id: 11, name: 'Silent Horizon Recon Drone', id_deployments: deploymentMap['Operation Silent Horizon'], status: 'Deployed' },
    { id: 12, name: 'Obsidian Ghost Cloaking Module', id_deployments: deploymentMap['Operation Obsidian Ghost'], status: 'Testing Phase' }
  ]);
};
