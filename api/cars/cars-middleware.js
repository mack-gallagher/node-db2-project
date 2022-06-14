const { getAll, getById } = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  getById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'account not found' });
        return;
      }

    next();
  })
  .catch(err => {
    res.status(500).json({ message: 'internal server error' });
  })
}

const checkCarPayload = (req, res, next) => {
  const requiredKeys = ['vin','make','model','mileage'];
  for (let i = 0; i < requiredKeys.length; i++) {
      if (Object.keys(req.body).indexOf(requiredKeys[i]) === -1) {
        res.status(400).json({ message: `${requiredKeys[i]} is missing` });
        return;
      }
  }
  
  next();
}

const checkVinNumberValid = (req, res, next) => {
  
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    return;
  }

  next();
}

const checkVinNumberUnique = (req, res, next) => {  
  getAll()
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].vin == req.body.vin) {
          res.status(400).json({ message: `vin ${req.body.vin} already exists` });
          return;
        }
      }

      next();
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    })

}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique };
