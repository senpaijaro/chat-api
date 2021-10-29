
const { UserFriend } = require('@models');
const { STATUS } = require('@helpers');

exports.checkFriendRequest = async (req, res, next) => {
  try {
    const { friend_id = "" } = req.body;
    const user = res.locals.user;
    const userFriend = await UserFriend.findOne({
      where: { friend_id, userId: user.id }
    });

    if(userFriend !== null) {
      
      if(userFriend.status === STATUS.PENDING) {
        return res.status(400).send({ message: 'Already sent friend request'});
      } 

      if(userFriend.status === STATUS.ACTIVE) {
        return res.status(400).send({ message: 'You already friend this person'});
      } 
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}