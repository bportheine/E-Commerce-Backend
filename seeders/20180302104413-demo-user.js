'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
        name: 'Knife',
        price: '10',
        description: 'Very nice if you want to eat something',
        image: null,
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        name: 'Fork',
        price: '15',
        description: 'Very nice to put something in your mouth',
        image:'http://country929.com/files/2015/04/fork.jpg',
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
        },
        {
          name: 'Spoon',
          price: '21',
          description: 'If you like soup, this thing is what you need',
          image:'http://i.huffpost.com/gen/1302381/images/o-SPOON-facebook.jpg',
          createdAt: 'NOW()',
          updatedAt: 'NOW()'
          },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
