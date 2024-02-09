"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Slot.belongsTo(models.ServiceType, {
        foreignKey: "service_type_id",
        // as: "service_type",
      });
      Slot.hasMany(models.Booking, {
        foreignKey: "slot_id",
        // as: "bookings",
      });
      Slot.belongsTo(models.User, {
        foreignKey: "user_id",
        // as: "user",
      });
    }
  }
  Slot.init(
    {
      service_type_id: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Slot",
    }
  );
  return Slot;
};
