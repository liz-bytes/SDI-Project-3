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
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const equipment = await knex('equipment_table')
      .join('deployments_table', 'equipment_table.id_deployments', '=', 'deployments_table.id')
      .select(
        'equipment_table.id',
        'equipment_table.name',
        'equipment_table.status',
        'deployments_table.name as deployment_name'
      )
      .limit(limit)
      .offset(offset);

    const count = await knex('equipment_table').count('* as total');
    res.status(200).json({ data: equipment, total: count[0].total });
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ message: 'Error retrieving equipment', error: err });
  }
});


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