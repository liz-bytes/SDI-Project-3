const express = require('express');
const app = express();
const port = 8080
//const knex = require('knex')(require('../knexfile.js')["development"]);

const deploymentsRoutes = require('./deployments');
const equipmentRoutes = require('./equipment');
const mosRoutes = require('./mos');
const soldiersRoutes = require('./soldiers');
const unitsRoutes = require('./units');

const cors = require('cors')

app.use(express.json());
app.use(cors());

app.use('/deployments', deploymentsRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/mos', mosRoutes);
app.use('/soldiers', soldiersRoutes);
app.use('/units', unitsRoutes);

app.listen(port, (req, res) => {
  console.log(`Your server is up at http://localhost:${port}/`)
})
