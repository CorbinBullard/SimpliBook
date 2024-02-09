"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Slot, {
        foreignKey: "slot_id",
        as: "slot",
      });
    }
  }
  Booking.init(
    {
      slot_id: DataTypes.INTEGER,
      recurring: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      email: DataTypes.STRING,
      paid: DataTypes.BOOLEAN,
      persons: DataTypes.INTEGER,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
