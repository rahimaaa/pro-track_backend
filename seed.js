const db = require("./db/db");
const {
  User,
  HelpRequest,
  AssignmentStatus,
  Assignment,
  Resource,
  Feed,
  Lecture,
} = require("./db/models");

// const { AssignmentStatus } = require("./db/models");

const seedUsers = [
  {
    firstName: "Rahima",
    lastName: "Khabibullaeva",
    imageUrl: "fds ",
    email: "rahimahabib@gmail.com",
    password: "kal",
    userType: "admin",
    cohort_year: "2023",
  },
  {
    firstName: "bruno",
    lastName: "ogbennya",
    imageUrl: "fds ",
    email: "brunosdhf@gmail.com",
    password: "989",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "sabina",
    lastName: "ismoilova",
    imageUrl: "fds ",
    email: "sabina@ttp.com",
    password: "fdfdf",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "tashi",
    lastName: "sherpa",
    imageUrl: "fds ",
    email: "tashi@gmail.com",
    password: "dfsfsdg",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "kevin",
    lastName: "yu",
    imageUrl: "fds ",
    email: "kevin@ttp.com",
    password: "98dsfsd9",
    userType: "TA",
    cohort_year: "2023",
  },
  {
    firstName: "allan",
    lastName: "lapid",
    imageUrl: "fds ",
    email: "allan@ttp.com",
    password: "9adfef89",
    userType: "admin",
    cohort_year: "2023",
  },
  {
    firstName: "Rahima",
    lastName: "Khabibullaeva",
    imageUrl: "fds ",
    email: "217236587@madisonhs.org",
    password: "Rahima",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "User",
    lastName: "Test",
    imageUrl: "fds ",
    email: "user@gmail.com",
    password: "password",
    userType: "admin",
    cohort_year: "2023",
  },
];

const seedFeed = [
  {
    title: "lovestory",
    content: "Story of a boy in love",
    link: "completed.com",
    userId: "4",
  },
  {
    title: "HardTimes flies",
    content: "I don't understand",
    link: "InProgress.com",
    userId: "1",
  },
];

const seedRequests = [
  {
    studentId: "1",
    request: "Please help me with postgress installation",
    status: "Pending",
    accepted: "True",
    userId: "6",
  },
  {
    studentId: "3",
    request: "Help with react don't understand",
    status: "In Progress",
    accepted: "False",
    taId: "4",
  },
];

const seedAssignment = [
  {
    assignmentId: 1,
    assignmentName: "this",
    instruction: "live you life free of worries",
    group: null,
    assignment_date: null,
    due_date: null,
  },
  {
    assignmentId: 2,
    assignmentName: "that",
    instruction: "do the routes and ifkdk, seed the table",
    group: null,
    assignment_date: null,
    due_date: null,
  },
];

const seedLecture = [
  {
    title: "title 1",
    description: "describe something",
    recordings: "Pending recorded lecture 1",
    password: "1234",
    slides: "True",
    lecture_date: "12th July 2023",
    userId: "5",
  },
  {
    title: "title 2",
    description: "describe me",
    recordings: "Pending recorded lecture",
    password: "5678",
    slides: "None are here",
    lecture_date: "12th June 2023",
    userId: "5",
  },
  {
    title: "title 3",
    description: "complete recorded lecture",
    recordings: "done",
    password: "1034",
    slides: "True",
    lecture_date: "24th June 2023",
    userId: "4",
  },
];

const seedAssignmentStatus = [
  {
    email: "rahimahabib@gmail.com",
    assignmentId: 1,
    groupId: null,
    status: false,
    submission: "kal",
    submissionDate: "06.17.2023",
    feedback: "2023",
  },
  {
    email: "sabina@gmail.com",
    assignmentId: 1,
    groupId: null,
    status: false,
    submission: "linky",
    submissionDate: "06.17.2023",
    feedback: "2023",
  },
  {
    email: "tashi@gmail.com",
    assignmentId: 2,
    groupId: null,
    status: false,
    submission: "linkydsjhak",
    submissionDate: "06.17.2023",
    feedback: "2023",
  },
];

const seedResources = [
  {
    title: "How to git clone",
    description: "uwu uwu uwu uwu",
    category: "Git cloning",
    content: "link",
    userId: "6",
  },
  {
    title: "Deploying your app on vercel",
    description: "muah ha ha ha ha",
    category: "Deployment",
    content: "link",
    userId: "5",
  },
  {
    title: "How write git commit messages",
    description: "blah blah blah",
    category: "Git",
    content: "link",
    userId: "6",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true }); // Drops existing tables and recreates them
    await User.bulkCreate(seedUsers);
    await HelpRequest.bulkCreate(seedRequests);
    await Assignment.bulkCreate(seedAssignment);
    await AssignmentStatus.bulkCreate(seedAssignmentStatus);
    await Resource.bulkCreate(seedResources);
    await Lecture.bulkCreate(seedLecture);
    await Feed.bulkCreate(seedFeed);
    console.log("Seeding complete");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    process.exit(); // Close the process after seeding
  }
};

seed();
