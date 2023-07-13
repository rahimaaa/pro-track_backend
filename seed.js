const db = require("./db/db");
const { users } = require("./db/models");

const seedUsers = [
  {
    first_name: "Rahima",
    last_name: "Khabibullaeva",
    imageUrl: "fds ",
    email: "rahimahabib@gmail.com",
    password: "kal",
    userType: "student",
    cohort_year: "2023"
  },
  {
    first_name: "bruno",
    last_name: "ogbennya",
    imageUrl: "fds ",
    email: "brunosdhf@gmail.com",
    password: "989",
    userType: "student",
    cohort_year: "2023"
  },
];




const seed = async () => {
    try {
      await db.sync(); // Drops existing tables and recreates them
      await users.bulkCreate(seedUsers);
      console.log("Seeding complete");
    } catch (error) {
      console.error("Seeding error:", error);
    } finally {
      process.exit(); // Close the process after seeding
    }
  };
  
  seed();
  