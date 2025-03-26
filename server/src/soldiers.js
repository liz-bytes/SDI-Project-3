const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

async function getOrCreateUnit(knex, unitName, parentBrigadeId = null, parentDivisionId = null) {
  let unit = await knex('units').where({ name: unitName }).first();

  if (unit) return unit.id;

  const [newUnit] = await knex('units')
    .insert({ name: unitName, location: 'Unknown' })
    .returning('*');

  if (parentBrigadeId) {
    await knex('unit_map').insert({
      brigade_id: parentBrigadeId,
      battalion_id: newUnit.id,
      battalion_location: newUnit.location,
    });
  }

  return newUnit.id;
}


//CREATE
router.post('/', async (req, res) => {
  const knex = req.knex;
  const {
    first_name,
    last_name,
    id_mos,
    id_deployments,
    unit_name,           // new field from frontend
    parent_brigade_id,   // optional if coming from BDE
    parent_division_id   // optional if coming from DIV
  } = req.body;

  if (!first_name || !last_name || !id_mos || !unit_name) {
    return res.status(400).json({ error: 'Missing required soldier fields.' });
  }

  try {
    const unit_id = await getOrCreateUnit(knex, unit_name, parent_brigade_id, parent_division_id);

    const [newSoldier] = await knex('soldiers')
      .insert({
        first_name,
        last_name,
        id_mos,
        id_deployments: id_deployments || null,
        unit_id,
      })
      .returning('*');

    res.status(201).json(newSoldier);
  } catch (err) {
    console.error('Error creating soldier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

  // Apply filters if provided
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
  if (req.query.unit_id) {
    query.where('soldiers_table.home_unit', req.query.unit_id);
  }
  if (req.query.brigade_id) {
    query
      .join('units_map_table', 'soldiers_table.home_unit', 'units_map_table.battalion')
      .where('units_map_table.brigade', req.query.brigade_id);
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