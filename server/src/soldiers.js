const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

//CREATE
router.post('/', (req, res) => {
  let {first_name, last_name, id_deployments, home_unit, id_mos} = req.body
  knex('soldiers_table')
  .insert({first_name, last_name, id_deployments, home_unit, id_mos})
  .then(() => {
    res.status(201).json({message: `Soldier ${last_name}, ${first_name} created successfully.`})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error creating soldier', error: err})
  })
})

//READ
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;    // Default to 50
  const offset = parseInt(req.query.offset) || 0;    // Default to 0

  try {
    const soldiers = await knex('soldiers_table')
      .select('*')
      .limit(limit)
      .offset(offset);

    res.status(200).json(soldiers);
  } catch (err) {
    console.error('Error fetching soldiers:', err);
    res.status(500).json({ message: 'Error retrieving soldiers', error: err });
  }
});

//UPDATE
router.patch('/:id', (req, res) => {
  let updatedSoldier = knex('soldiers_table')
  .where('id', req.params.id)
  .update(req.body)
  .then(() => {
    res.status(200).json({message: 'Soldier updated successfully'})
  })
  .catch((err) => {
    res.status(500).json({message: 'Error updating soldier', error: err})
  })
})

//DELETE
router.delete('/:id', (req, res) => {
  knex('soldiers_table')
  .where('id', req.params.id)
  .del()
  .then(rowsDeleted => {
    rowsDeleted == 1 ? res.status(200).json({message: `Soldier with id: ${req.params.id} successfully deleted`})
                    : res.status(404).json({message: `Soldier with id: ${req.params.id} does not exist`})
  })
})

module.exports = router;