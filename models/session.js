'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //// define association here
        }
    };
    Session.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
      },
        sid: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: null,
        },
        uid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE, 
          allowNull: true
        },
        updatedAt: {
          type: DataTypes.DATE, 
          allowNull: true
        },
      },
      {
        sequelize,
        modelName: "Session",
      }
    );
  return Session;
};