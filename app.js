const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

const employees = [];


var questions = [
  {
    type: "input",
    name: "name",
    message: "What is your manager's name? ",
  },
  {
    type: "input",
    name: "id",
    message: "What is your manager's id number? ",
  },
  {
    type: "input",
    name: "email",
    message: "What is your manager's email? ",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number? ",
  },
];

var engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your engineer's name? ",
  },
  {
    type: "input",
    name: "id",
    message: "What is your engineer's id number? ",
  },
  {
    type: "input",
    name: "email",
    message: "What is your engineer's email? ",
  },
  {
    type: "input",
    name: "github",
    message: "What is your engineer's GitHub username? ",
  },
];

var internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your intern's name? ",
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern's id number? ",
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern's email? ",
  },
  {
    type: "input",
    name: "school",
    message: "What is your intern's school? ",
  },
];

var choiceQuestion = [
  {
    type: "list",
    name: "type",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
  },
];

console.log("Please build your team");
inquirer.prompt(questions).then((answers) => {
  const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  employees.push(manager);
  choices();
});

function choices() {
  inquirer.prompt(choiceQuestion).then((answers) => {
    switch (answers.type) {
      case "Engineer":
        engineer();
        break;
      case "Intern":
        intern();
        break;
      case "I don't want to add any more team members":
        renderhtml();
        break;
    }
  });
}

function engineer() {
  inquirer.prompt(engineerQuestions).then((answers) => {
    const engineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    employees.push(engineer);
    choices();
  });
}

function intern() {
  inquirer.prompt(internQuestions).then((answers) => {
    const intern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    employees.push(intern);
    choices();
  });
}

function renderhtml() {
  console.log(employees);

  fs.writeFile(outputPath, render(employees), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
