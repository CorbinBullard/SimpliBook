"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ServiceType, {
        foreignKey: "user_id",
        as: "services",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashed_password: DataTypes.STRING,
      public_key: DataTypes.STRING,
      hashed_key: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: [
            "hashed_password",
            "email",
            "createdAt",
            "updatedAt",
            "hashed_key",
            "public_key",
          ],
        },
      },
    }
  );
  return User;
};
