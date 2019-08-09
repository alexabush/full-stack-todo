'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'Todos',
      [
        {
          title: 'hi mom!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'hi mom2!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'hi mom2!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'hi mom2!',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
