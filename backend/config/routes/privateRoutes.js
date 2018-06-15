const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /places': 'PlacesController.getAll',
  'POST /place': 'PlacesController.create',
};

module.exports = privateRoutes;
