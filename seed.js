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
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/32ea9ef2-e9cd-4ded-a1a1-a9e4075fea86 ",
    email: "rahimahabib@gmail.com",
    password: "kal",
    userType: "admin",
    cohort_year: "2023",
  },
  {
    firstName: "bruno",
    lastName: "ogbennya",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/5c3797d2-b217-4a31-92ff-92c3b2512643",
    email: "brunosdhf@gmail.com",
    password: "989",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "sabina",
    lastName: "ismailova",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/041ff3d6-3170-4457-9763-3ea2ba27604e",
    email: "sabina@ttp.com",
    password: "fdfdf",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "tashi",
    lastName: "sherpa",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/ba0c2626-08ff-485e-8627-dbacf55ac3ed",
    email: "tashi@gmail.com",
    password: "dfsfsdg",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "kevin",
    lastName: "yu",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/820e5f9a-9eab-4694-bc9a-cda0dd4d346a ",
    email: "kevin@ttp.com",
    password: "98dsfsd9",
    userType: "TA",
    cohort_year: "2023",
  },
  {
    firstName: "allan",
    lastName: "lapid",
    imageUrl: "https://media.licdn.com/dms/image/C4E03AQHW82f77_NmtQ/profile-displayphoto-shrink_800_800/0/1531327502372?e=1696464000&v=beta&t=redntC2wpd9LpfFGvuOA3-50n4hBDIiPIskXcKS0oP4",
    email: "allan@ttp.com",
    password: "9adfef89",
    userType: "admin",
    cohort_year: "2023",
  },
  {
    firstName: "Miranda",
    lastName: "karecho",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/1473db7a-1b88-4d29-ac31-dea04c7da307",
    email: "217236587@madisonhs.org",
    password: "Rahima",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Hafeefa",
    lastName: "Sultan",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/62b56e75-9859-4098-b2f9-3dd7defe29ad",
    email: "stuuupidn@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Mahmud",
    lastName: "Babu",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/ef129ff8-616e-4eaa-aaf7-40d7151dc0be",
    email: "student@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Mahatir",
    lastName: "Niloy",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/a7bb7ef5-7075-4442-83ec-96d371832fd6",
    email: "niloy@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Hamza",
    lastName: "Mohammed",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/00703049-24fb-498a-96df-33797b60c724",
    email: "hamza@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Steve",
    lastName: "Jobs",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg ",
    email: "steve@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Sundar",
    lastName: "Pitchear",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Sundar_pichai.png",
    email: "sundar@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Nafisa",
    lastName: "Sultan",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/95d1640f-c81d-4767-bd4e-040312403590",
    email: "nafisa@gmail.com",
    password: "password",
    userType: "student",
    cohort_year: "2023",
  },
  {
    firstName: "Siobhan",
    lastName: "Ebert",
    imageUrl: "https://github.com/TashiXD/pro-track_frontend/assets/77645810/31eae197-ac47-4d38-bf1f-67f57455a50e",
    email: "siobhana@gmail.com",
    password: "password",
    userType: "student",
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
    assignmentName: "Assignment #1: COLLAB WORKSHOP",
    instruction:
      `Choose a cause that your group really cares about and put together a small informational 
      website using HTML/CSS trying to convince people to donate to or help out this cause. 
      This site should be 2-3 pages and look as professional as possible using modern design trends. 
      Research similar websites to get inspiration. 
      Once you have decided on a cause, begin by selecting one teammate to create a Git repo 
      with an index.html file, push it to GitHub, then add the other teammates as collaborators on the repo. 
      Throughout this workshop each teammate should be communicating often and using GitHub effectively. 
      Remember no one should be working off Master so create branches, resolve merge conflicts, and create and close issues.`,
    group: null,
    assigned: true,
    assignment_date: "05.10.2023",
    due_date: "05.11.2023",
  },
  {
    assignmentId: 2,
    assignmentName: "Assignment #2: JS Assignment",
    instruction: `The following (12) are some of the most popular and used methods in functional languages:
    forEach Map Filter Some (Any) Every Reduce Includes indexOf Push lastIndexOf Object.keys() Object.values()
    For this assignment, you will recreate these methods using JavaScript functions. Make sure to carefully
     understand what each method is designed to do, and DO NOT use any of the respective native JS methods 
     to implement your solutions. Also, keep in mind that these methods do not (except for push()) mutate
      the input array. We highly suggest utilizing Mozilla Developer Network (MDN) Web Docs to understand 
      how each method works and what arguments they take. Each doc entry is linked above. Also look into 
      Array.prototype.pop(), Array.prototype.shift(), and other methods for your own enrichment.`,
    group: null,
    assigned: true,
    assignment_date: "05.11.2023",
    due_date: "05.12.2023",
  },
  {
    assignmentId: 3,
    assignmentName: "Assignment #3: DOM CHALLENGE I",
    instruction: `This is an exercise that will help get you acclimated to the DOM API. 
                  For each individual prompt, write out the code necessary to achieve the 
                  particular task at hand. Test it out, and then move forward. If you encounter
                  a situation where you can use a previous prompt's solution for the one you are 
                  currently working on, feel free to keep it DRY (Do-Not-Repeat-Yourself) and 
                  leverage that reusable code. By the same token, if you encounter a situation 
                  where a previous prompt's solution is a blocker (gets in the way of what you 
                  are trying to achieve at the moment), then prioritize the current prompt. 
                  You can comment out the code that's blocking, test out the current code that 
                  you are working on, and after verifying that it works you can comment back in 
                  the previous code. In this way, you'll be treating each prompt as an individual, 
                  distinct task. The primary point is to become more familiar with the DOM methods 
                  that allow you to interact and manipulate the Document Object Model.`,
    group: null,
    assigned: true,
    assignment_date: "05.12.2023",
    due_date: "05.18.2023",
  },
  {
    assignmentId: 4,
    assignmentName: "Assignment #4: DOM Challenges II",
    instruction:
      `Complete and submit the following:
      Create an HTML page with two buttons that argue with each other. When one button is clicked, the text "I'm right" should be placed next to it. When the other button is clicked, the text is replaced with, "No, I'm right!"
      Create an HTML page with a large element on the page that says "Don't hover over me" inside of it. When you hover over the element, send an alert to the user that says, "Hey, I told you not to hover over me!
      Create an HTML page with a form. It should include inputs for a username, email, and password. Also a submit button.
      In a Javascript file, write a program which checks the following things:
      checks that the password is 12345678
      if the password is incorrect, send an alert message
      Your page should also include an <h1> tag. If the information in the form is correct, have Javascript change the text in the <h1>.HTML page.
      Add a CSS stylesheet that styles all of your pages.
      BONUS: Create an HTML page with a form that asks the user to input the value of a sphere's radius. Write Javascript that gives them back the volume of the sphere. (There are many different ways to execute this. You can give the user information back in another input box on the page, as an alert, or any other way you can think of. You can look up how to use the Javascript Math object to simplify your calculations.)
      `,
    group: null,
    assigned: false,
    assignment_date: "06.14.2023",
    due_date: "06.15.2023",
  },
  {
    assignmentId: 5,
    assignmentName: "Assignment #5: DOM III",
    instruction:
      `For each user story, make a feature branch. Try to commit often and commit frequently on each feature branch. Please incorporate GitHub Projects as well, using the Automated Kanban template. Create a note for each user story and then convert that note to an issue. Remember, try to have your branches named as closely to the feature/ticket/issue it is intended to build out. Do not forget to type in “closes #” in the body of Pull Requests to close associated issues.

      Click on a ticket/issue and explore the different sections such as “Assignees, Labels, and Projects” and make sure that your ticket is associated to your project, otherwise your PRs and Tickets won’t be automated and tethered together (this should be done for you already, but double-check). A few useful methods, properties, and events for this assignment:
      
      getElementById()
      
      addEventListener()
      
      getElementsByTagName()
      
      createElement()
      
      appendChild()
      
      event.target
      
      node.children
      
      Array.from()
      
      mousedown
      
      mouseover
      
      mouseup
      
      Assignment
      Based on the in-class demonstration, complete the following user stories: As a user, I can:
      
       add rows to the grid
       add columns to the grid
       remove rows from the grid
       remove columns from the grid
       select a color from a dropdown menu of colors
       click on a single cell, changing its color to the currently selected color
       fill all uncolored cells with the currently selected color
       fill all cells with the currently selected color
       clear all cells/restore all cells to their original/initial color
       click and hold (mouseover) from a single cell (start) to a different cell (end) 
       such that all affected/hovered-over cells from start to end change to the currently selected color
       `,
    group: null,
    assigned: false,
    assignment_date: "06.14.2023",
    due_date: "06.15.2023",
  },
  {
    assignmentId: 6,
    assignmentName: "Assignment #6: DOM III + ReactJS",
    instruction:
      `You'll be re-doing part of the functionality of the DOM Challenges III (grid/row/column/color) assignment, but with Create-React-App this time around. Instead of directly using the DOM API, you'll be managing state (hint: the currently selected color and the grid), writing methods within the class instead of standalone functions, and passing down bounded-event handlers to be fired off in the children components that have event listeners on them (note: since this will be bound in a parent, then any child component that receives the bound function as a passed down prop will be able to impact [perform calculations/operations relevant to the parent] the parent component). The MVP (minimum viable product) features can be achieved with four components: App.jsx, Table.jsx, TableCell.jsx, TableRow.jsx, where App.jsx is a stateful, class component and the other three components are purely presentational components. The MVP features are: a user can add a row, a user can add a column, and a user can select a color to change a single cell via click. As a user, I can add a row, add a column, select a color from a dropdown menu of colors, and click on individual cells to color in the cell. Stretch and optional features will be recreating the entirety (clear the grid, fill the grid, fill uncolored cells, etc) of DOM Challenges III, but in ReactJS. There should be a dedicated and individual feature branch for each function you plan on writing as well as a dedicated and individual feature branch for each component you write out.

      Use this time to also do two things:
      
      Navigate to this extension for Google Chrome and install it: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en. This shows you the root React components that were rendered on the page, as well as the subcomponents that they ended up rendering. By selecting one of the components in the tree, you can inspect and edit its current props and state in the panel on the right. In the breadcrumbs you can inspect the selected component, the component that created it, the component that created that one, and so on. If you inspect a React element on the page using the regular Elements tab, then switch over to the React tab, that element will be automatically selected in the React tree.
      Deploy this to GitHub Pages. Please refer to this link for guidance on this: https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d (debug as necessary)
      More Direction/Suggestions
      Put all of your components in a directory titled components
      
      Create an index.js file for that components directory so that you can have a central location of exporting (it will look something like this, not identically of course) (this is known as a barrel file)
      
      The above will allow you to import multiple components from this one file in your App.jsx (or any file that needs a component) in a convenient, semantic way that appears like so (disregard the names of the files and substitute the names of your particular components):
      
       import { HeaderView, MainView, FooterView, RoutesView } from "./components"; (index.js is automatically implied and interpreted)
      App.jsx could maintain the state of the grid as well as the state of the selected color (stateful, class component)
      
      App.jsx could have methods (bound event handler functions) on the class which will be passed down to children components via props (the children components, presentational components, will have event listeners that will fire off the bound event handler functions
      
      App.jsx could render the dropdown menu as well as the Table Component (presentational component)
      
      Table.jsx could be the parent of TableRow.jsx (presentational component)
      
      TableRow.jsx could be the parent of TableCell.jsx (presentational component)
      
      The above are merely suggestions and by no means is a mandatory approach
      
      Assignment
      Complete the following user stories (bold denotes an MVP/mandatory feature, whereas italics denotes a stretch/optional feature): As a user, I can:
      
       add rows to the grid
       add columns to the grid
       remove rows from the grid
       remove columns from the grid
       select a color from a dropdown menu of colors
       click on a single cell, changing its color to the currently selected color
       fill all uncolored cells with the currently selected color
       fill all cells with the currently selected color
       clear all cells/restore all cells to their original/initial color
       click and hold (mouseover) from a single cell (start) to a different cell (end) such that all affected/hovered-over cells from start to end change to the currently selected color      
      `,
    group: null,
    assigned: false,
    assignment_date: "06.14.2023",
    due_date: "06.20.2023",
  },
  {
    assignmentId: 7,
    assignmentName: "Assignment #7: API I",
    instruction:
      `The Zip and City search API (ctp-zip-api)
      https://zip-api.eu/en/
      
      For this project we will be developing two simple applications, (1) the first app allows us to search for City names and details for a given zip code, and (2) the second app allows us to find the distance between 2 given zip codes.
      
      Below is a description of the relevant API endpoints for the projects:
      
      /radius/[country_code]-[postal_code]/[distance]/[unit] - find Cities associated with a zipcode within a given distance
      https://zip-api.eu/api/v1/radius/US-11373/5/km
      
      You will receive a JSON response with an array containing an object for each city found.
      
      /info/[country_code]-[postal_code] - find city names associated with a zip code
      https://zip-api.eu/api/v1/info/US-11373
      
      Project 1: Zip Code Search app
      In this project you will build a simple Zip Code search app. We will need an input field where the user can enter a zip code, like in the following image:
      
      We will use the user input to search zip-api. If the zip code is valid the API will respond with an object. Use that response to display the relevant user information.
      
      Getting started
      To get started run the following commands
      
      create-react-app zip-search
      cd zip-search
      npm start
      At this point you should see the React hello world page running on your browser. You should leave it running in the background while you work on this project.
      
      Now open this folder (zip-search) in your text editor. You will see all of the code the create-react-app setup for us. Since this is the stock project we can begin editing the files as we see fit. You can start at App.js and you can also edit public/index.html (to add Bootstrap for example).
      
      Project 2: Distance between Zips
      In this project we will allow the user to provide us two zip codes and we will display the distance between the 2 zip codes.
      
      To get started run the following commands
      
      create-react-app zip-distance
      cd zip-distance
      npm start
      At this point you should see the React hello world page running on your browser. You should leave it running in the background while you work on this project.
      
      Now open this folder (zip-distance) in your text editor. You will see all of the code the create-react-app setup for us. Since this is the stock project we can begin editing the files as we see fit. You can start at App.js and you can also edit public/index.html (to add Bootstrap for example).
      
      Using the same API as project 1, we will build a zip-distance app, where given two zip codes, we will calculate the distance between the two zip codes.
      
      Primary Tasks
      Using the same zip-api we used in project 1:
      
      Implement a distance calculator
      it should allow US zip codes only
      Display distance in a given metric
      Stretch Features (Optional, but highly recommended)
      Keep a history of recent searches
      Let user choose between which measurement they want the output in(either miles or kilometers) 
      `,
    group: null,
    assigned: false,
    assignment_date: "06.14.2023",
    due_date: "06.16.2023",
  },
  {
    assignmentId: 8,
    assignmentName: "Assignment #8: API II",
    instruction:
      `When App mounts, load trending gifs

      DO NOT WRITE ALL COMPONENTS IN ONE FILE. Break out components into separate files, and make sure that they are imported/exported properly
      
      Consider using three components:
      
      App Component: has state with GIFS
      
      SearchField Component: has state with search field input
      
      GifCard Component: presentational component receiving GIF info as props
      
      In order to interact with the API, you will need to create a free developer account and create a new project to have an API key generated for you.
      
      To hit various GIPHY API Endpoints, you can use the following paths:
      
      Regular Search: http://api.giphy.com/v1/gifs/search?q=SEARCH+TERM+GOES+HERE&api_key=YOUR_API_KEY
      
      returns an array of gif objects
      Trending Search: http://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY
      
      returns an array of gif objects
      Random Search: http://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY
      
      returns a singular gif object
      `,
    group: null,
    assigned: false,
    assignment_date: "06.14.2023",
    due_date: "06.17.2023",
  },
  {
    assignmentId: 9,
    assignmentName: "Assignment #9: ReactRouter",
    instruction:
      `Client-side routing is a bit of a misnomer.

      On the server, routing generally refers to the way we define the URLs and RESTful resources that make up our application. 
      Whether we are asking for data from the database or persisting data, our server needs to know where the data lives. 
      Server routes help us keep track of this information.
      
      In the browser, things are a little different. 
      When we build Single-Page Applications, we render our data inside of the browser. 
      The data lives on a server, so our data's "addresses" have been defined elsewhere. We only need to know what these pre-defined addresses are to consume them. We'll still have a lot of different views for our data, and we won't want to show all of them on the page at once. Client-side routing is how we'll describe which views we are showing on the page at any given time.
      
      Routing in React
      React does not provide built-in functionality for client-side routing. 
      However, we can use external libraries specifically designed for this purpose, 
      such as React Router. React Router is a popular routing library that allows us to 
      handle client-side routing seamlessly in our React applications.
      
      In this lesson, we will focus on React Router v6, the latest version of the library. 
      React Router v6 introduced significant changes and improvements over previous versions. It offers a simpler and more intuitive API, 
      enhanced nested routing capabilities, and improved programmatic navigation.

      To get started with React Router v6, let's set it up in a new React application:
      Create a new React application using npx create-react-app.
      Navigate to the project directory.
      Install React Router v6 using npm install react-router-dom@next
      `,
    group: null,
    assigned: false,
    assignment_date: "06.14.2023",
    due_date: "07.10.2023",
  },
  {
    assignmentId:10,
    assignmentName: "Assignment #10: Database Practice",
    instruction:
      `Download and install PostgreSQL on your devices (for Mac users I recommend the app)

      Using Figma/Lucidchart, create an ER Diagram of your database you plan to create
      Create a brand new database with a specific topic (eg pizza, students, employees, etc.) with:
      At least four different tables.
      Each table should have a primary key
      Each table should have at least four dummy tuples
      Each table should be able to be joined with one other table in the database (this will make sense once you understand schemas)
      Write an inner join query that joins two tables, one that joins three tables and one that joins all four tables (you can stack inner joins)
      Finally using Postman, try to:
      Post a brand new line of data
      Get two different lines of dummy data that you placed inside the database. Take a screenshot of your work on Postman and put it inside of your repo.
     You can do this by either setting up Express routes to hit (recommended) or straight through the database using xmysql package You don’t have to try running your code on the psql shell, but it is recommended so you can make sure that you understand sql properly. Highly recommend that you remember where you installed your postgres server on your windows pc, you need to add the postgres bin to your environmental variables to connect to postgres with libraries like node-postgres.
      `,
    group: null,
    assigned: false,
    assignment_date: "07.18.2023",
    due_date: "07.15.2023",
  },
];

