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
    await queryInterface.bulkInsert(
      "Slots",
      [
        {
          service_type_id: 1,
          day: 1,
          user_id: 1,
          start_time: "09:00:00",
          end_time: "09:30:00",
        },
        {
          service_type_id: 1,
          day: 2,
          user_id: 1,
          start_time: "10:00:00",
          end_time: "10:30:00",
        },
      ],
      {}
    );
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
