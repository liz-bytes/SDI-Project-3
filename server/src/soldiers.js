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
// router.get('/', (req, res) => {
//   knex('soldiers_table')
//   .select('*')
//   .then(soldiers => {
//     let soldiersArr = soldiers.map(soldier => {return {...soldier}})
//     res.status(200).json(soldiersArr)
//   })
// })

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 250;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const query = knex('soldiers_table')
      .select(
        'soldiers_table.id',
        'soldiers_table.first_name',
        'soldiers_table.last_name',
        'deployments_table.name as deployment_name',
        'mos_table.name as mos_name'
      )
      .leftJoin('deployments_table', 'soldiers_table.id_deployments', 'deployments_table.id')
      .leftJoin('mos_table', 'soldiers_table.id_mos', 'mos_table.id')
      .limit(limit)
      .offset(offset);

    // ✅ Apply filters if provided
    if (req.query.first_name) {
      query.whereILike('soldiers_table.first_name', `%${req.query.first_name}%`);
    }
    if (req.query.last_name) {
      query.whereILike('soldiers_table.last_name', `%${req.query.last_name}%`);
    }
    if (req.query.id_mos) {
      query.whereILike('mos_table.name', `%${req.query.id_mos}%`);
    }
    if (req.query.id_deployments) {
      query.whereILike('deployments_table.name', `%${req.query.id_deployments}%`);
    }

    const soldiers = await query;
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
});

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