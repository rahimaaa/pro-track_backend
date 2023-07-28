const db = require("./db/db");
const {
  User,
  HelpRequest,
  AssignmentStatus,
  Assignment,
  Resource,
  Feed,
  Lecture,
  Zoom,
  Group,
  Attendance,
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
    lastName: "ismailova",
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
    firstName: "Admin",
    lastName: "Test",
    imageUrl: "fds ",
    email: "admin@gmail.com",
    password: "password",
    userType: "admin",
    cohort_year: "2023",
  },
  {
    firstName: "Student",
    lastName: "Test",
    imageUrl: "fds ",
    email: "student@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "TA",
    lastName: "Test",
    imageUrl: "fds ",
    email: "ta@gmail.com",
    password: "password",
    userType: "TA",
    cohort_year: "2023",
  },
];

const seedFeed = [
  {
    title: "Program Survey",
    content: "Rate the Residency and share your experience",
    link: "RateUs.com",
    userId: "4",
  },
  {
    title: "Staff Evaluation",
    content: "Rate and evaluate your favourite Staff",
    link: "ratingTA's.com",
    userId: "1",
  },
  {
    title: "Course Evaluation",
    content: "Please tell us your favourite topic and why",
    link: "getrated.com",
    userId: "4",
  },
  {
    title: "Due Date for CRUD APP",
    content: "Each member is to have at least 20 commits (in sum) reflected on the remote repository/repositories).",
    link: "",
    userId: "6",
  },
  {
    title: "Notice of Absence",
    content: "If you are observing a religious holiday next week, please email me indicating the exact start time/start date and end time/end date. This will help make informed decisions regarding that. Thank you.",
    link: "",
    userId: "6",
  },
  {
    title: "Google Form Inquiry",
    content: "Please complete as soon as you see this. It is only one multiple choice question in a Google Form. Subject matter in subject line of email.",
    link: "https://docs.google.com/forms",
    userId: "6",
  },
  {
    title: "Google Form Survey",
    content: "Please complete this survey as soon as you see this.",
    link: "https://docs.google.com/forms",
    userId: "6",
  },
];

const seedRequests = [
  {
    studentId: "1",
    request: "Having trouble with useEffect updating the userprofile page",
    status: "Pending",
    accepted: "false",
  },
  {
    studentId: "4",
    request: "Help populating fields in Mongoose",
    status: "Pending",
    accepted: "False",
  },
  {
    studentId: "2",
    request: "Help with react don't understand",
    status: "Pending",
    accepted: "False",
  },
  {
    studentId: "3",
    request: "Unable to connect to Server",
    status: "In Progress",
    accepted: "True",
  },
  {
    studentId: "1",
    request: "Github pages Deployment",
    status: "In Progress",
    accepted: "True",
  },
  {
    studentId: "2",
    request: "Need help with BankApp Assignment",
    status: "Pending",
    accepted: "False",
  },
  {
    studentId: "4",
    request: "Need help resolving this error; createdb: error: database creation failed: ERROR:  permission denied to create database",
    status: "Done",
    accepted: "True",
  },
  {
    studentId: "1",
    request: "Need help connecting with frontend Server from team member systems",
    status: "Done",
    accepted: "True",
  },
  {
    studentId: "3",
    request: "Help connecting backend to Redux ",
    status: "In Progress",
    accepted: "True",
  },
  {
    studentId: "2",
    request: "Need Help resolving internal network error 500 ",
    status: "Pending",
    accepted: "False",
  },
  {
    studentId: "4",
    request: "Need help to resolve 'serverless function crash/ 500 error after a manual npm install'.",
    status: "Pending",
    accepted: "False",
  },
  {
    studentId: "2",
    request: "Help with Authorization and Authentication",
    status: "Pending",
    accepted: "False",
  },
];

