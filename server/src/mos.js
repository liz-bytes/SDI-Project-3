const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

//CREATE
router.post('/', (req, res) => {
  let {name} = req.body
  knex('mos_table')
  .insert({name})
  .then(() => {
    res.status(201).json({message: `MOS ${name} created successfully.`})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error creating MOS', error: err})
  })
})

//READ
router.get('/', (req, res) => {
  knex('mos_table')
  .select('*')
  .then(mos => {
    let mosArr = mos.map(mos => {return {...mos}})
    res.status(200).json(mosArr)
  })
})

//UPDATE
router.patch('/:id', (req, res) => {
  let updatedMOS = knex('mos_table')
  .where('id', req.params.id)
  .update(req.body)
  .then(() => {
    res.status(200).json({message: 'MOS updated successfully'})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error updating MOS', error: err})
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  knex('mos_table')
  .where('id', req.params.id)
  .del()
  .then(rowsDeleted => {
    rowsDeleted == 1 ? res.status(200).json({message: `MOS with id: ${req.params.id} successfully deleted`})
                    : res.status(404).json({message: `MOS with id: ${req.params.id} does not exist`})
  })
})

module.exports = router;