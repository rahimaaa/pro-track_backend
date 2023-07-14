const db = require("./db/db");
const { users, help_request , assignmentStatus} = require("./db/models");

// const { AssignmentStatus } = require("./db/models");

const seedUsers = [
  {
    firstName: "Rahima",
    lastName: "Khabibullaeva",
    imageUrl: "fds ",
    email: "rahimahabib@gmail.com",
    password: "kal",
    userType: "student",
    cohort_year: "2023"
  },
  {
    firstName: "bruno",
    lastName: "ogbennya",
    imageUrl: "fds ",
    email: "brunosdhf@gmail.com",
    password: "989",
    userType: "student",
    cohort_year: "2023"
  },
  {
    firstName: "sabina",
    lastName: "ismoilova",
    imageUrl: "fds ",
    email: "sabina@ttp.com",
    password: "kal",
    userType: "student",
    cohort_year: "2023"
  },
  {
    firstName: "tashi",
    lastName: "sherpa",
    imageUrl: "fds ",
    email: "tashi@gmail.com",
    password: "kal",
    userType: "student",
    cohort_year: "2023"
  },
  {
    firstName: "kevin",
    lastName: "yu",
    imageUrl: "fds ",
    email: "kevin@ttp.com",
    password: "989",
    userType: "TA",
    cohort_year: "2023"
  },
  {
    firstName: "allan",
    lastName: "lapid",
    imageUrl: "fds ",
    email: "allan@ttp.com",
    password: "989",
    userType: "admin",
    cohort_year: "2023"
  },
];

const seedRequests = [
  {
    stud_email: "rahimahabib@gmail.com",
    request: "Please help me with postgress installation",
    status: "In Progress ",
    ta_email: "kevinYu@gmail.com",
    accepted: "True"
  },
  {
    stud_email: "bruno2@gmail.com",
    request: "Help with react don't understand",
    status: "In Progress",
    ta_email: "johnhui@gmail.com",
    accepted: "False"
  },
];


const seedAssignmentStatus = [
  {
    email: "rahimahabib@gmail.com",
    assignmentId: null,
    groupId: null,
    status: "done",
    submission: "kal",
    submissionDate: "06.17.2023",
    feedback: "2023"
  },
  
];


const seed = async () => {
    try {
      await db.sync({force:true}); // Drops existing tables and recreates them
      await users.bulkCreate(seedUsers);
      await help_request.bulkCreate(seedRequests);
      await assignmentStatus.bulkCreate(seedAssignmentStatus);
      console.log("Seeding complete");
    } catch (error) {
      console.error("Seeding error:", error);
    } finally {
      process.exit(); // Close the process after seeding
    }
  };
  
  seed();

  