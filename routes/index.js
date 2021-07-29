var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectId;

router.get('/bookings', (req, res, next) => {
  req.collection
    .find({})
    .toArray()
    .then(results => res.json(results))
    .catch((err) => {
      res.send(err);
    });
});

router.post('/bookings', (req, res, next) => {
  const { name, email, bookingDate, seat } = req.body;
  if (!name || !email || !bookingDate || !seat) {
    return res.status(400).json({
      message: 'Please verify details entered',
    });
  }

  const payload = { name, email, bookingDate, seat };
  req.collection
    .insertOne(payload)
    .then(result => res.json(result))
    .catch(err => res.send(err));
});

router.delete('/bookings/:id', (req, res, next) => {
  // return res.json(req.params);
  const { id } = req.params;
  const _id = ObjectID(id);

  req.collection
    .deleteOne({ _id })
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
});

module.exports = router;
