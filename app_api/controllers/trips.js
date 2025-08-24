// app_api/controllers/trips.js
const mongoose = require('mongoose');
require('../models/travlr');              // registers the model
const Trip = mongoose.model('trips');

// GET /trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching trips', error: err.message });
  }
};

// GET /trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching trip', error: err.message });
  }
};

// POST /trips
const tripsAddTrip = async (req, res) => {
  try {
    const saved = await new Trip(req.body).save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ message: 'Error creating trip', error: err.message });
  }
};

// PUT /trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const update = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    };

    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      update,
      { new: true, runValidators: true, context: 'query' }
    ).exec();

    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    return res.status(200).json({ message: 'Trip updated', data: trip });
  } catch (err) {
    return res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