const seedAssignment = [
  {
    assignmentId: 1,
    assignmentName: "Git knowledge Check",
    instruction:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    group: null,
    assignment_date: "05.10.23",
    due_date: "05.11.23",
  },
  {
    assignmentId: 2,
    assignmentName: "Github Account",
    instruction: "Create a github account and signup",
    group: "yes",
    assignment_date: "05.11.23",
    due_date: "05.12.23",
  },
  {
    assignmentId: 3,
    assignmentName: "Javascript Knowledge Check",
    instruction: "Create a working javascript program",
    group: null,
    assignment_date: "05.12.23",
    due_date: "05.18.23",
  },
];

const seedLecture = [
  {
    title: "Lecture for 12th June",
    description: "describe something",
    recordings: "Recording completed",
    password: "1234",
    slides: "True",
    lecture_date: "12th July 2023",
    userId: "5",
  },
  {
    title: "Lecture for 18th June",
    description: "describe me",
    recordings: "Pending recorded lecture",
    password: "5678",
    slides: "False",
    lecture_date: "18th June 2023",
    userId: "5",
  },
  {
    title: "Lecture for 24th June",
    description: "Installation of Node.js",
    recordings: "Class recording in Progress",
    password: "1034",
    slides: "True",
    lecture_date: "24th June 2023",
    userId: "4",
  },
];

const seedAssignmentStatus = [
  {
    userId: 1,
    assignmentId: 1,
    // groupId: null,
    status: true,
    submission: "submission of Assignment 1",
    submissionDate: "06.17.2023",
    feedback: "Awesome Job",
  },
  {
    userId: 3,
    assignmentId: 1,
    // groupId: 1,
    status: false,
    submission: "submission of Assignment 1",
    submissionDate: "06.13.2023",
    feedback: "Nice work",
  },
  {
    userId: 4,
    assignmentId: 2,
    // groupId: null,
    status: false,
    submission: "lsubmission of Assignment 2",
    submissionDate: "06.18.2023",
    feedback: "Good job",
  },
  {
    userId: 2,
    assignmentId: 3,
    // groupId: 1,
    status: true,
    submission: "Submission of Assignment 3",
    submissionDate: "06.20.2023",
    feedback: "Needs work",
  },
];

const seedGroup = [
  {
    userId: 1,
    groupId: 1,
    assignmentStatusId: 1,
  },
  {
    userId: 2,
    groupId: 1,
    assignmentStatusId: 1,
  },
  {
    userId: 3,
    groupId: 1,
    assignmentStatusId: 1,
  },
  {
    userId: 4,
    groupId: 1,
    assignmentStatusId: 1,
  },
];
const seedResources = [
  {
    title: "How to install Postgres",
    description: "This Source will show alternate ways to install Psql",
    category: "Postgres Documentation",
    // content: "psql-link",
    userId: "6",
    link: "www.google.com",
    // linkDescription: "Testing link preview",
    image: "image-url",
  },
  {
    title: "Deploying your app on vercel",
    description:
      "This source shows you the steps to successfuly deploy a server",
    category: "Server Deployment",
    // content: "server-link",
    userId: "5",
    link: "www.youtube.com",
    // linkDescription: "Testing link preview",
    image: "image-url",
  },
  {
    title: "Authentication and Authorization",
    description:
      "This provides different means of authentication and authorization",
    category: "Security Services",
    // content: "security-link",
    userId: "6",
    link: "www.google.com",
    // linkDescription: "Testing link preview",
    image: "image-url",
  },
];

const seedZoom = [
  {
    info: "Zoom Meeting Link",
    link: "https://us06web.zoom.us/j/3698593234?pwd=TkJNVmlEU20rK3FMdXI3UU9GUEhqdz09",
  },
];

const seedAttendance = [
  {
    userId: 1,
    M: "P",
    T: "P",
  },
  {
    userId: 2,
    M: "P",
    T: "P",
  },
  {
    userId: 3,
    M: "P",
    T: "P",
  },
  {
    userId: 4,
    M: "P",
    T: "P",
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
    await Group.bulkCreate(seedGroup);
    await Zoom.bulkCreate(seedZoom);
    await Attendance.bulkCreate(seedAttendance);
    console.log("Seeding complete");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    process.exit(); // Close the process after seeding
  }
};

seed();
