'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sales.belongsTo(models.user, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }
  Sales.init(
    {
      year: DataTypes.INTEGER,
      month: DataTypes.INTEGER,
      days: DataTypes.INTEGER,
      sales: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Sales',
    }
  );
  return Sales;
};
