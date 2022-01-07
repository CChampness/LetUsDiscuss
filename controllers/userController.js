const { User, Thought } = require('../models');

// Aggregate function to get the count of all users
const userCount = async () =>
  User.aggregate()
    .count('numUsers')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // update an existing user
  updateUser(req, res) {
    console.log("update user, req.params", req.params);
    console.log("update user, req.body", req.body);
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    console.log("createUser, req.body", req.body);
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove their thoughts
  ////////////////////////////////////////////////////////////////////////
  /////////// TEST THIS WITH MULTIPLE THOUGHTS ///////////////////////////
  /////////// TEST THIS WITH MULTIPLE THOUGHTS ///////////////////////////
  /////////// TEST THIS WITH MULTIPLE THOUGHTS ///////////////////////////
  ////////////////////////////////////////////////////////////////////////
  deleteUser(req, res) {
    console.log("delete user, req.params", req.params);
    console.log("delete user, req.body", req.body);
    
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
            // THIS IS WORKING, DON'T MESS WITH IT!
          : res.json({ message: 'User and thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend or friends to a user by id in body
  // For one friend..."friends": "61d86363a091af72adca9267"
  // For two friends..."friends": ["61d86363a091af72adca9267", "61d86363a091af72adca9265"]
  makeFriend(req, res) {
    console.log('You are making a new friend:', req.body.friends);
    console.log(req.params);
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friends } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend (user) from a user by ID
  abandonFriend(req, res) {
    console.log('You are abandoning a friend:', req.body.friends);
    console.log(req.params);
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.body.friends } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
