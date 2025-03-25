const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

// CREATE
router.post('/', (req, res) => {
  let { location, name } = req.body;
  knex('units_table')
    .insert({ location, name })
    .then(() => {
      res.status(201).json({ message: `Unit ${name} at ${location} created successfully.` });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error creating unit', error: err });
    });
});

// READ
router.get('/', (req, res) => {
  knex('units_table')
    .select('*')
    .then(units => {
      res.status(200).json(units);
    });
});

// UPDATE
router.patch('/:id', (req, res) => {
  knex('units_table')
    .where('id', req.params.id)
    .update(req.body)
    .then(() => {
      res.status(200).json({ message: 'Unit updated successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error updating unit', error: err });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  knex('units_table')
    .where('id', req.params.id)
    .del()
    .then(rowsDeleted => {
      rowsDeleted == 1
        ? res.status(200).json({ message: `Unit with id: ${req.params.id} successfully deleted` })
        : res.status(404).json({ message: `Unit with id: ${req.params.id} does not exist` });
    });
});

// Get brigade → battalion mapping with names + locations
router.get('/unit-map', async (req, res) => {
  try {
    const results = await knex('units_map_table')
      .leftJoin('units_table as brigade', 'units_map_table.brigade', 'brigade.id')
      .leftJoin('units_table as battalion', 'units_map_table.battalion', 'battalion.id')
      .select(
        'units_map_table.id',
        'brigade.name as brigade_name',
        'brigade.location as brigade_location',
        'brigade.id as brigade_id',
        'battalion.name as battalion_name',
        'battalion.location as battalion_location',
        'battalion.id as battalion_id'
      );

    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching unit map:', err);
    res.status(500).json({ message: 'Error retrieving unit map', error: err });
  }
});

module.exports = router;
