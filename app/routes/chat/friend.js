const { User, UserFriend } = require('@models');
const { checkFriendRequest } = require('@middleware/chat/friend');

exports.route = (app) => {
  app.get('/friends', async (req, res) =>{
    const user = res.locals.user
    const users = await User.findAll({
      attributes: ['name', 'id'],
      where: { id: user.id },
      include: {
        model: UserFriend,
        attributes: ['friend_id', 'status']
      }
    });
    return res.status(200).send({ result: { users } });
  })

  app.post('/friends', checkFriendRequest, async (req, res) =>{
    const user = res.locals.user
 
    const result = await UserFriend.create({
      userId: user.id,
      friend_id: '8f1465a0-02a3-48d6-b3c1-19e4ffe20ac9',
      status: 0
    });

    return res.status(200).send({ result });
  })
}