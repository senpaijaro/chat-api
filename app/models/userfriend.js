const { v4: uuid } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFriend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserFriend.belongsTo(models.User, {
        foreignKeyConstraint: 'userId'
      })
      // define association here
    }
  };
  UserFriend.init({
    userId: DataTypes.UUID,
    friend_id: DataTypes.UUID,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserFriend',
  });
  UserFriend.beforeCreate((user, _ ) => {
    return user.id = uuid();
  })
  return UserFriend;
};