const seedLecture = [
  {
    title: "Lecture for 12th June",
    description: "June 12th: Pilot Assessment, Introductions, Orientation",
    recordings: "https://us06web.zoom.us/rec/share/UpDoarolKxCNnCTEtqGqfO5kNvvHIoYLlkA0w3g9aXB1amfeSxYEJt6Yt06Wj6mx.joG1sQ8-kzEriU6j",
    password: "fBn$4*A=",
    slides: "True",
    lecture_date: "07.12.2023",
    userId: "5",
  },
  {
    title: "Lecture for 13th June",
    description: "June 13th: Collaborative Workflow (Git) and Introduction to JavaScript",
    recordings: "https://us06web.zoom.us/rec/share/NGlcLYziFTFTg0ZXG1O9cOAbbHBUUc4qEIw3mFOtuClF22FGK1s3-UhfBXM79N1V.1SEq4f3B7K5-YRm5",
    password: "j8vg@#$Q",
    slides: "False",
    lecture_date: "06.13.2023",
    userId: "5",
  },
  {
    title: "Lecture for 14th June",
    description: "June 14th: DOM Manipulation",
    recordings: "https://us06web.zoom.us/rec/share/FhxrtQF2bNUQYLGe77A6wW-g5KivKgdGYb80TjaEgRgIoPPdSCl6HMMdrxZOxO6j.b1PERfNeoamt4U8q",
    password: "9#AudEdZ",
    slides: "True",
    lecture_date: "06.14.2023",
    userId: "4",
  },
  {
    title: "Lecture for 15th June",
    description: "June 15th: Introduction to React",
    recordings: "https://us06web.zoom.us/rec/share/yjyYaokbhPnQL1fIWIX38N_WtVhfttMgJm2BNyTkjEzgeG7jNdCZoQmixfh1YJQ0.kE8dj-BrmKrahRRM",
    password: "ajAVW#T5",
    slides: "True",
    lecture_date: "06.15.2023",
    userId: "4",
  },
  {
    title: "Lecture for 16th June",
    description: "June 16th: Introduction to External API Requests and ReactJS",
    recordings: "https://us06web.zoom.us/rec/share/xL9gxfgCiDzaItGOYshPahqEnOALR-S-pYA4pxNuWBZ9LUTqad3eoKR0-M2SkMpS.zzyJNTI2y5xLymcF",
    password: "ms+5qKYD",
    slides: "True",
    lecture_date: "06.16.2023",
    userId: "4",
  },
  {
    title: "Lecture for 20th June",
    description: "June 20th: React Router",
    recordings: "https://us06web.zoom.us/rec/share/hTY4ZPXVN8G2FaW7NnAtp8ElZSZvZhqMGyIwbs_KmZAVuA0tysNLDi63_4aASUvs.ktK6muT4xnXjU3sB",
    password: "#MJ@#L@2",
    slides: "True",
    lecture_date: "06.20.2023",
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
    category: "Vercel Server Deployment",
    // content: "server-link",
    userId: "5",
    link: "https://vercel.com/guides/deploying-pusher-channels-with-vercel",
    // linkDescription: "Testing link preview",
    image: " ",
  },
  {
    title: "Grouping Requests in collections| Postman Learning Center",
    description:
      "Grouping Requests in collections: Postman Documentation",
    category: "Postman Issues",
    userId: "6",
    link: "https://learning.postman.com/docs/sending-requests/intro-to-collections/",
    image: "",
  },
  {
    title: "Guide to React Debugging with Documentation",
    description:
      "",
    category: "React Debugging",
    userId: "6",
    link: "https://dev.to/colocodes/how-to-debug-a-react-app-51l4",
    image: "",
  },
  {
    title: "Debugging in NodeJs",
    description:
      "",
    category: "Node.Js Issues",
    userId: "6",
    link: "https://blog.logrocket.com/debug-node-js-chrome-devtools-watchers/",
    image: "",
  },
  {
    title: "What are Dependency Arrays in react",
    description:
      "",
    category: "React Issues",
    userId: "6",
    link: "https://devtrium.com/posts/dependency-arrays",
    image: "",
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
    // await Attendance.bulkCreate(seedAttendance);
    console.log("Seeding complete");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    process.exit(); // Close the process after seeding
  }
};

seed();
