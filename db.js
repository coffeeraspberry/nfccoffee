const Sequelize = require('sequelize');

const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/pi.db'
  });

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports= sequelize;