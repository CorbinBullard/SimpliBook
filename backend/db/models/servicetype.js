"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServiceType.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      ServiceType.hasMany(models.Slot, {
        foreignKey: "service_type_id",
        as: "slots",
      });
    }
  }
  ServiceType.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      capacity: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ServiceType",
    }
  );
  return ServiceType;
};
