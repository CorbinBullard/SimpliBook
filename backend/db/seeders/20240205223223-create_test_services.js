"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("ServiceTypes", [
      {
        name: "Haircut",
        user_id: 1,
        price: 25.0,
        capacity: 10,
        duration: 30,
      },
      {
        name: "Shave",
        user_id: 1,
        price: 15.0,
        capacity: 10,
        duration: 30,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
