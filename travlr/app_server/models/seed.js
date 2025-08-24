const Mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

const trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
  console.log(' Trips seeded successfully!');
};

seedDB().then(async () => {
  await Mongoose.connection.close();
  process.exit(0);
});
