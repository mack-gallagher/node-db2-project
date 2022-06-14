const express = require("express")
const { checkCarId, 
        checkCarPayload,
        checkVinNumberValid,
        checkVinNumberUnique } = require('./cars-middleware');
const Car = require('./cars-model');

const router = express.Router();

router.get('/', (req, res) => {
  Car.getAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

router.get('/:id', checkCarId, (req, res) => {
  Car.getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
  Car.create(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'internal server error' });
    })
});

module.exports = router;
