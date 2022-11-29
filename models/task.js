'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Task.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        due_date:{
          type: DataTypes.DATE,
        },
        file:{
          type: DataTypes.STRING,
        },
        user:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE, // unix timestamp
            allowNull: true
          },
          updatedAt: {
            type: DataTypes.DATE, // unix timestamp
            allowNull: true
          },
    }, {
        sequelize,
        modelName: 'Task',
        timestamps: false
    });
    return Task;
};
