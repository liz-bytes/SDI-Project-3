const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);

// Utility to create unit if it doesn't exist
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

// GET /soldiers (with filters)
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
    res.status(502).json({ message: 'Error retrieving soldiers', error: err });
  }
});

// GET /soldiers/:id (for Edit)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const soldier = await knex('soldiers_table').where({ id }).first();
    if (!soldier) return res.status(404).json({ error: 'Soldier not found.' });
    res.json(soldier);
  } catch (err) {
    console.error('Error fetching soldier by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /soldiers (create)
// POST /soldiers (create)
router.post('/', async (req, res) => {
  const {
    first_name,
    last_name,
    id_mos,
    id_deployments,
    unit_id
  } = req.body;

  if (!first_name || !last_name || !id_mos || !unit_id) {
    return res.status(400).json({ error: 'Missing required soldier fields.' });
  }

  try {
    const [newSoldier] = await knex('soldiers_table') // ✅ right table
      .insert({
        first_name,
        last_name,
        id_mos,
        id_deployments: id_deployments || null,
        home_unit: unit_id // ✅ match your DB schema
      })
      .returning('*');

    res.status(201).json(newSoldier);
  } catch (err) {
    console.error('Error creating soldier:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// PATCH /soldiers/:id (update)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, id_mos, id_deployments } = req.body;

  try {
    const updated = await knex('soldiers_table')
      .where({ id })
      .update({
        first_name,
        last_name,
        id_mos,
        id_deployments
      });

    if (updated === 0) {
      return res.status(404).json({ error: 'Soldier not found.' });
    }

    res.status(200).json({ message: 'Soldier updated successfully.' });
  } catch (err) {
    console.error('PATCH /soldiers/:id error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /soldiers/:id
router.delete('/:id', (req, res) => {
  knex('soldiers_table')
    .where('id', req.params.id)
    .del()
    .then(rowsDeleted => {
      rowsDeleted === 1
        ? res.status(200).json({ message: `Soldier with id ${req.params.id} deleted` })
        : res.status(404).json({ message: `Soldier with id ${req.params.id} not found` });
    });
});

module.exports = router;
