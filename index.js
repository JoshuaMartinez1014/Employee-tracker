const inquirer = require("inquirer");
/* const fs = require("fs"); */
const db = require("./config/connection");
//

//
function test() {
  console.log("test is working");
}

function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
      data: result,
    });
    Init();
  });
}

function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
      data: result,
    });
    Init();
  });
}

function viewAllEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
      data: result,
    });
    Init();
  });
}

async function addADepartment() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "Insert Department",
    name: "departmentInsert",
  });

  const sql = `INSERT INTO department (name)
    VALUES ('${answer.departmentInsert}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}

async function addARole() {
  const roleQuestions = [
    {
      type: "input",
      message: "Insert Role Title",
      name: "roleTitle",
    },
    {
      type: "input",
      message: "Insert Role Salary",
      name: "roleSalary",
    },
    {
      type: "input",
      message: "Insert department id",
      name: "departmentId",
    },
  ];
  const answer = await inquirer.prompt(roleQuestions);

  const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES ('${answer.roleTitle}', '${answer.roleSalary}', '${answer.departmentId}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}

async function addAnEmployee() {
  const employeeQuestions = [
    {
      type: "input",
      message: "Insert employee first name",
      name: "firstName",
    },
    {
      type: "input",
      message: "Insert employee first name",
      name: "lastName",
    },
    {
      type: "input",
      message: "Insert employee role_id",
      name: "employeeRole",
    },
    {
      type: "input",
      message: "Insert employee manager id",
      name: "employeeManager",
    },
  ];

  const answer = await inquirer.prompt(employeeQuestions);
  const managerId = answer.employeeManager
    ? `'${answer.employeeManager}'`
    : null;
  const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
    VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.employeeRole}', ${managerId})`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}
//
async function updateEmployeeRole() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      message: "Insert employee's id",
      name: "employeeId",
    },
    {
      type: "input",
      message: "Insert employee's new role",
      name: "employeeRole",
    },
  ]);
  const sql = `UPDATE employee 
             SET roles_id = '${answer.employeeRole}'
             WHERE id = ${answer.employeeId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}
async function deleteADepartment() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "Insert deparment's ID",
    name: "idToDelete",
  });
  const sql = `DELETE FROM department WHERE id = ${answer.idToDelete}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}
async function deleteARole() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "Insert role's ID",
    name: "idToDelete",
  });
  const sql = `DELETE FROM roles WHERE id = ${answer.idToDelete}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}
async function deleteAnEmployee() {
  const answer = await inquirer.prompt({
    type: "input",
    message: "Insert employee's ID",
    name: "idToDelete",
  });
  const sql = `DELETE FROM employee WHERE id = ${answer.idToDelete}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log({
      message: "success",
    });
    Init();
  });
}

//
// prettier-ignore
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
      "Delete a department",
      "Delete a role",
      "Delete an employee",  
      "Update an employee role",
    ],
  });
  switch (response.employeeManagementMenu) {
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "View all employees":
      viewAllEmployees();
      break;
    case "Add a department":
      addADepartment();
      break;
    case "Add a role":
      addARole();
      break;
    case "Add an employee":
      addAnEmployee();
      break;
      case "Delete a department":
        deleteADepartment();
        break;
        case "Delete an employee":
          deleteAnEmployee();
          break;
          case "Delete a role":
            deleteARole();
            break;
       case "Update an employee role":
         updateEmployeeRole();
         break;
  }
}

Init();
