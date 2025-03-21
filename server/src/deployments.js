const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

//CREATE
router.post('/', (req, res) => {
  let {name, location, id_units} = req.body
  knex('deployments_table')
  .insert({name, location, id_units})
  .then(() => {
    res.status(201).json({message: `Deployment ${name} at ${location} created successfully.`})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error creating deployment', error: err})
  })
})

//READ
router.get('/', (req, res) => {
  knex('deployments_table')
  .select('*')
  .then(deployments => {
    let deploymentsArr = deployments.map(deployment => {return {...deployment}})
    res.status(200).json(deploymentsArr)
  })
})

//UPDATE
router.patch('/:id', (req, res) => {
  let updatedSoldier = knex('deployments_table')
  .where('id', req.params.id)
  .update(req.body)
  .then(() => {
    res.status(200).json({message: 'Deployment updated successfully'})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error updating deployment', error: err})
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  knex('deployments_table')
  .where('id', req.params.id)
  .del()
  .then(rowsDeleted => {
    rowsDeleted == 1 ? res.status(200).json({message: `Deployment with id: ${req.params.id} successfully deleted`})
                    : res.status(404).json({message: `Deployment with id: ${req.params.id} does not exist`})
  })
})

module.exports = router;