const connection = require('../config/connection');
const { User, Thought} = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users and thoughts
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create an array of some users
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

    // Create an array of some thoughts
    const thoughts = [
      {
        "thoughtText": "Hank has been thinking.",
        "username": "Hank"
      },
      {
        "thoughtText": "Jake thought about it.",
        "username": "Jake"
      },
      {
        "thoughtText": "Eliza also has been thinking.",
        "username": "Eliza"
      }
    ];
  
  
  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
