'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'firstName',
      {
        type: Sequelize.STRING,
      }
    )
    queryInterface.addColumn(
      'Users',
      'lastName',
      {
        type: Sequelize.STRING,
      }
    )
    queryInterface.addColumn(
      'Users',
      'photoUrl',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'firstName')
    queryInterface.removeColumn('Users', 'lastName')
    queryInterface.removeColumn('Users', 'photoUrl')
  }
};
