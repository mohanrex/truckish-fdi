const database = require('../../config/database');
const Places = require('../models/Places');

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = () => (
    console.info('connection to the database has been established successfully')
  );

  const errorDBStart = (err) => (
    console.info('unable to connect to the database:', err)
  );

  const wrongEnvironment = () => {
    console.warn(`only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
    return process.exit(1);
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startStage = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const dbInit = async () => {
    const places = await Places.findAll();
    if (places.length < 1) {
      const defaultPlaces = [
        {
          name: 'Saint Petersburg Stadium',
          address1: 'Futbol\'naya Alleya',
          address2: '1',
          city: 'Sankt-Peterburg',
          country: 'Russia',
          zipcode: '197110',
          description: 'Saint Petersburg Stadium is located on the western tip of Krestovsky Island in the north-west of St. Petersburg.',
          latlong: '59.973087,30.220191',
          image: 'http://www.stadiumguide.com/wp-content/uploads/stpetersburgnew_top.jpg',
        },
        {
          name: 'Luzhniki Stadium',
          address1: 'ул. Лужники, 24',
          address2: '',
          city: 'Moskva',
          country: 'Russia',
          zipcode: '119048',
          description: 'Luzhniki Stadium, initially called Central Lenin Stadium, was built between 1955 and 1956.',
          latlong: '55.716475,37.555046',
          image: 'http://www.stadiumguide.com/wp-content/uploads/luzhniki_top2.jpg',
        },
        {
          name: 'Fisht Olympic Stadium',
          address1: 'Olympic Avenue',
          address2: 'Sochi',
          city: 'Krasnodarskiy kray',
          country: 'Russia',
          zipcode: '354340',
          description: 'Fisht Olympic Stadium was built to serve as the centrepiece venue of the 2014 Sochi Winter Olympics. During the Olympics, it hosted both the opening and closing ceremony.',
          latlong: '43.409161,39.949896',
          image: 'http://www.stadiumguide.com/wp-content/uploads/fisht_top1.jpg',
        },
        {
          name: 'Ekaterinburg Arena',
          address1: 'Ulitsa Repina, 5',
          address2: 'Yekaterinburg',
          city: 'Sverdlovskaya oblast',
          country: 'Russia',
          zipcode: '620028',
          description: 'The Ekaterinburg Arena, then still called Central Stadium, was built between 1953 and 1957. The stadium was initially a multi-sports arena, also hosting athletics and ice skating events.',
          latlong: '56.832648,60.57336',
          image: 'http://www.stadiumguide.com/wp-content/uploads/ekaterinburgarena_top1.jpg',
        },
        {
          name: 'Kazan Arena',
          address1: 'pr-kt Yamasheva',
          address2: '115 A, Kazan',
          city: 'Rep. Tatarstan',
          country: 'Russia',
          zipcode: '421001',
          description: 'The Kazan Arena was built to provide Rubin with a modern home, to serve as the main venue of the 2013 Summer Universiade, and to be one of the playing venues of the 2018 World Cup.',
          latlong: '55.821002,49.160848',
          image: 'http://www.stadiumguide.com/wp-content/uploads/kazan_top1.jpg',
        },
      ];
      defaultPlaces.forEach(async (body) => {
        await Places.create({
          name: body.name,
          address1: body.address1,
          address2: body.address2,
          city: body.city,
          country: body.country,
          zipcode: body.zipcode,
          description: body.description,
          latlong: body.latlong,
          image: body.image,
        });
      });
    }
  };

  const start = async () => {
    switch (environment) {
      case 'development':
        await startDev();
        break;
      case 'staging':
        await startStage();
        break;
      case 'testing':
        await startTest();
        break;
      case 'production':
        await startProd();
        break;
      default:
        await wrongEnvironment();
    }
    await dbInit();
  };

  return {
    start,
  };
};

module.exports = dbService;
