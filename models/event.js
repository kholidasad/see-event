'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "UserId" })
      // this.belongsToMany(models.Event, { through: 'Comment', foreignKey: 'event_id'})
    }
  }
  Event.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    category: DataTypes.ENUM(['Photography', 'Develop', 'Design']),
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};