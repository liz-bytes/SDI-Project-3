const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

//CREATE
router.post('/', (req, res) => {
  let {location, name} = req.body
  knex('units_table')
  .insert({location, name})
  .then(() => {
    res.status(201).json({message: `Unit ${name} at ${location} created successfully.`})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error creating unit', error: err})
  })
})

//READ
router.get('/', (req, res) => {
  knex('units_table')
  .select('*')
  .then(units => {
    let unitsArr = units.map(unit => {return {...unit}})
    res.status(200).json(unitsArr)
  })
})

//UPDATE
router.patch('/:id', (req, res) => {
  let updatedUnit = knex('units_table')
  .where('id', req.params.id)
  .update(req.body)
  .then(() => {
    res.status(200).json({message: 'Unit updated successfully'})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error updating unit', error: err})
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  knex('units_table')
  .where('id', req.params.id)
  .del()
  .then(rowsDeleted => {
    rowsDeleted == 1 ? res.status(200).json({message: `Unit with id: ${req.params.id} successfully deleted`})
                    : res.status(404).json({message: `Unit with id: ${req.params.id} does not exist`})
  })
})

module.exports = router;