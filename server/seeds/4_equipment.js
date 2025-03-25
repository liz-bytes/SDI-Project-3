/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE equipment_table RESTART IDENTITY CASCADE');
  // Fetch deployments
  const deployments = await knex('deployments_table').select('id', 'name');
  const deploymentMap = deployments.reduce((acc, dep) => {
    acc[dep.name] = dep.id;
    return acc;
  }, {});

  // Retrieve deployment IDs from `deployments_table`
  const equipmentNames = await knex('deployments_table')
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
      'Operation Obsidian Ghost',
      'Operation Null Horizon'
    ]);

  // Insert equipment data
  await knex('equipment_table').insert([
    {name: 'M1A2 Dimensional Rift Gateway', id_deployments: deploymentMap['Operation Rift Sentinel'], status: 'Fully Operational' },
    {name: 'Aether-Forged Combat Suit', id_deployments: deploymentMap['Operation Titan’s Descent'], status: 'Experimental Testing' },
    {name: 'Echo-Phase Tactical Comms', id_deployments: deploymentMap['Operation Phantom Veil'], status: 'Field Ready' },
    {name: 'Oblivion-Class Void Rifle', id_deployments: deploymentMap['Operation Void Genesis'], status: 'Restricted Access' },
    {name: 'Singularity Breach Charge', id_deployments: deploymentMap['Operation Eclipse Watch'], status: 'Armed & Ready' },
    {name: 'Chrono Stabilizer Beacon', id_deployments: deploymentMap['Operation Chrono Storm'], status: 'Active Monitoring' },
    {name: 'Shadow Dagger Mk-VII', id_deployments: deploymentMap['Operation Abyss Walker'], status: 'Prototype' },
    {name: 'Nexus-Linked Field Generator', id_deployments: deploymentMap['Operation Nexus Breaker'], status: 'Online' },
    {name: 'Celestial Navigation Core', id_deployments: deploymentMap['Operation Celestial Beacon'], status: 'Operational' },
    {name: 'Quantum Disruption Array', id_deployments: deploymentMap['Operation Paradox Rift'], status: 'Under Maintenance' },
    {name: 'Silent Horizon Recon Drone', id_deployments: deploymentMap['Operation Silent Horizon'], status: 'Deployed' },
    {name: 'Obsidian Ghost Cloaking Module', id_deployments: deploymentMap['Operation Obsidian Ghost'], status: 'Testing Phase' },
    {name: 'Night Wing', id_deployments: deploymentMap['Operation Null Horizon'], status: 'Testing Phase' },
    {name: 'Helix-Pattern Plasma Carbine', id_deployments: deploymentMap['Operation Null Horizon'], status: 'Combat Ready'},
    {name: 'Graviton Pulse Gauntlets', id_deployments: deploymentMap['Operation Paradox Rift'], status: 'Calibration Phase'},
    {name: 'Stellaris Void Anchor', id_deployments: deploymentMap['Operation Null Horizon'], status: 'Critical Failure'},
    {name: 'Titanium-Shell Combat Drone', id_deployments: deploymentMap['Operation Paradox Rift'], status: 'Standby'},
    {name: 'Quantum Entanglement Sidearm', id_deployments: deploymentMap['Operation Null Horizon'], status: 'Restricted Access'},
    // {name: 'Nebula Shroud Field', id_deployments: deploymentMap[''], status: 'Active Deployment'},
    // {name: 'Photon Edge Vibroblade', id_deployments: deploymentMap[''], status: 'Awaiting Orders'},
    // {name: 'Eclipse-Type Neural Interface', id_deployments: deploymentMap[''], status: 'Testing Phase'},
    // {name: 'Astral Projection Harness', id_deployments: deploymentMap[''], status: 'Prototype'},
    // {name: 'Hyperion-Class Railgun', id_deployments: deploymentMap[''], status: 'Armed & Ready'},
    // {name: 'Zero-Point Energy Core', id_deployments: deploymentMap[''], status: 'In Storage'},
    // {name: 'Seraphim Wing Exo-Suit', id_deployments: deploymentMap[''], status: 'Operational'},
    // {name: 'Dark Matter Reactor', id_deployments: deploymentMap[''], status: 'Under Maintenance'},
    // {name: 'Sentinel AI Combat Module', id_deployments: deploymentMap[''], status: 'Online'},
    // {name: 'Vortex Shield Emitter', id_deployments: deploymentMap[''], status: 'Experimental Testing'},
    // {name: 'Hades-Type Incendiary Launcher', id_deployments: deploymentMap[''], status: 'Decommissioned'},
    // {name: 'Lunar Forge Nanite Swarm', id_deployments: deploymentMap[''], status: 'Unstable'},
    // {name: 'Pandora’s Cache Tactical Nuke', id_deployments: deploymentMap[''], status: 'Locked'},
    // {name: 'Solaris Beam Array', id_deployments: deploymentMap[''], status: 'Overheating'},
    // {name: 'Wraith-Stealth Orbital Satellite', id_deployments: deploymentMap[''], status: 'Silent Running'},
    // {name: 'Neon Reaper Particle Cannon', id_deployments: deploymentMap[''], status: 'Overclocked'},
    // {name: 'Blackstar Tactical Hologram', id_deployments: deploymentMap[''], status: 'Active Decoy'},
    // {name: 'Voidrend Combat Knife', id_deployments: deploymentMap[''], status: 'Lethal'},
    // {name: 'Stormbringer Electro-Rail', id_deployments: deploymentMap[''], status: 'Charging'},
    // {name: 'Frostbite Cryo-Grenade', id_deployments: deploymentMap[''], status: 'Frozen Stock'},
    // {name: 'Phantom Veil Cloaking Rig', id_deployments: deploymentMap[''], status: 'Active Camouflage'},
    // {name: 'Neural Scrambler Pod', id_deployments: deploymentMap[''], status: 'Illegal'},
    // {name: 'Specter ECHO Drone', id_deployments: deploymentMap[''], status: 'MIA'},
    // {name: 'Hackwire Virus Injector', id_deployments: deploymentMap[''], status: 'Corrupting'},
    // {name: 'Nightshade EMP Blade', id_deployments: deploymentMap[''], status: 'Disruptive'},
    // {name: 'Singularity Grenade', id_deployments: deploymentMap[''], status: 'Forbidden'},
    // {name: 'Biosynth Combat Symbiote', id_deployments: deploymentMap[''], status: 'Mutating'},
    // {name: 'Chronoskip Jump Boots', id_deployments: deploymentMap[''], status: 'Unstable'},
    // {name: 'Plagueborn Nanite Cloud', id_deployments: deploymentMap[''], status: 'Contained'},
    // {name: 'Doomsday Frequency Beacon', id_deployments: deploymentMap[''], status: 'Dormant'},
    // {name: 'Titanfall Siege Mech', id_deployments: deploymentMap[''], status: 'Standing By'},
    // {name: 'Oblivion Warhead', id_deployments: deploymentMap[''], status: 'Locked'},
    // {name: 'Hellfire Plasma Mortar', id_deployments: deploymentMap[''], status: 'Ready to Fire'},
    // {name: 'Gravity Hammer', id_deployments: deploymentMap[''], status: 'Awaiting Clearance'},
    // {name: 'Solar Flare Artillery', id_deployments: deploymentMap[''], status: 'Aiming'},
    // {name: 'Medi-Gel Rapid Healer', id_deployments: deploymentMap[''], status: 'Sterilized'},
    // {name: 'Omni-Tool Hacking Kit', id_deployments: deploymentMap[''], status: 'Connected'},
    // {name: 'Stasis Field Generator', id_deployments: deploymentMap[''], status: 'Active'},
    // {name: 'Warp Jump Pack', id_deployments: deploymentMap[''], status: 'Calibrating'},
    // {name: 'Sentinel Repair Nanobots', id_deployments: deploymentMap[''], status: 'Patching'},
  ]);
};
