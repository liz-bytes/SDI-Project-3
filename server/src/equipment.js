const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

//CREATE
router.post('/', (req, res) => {
  let {name, id_deployments, status} = req.body
  knex('equipment_table')
  .insert({name, id_deployments, status})
  .then(() => {
    res.status(201).json({message: `Equipment ${name} created successfully.`})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error creating equipment', error: err})
  })
})

//READ
router.get('/', (req, res) => {
  knex('equipment_table')
  .select('*')
  .then(equipment => {
    let equipmentArr = equipment.map(eqip => {return {...eqip}})
    res.status(200).json(equipmentArr)
  })
})

//UPDATE
router.patch('/:id', (req, res) => {
  let updatedEquipment = knex('equipment_table')
  .where('id', req.params.id)
  .update(req.body)
  .then(() => {
    res.status(200).json({message: 'Equipment updated successfully'})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error updating equipment', error: err})
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  knex('equipment_table')
  .where('id', req.params.id)
  .del()
  .then(rowsDeleted => {
    rowsDeleted == 1 ? res.status(200).json({message: `Equipment with id: ${req.params.id} successfully deleted`})
                    : res.status(404).json({message: `Equipment with id: ${req.params.id} does not exist`})
  })
})

module.exports = router;