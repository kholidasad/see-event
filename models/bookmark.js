'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' })
      this.belongsTo(models.Event, { foreignKey: 'event_id', targetKey: 'id' })
    }
  }
  Bookmark.init({
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};