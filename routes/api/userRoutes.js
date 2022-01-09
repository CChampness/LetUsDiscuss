const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  makeFriend,
  abandonFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// // /api/users/:userId/friends
// router.route('/:userId/friends').post(makeFriend);

// // /api/users/:userId/friends
// router.route('/:userId/friends').delete(abandonFriend);

// // /api/users/:userId/friends/:userId
router.route('/:userId/friends/:friendId')
.post(makeFriend)
.delete(abandonFriend);

module.exports = router;
