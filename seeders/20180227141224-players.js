'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', [
      { name: 'Arno', score: 4, createdAt: 'NOW()', updatedAt: 'NOW()' },
      { name: 'Mat', score: 5, createdAt: 'NOW()', updatedAt: 'NOW()' }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null, {});
  }
};
