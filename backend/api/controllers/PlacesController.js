const Places = require('../models/Places');

const PlacesController = () => {
  const getAll = async (req, res) => {
    try {
      const places = await Places.findAll();

      return res.status(200).json({ places });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    const { body } = req;

    try {
      const place = await Places.create({
        name: body.email,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        country: body.country,
        zipcode: body.zipcode,
        description: body.description,
        latlong: body.latlong,
        image: body.image,
      });

      return res.status(200).json({ place });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err });
    }
  };


  return {
    getAll,
    create,
  };
};

module.exports = PlacesController;
