const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {};

const tableName = 'places';

const Places = sequelize.define('Places', {
  name: {
    type: Sequelize.STRING,
  },
  address1: {
    type: Sequelize.STRING,
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  zipcode: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  latlong: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

// eslint-disable-next-line
Places.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Places;
