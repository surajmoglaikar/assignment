'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FileUpload extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //   define association here
        }
    };
	FileUpload.init ({ 
	  id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  name: {
			type: DataTypes.STRING
	  },
	  address: {
			type: DataTypes.STRING
	  },
	  age: {
			type: DataTypes.INTEGER
	  }, 
      createdAt: {
        type: DataTypes.DATE, 
        allowNull: true
      },
      updatedAt: {
        type: DataTypes.DATE, 
        allowNull: true
      },
	}, {
        sequelize,
        modelName: 'FileUpload',
        timestamps: false,
    });
       return FileUpload;
}