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
      this.belongsTo(models.User, { foreignKey: "user_id" })
      this.belongsToMany(models.User, {
        through: 'Comment',
        as: 'comment',
        foreignKey: 'event_id'
      }),
      this.belongsToMany(models.User, {
        through: 'Bookmark',
        as: 'bookmark',
        foreignKey: 'event_id'
      })
    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.ENUM(['Photography', 'Development', 'Design', 'Marketing', 'Business', 'Lifestyle', 'Music']),
    date: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};