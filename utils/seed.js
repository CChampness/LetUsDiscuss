const connection = require('../config/connection');
const { User, Thought} = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [
    {
      username: "Hank",
      email: "hank@mail.com",
    },
    {
      username: "Jake",
      email: "jake@mail.com"
    },
    {
      username: "Eliza",
      email: "eliza@mail.com"
    },
  ];

  // const thoughts = [
  //   {
  //     username: "Hank",
  //     thoughtText: "Let's get going!",
  //   },
  //   {
  //     username: "Hank",
  //     thoughtText: "OK, now we're talking.",
  //   },
  // ];

  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  // await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
