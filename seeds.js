import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import User from './models/User.js';


dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Running User Seeder...');
  })
  .catch((error) => {
    console.log(error);
  });

const seedUsers = [
  {
    email : "albertarakelyan1998@gmail.com",
    firstName : "Albert",
    lastName : "Arakelyan",
    password : "$2a$10$86gGtjQyjAyjV9myZM4GyuBIg7R3ynqAE0vQ8WF6j6WFthZ5pHqMa",
    role : "admin",
    isEmailVerified : true,
  },
  {
    email : "johndoe@mail.loc",
    firstName : "John",
    lastName : "Doe",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "johnsmith@mail.loc",
    firstName : "John",
    lastName : "Smith",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "adellegasparyan@mail.loc",
    firstName : "Adelle",
    lastName : "Gasparyan",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "aregkarapetyan@mail.loc",
    firstName : "Areg",
    lastName : "Karapetyan",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "vardanmansuryan@mail.loc",
    firstName : "Vardan",
    lastName : "Mansuryan",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },

  {
    email : "lilithkaraoetyan@mail.loc",
    firstName : "Lilith",
    lastName : "Karapetyan",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "merimelqonyan@mail.loc",
    firstName : "Meri",
    lastName : "Melqonyan",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "emiliaclarke@mail.loc",
    firstName : "Emilia",
    lastName : "Clarke",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "harunosakura@mail.loc",
    firstName : "Sakura",
    lastName : "Haruna",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "narutouzumaki@mail.loc",
    firstName : "Naruto",
    lastName : "Uzumaki",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "inoyamanaka@mail.loc",
    firstName : "Ino",
    lastName : "Yamanaka",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "shikamarunara@mail.loc",
    firstName : "Shikamaru",
    lastName : "Nara",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "kakashi@mail.loc",
    firstName : "Kakashi",
    lastName : "Hatake",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
  {
    email : "sasuke@mail.loc",
    firstName : "Sasuke",
    lastName : "Uchiha",
    password : "$2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i",
    role : "user",
    isEmailVerified : true,
  },
];


// $2a$10$HoLxlNlOz64qS.jMCmYmo.9EQq0tHr8Iz.7vGcdhcEtALyi4DaU2i - 12345678

const seedDB = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    console.log('Users seeded');
  } catch (error) {
    console.log(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});