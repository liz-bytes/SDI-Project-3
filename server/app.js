const express = require('express');
const app = express();
const port = 5173
const knex = require('knex')(require('./knexfile.js')["development"]);
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log(`Your server is up at http://localhost:${port}/`)
})