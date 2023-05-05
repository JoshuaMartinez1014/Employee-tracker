const inquirer = require("inquirer");
/* const fs = require("fs"); */
const db = require("./config/connection");

function test() {
  console.log("test is working");
}

function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    console.log({
      message: "success",
      data: result,
    });
    Init();
  });
}

async function askRoleIn() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "Choose a role",
    name: "roleName",
  });

  const sql = `INSERT INTO roles (roles.title)
    VALUES ('${answer.roleName}')`;

  db.query(sql, (err, result) => {
    console.log({
      message: "success",
      data: result,
    });
  });
}

async function Init() {
  const response = await inquirer.prompt({
    type: "list",
    message: "Choose an option!",
    name: "employeeManagementMenu",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
    ],
  });
  switch (response.employeeManagementMenu) {
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      test();
      break;
    case "View all employees":
      test();
      break;
    case "Add a department":
      test();
      break;
    case "Add a role":
      askRoleIn();
      break;
    case "Add an employee":
      test();
      break;
    case "Update an employee role":
      test();
      break;
  }
}

Init();
