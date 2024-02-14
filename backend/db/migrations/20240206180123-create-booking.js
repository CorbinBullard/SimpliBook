"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      slot_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Slots",
          key: "id",
        },
      },
      recurring: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      persons: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.TIME,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
