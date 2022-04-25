// Import and require 
const inquirer = require('inquirer');
// const mysql = require('mysql2');
const connection = require('./config/connection');
const consoleTable = require('console.table');

// Connect to mysql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    init();
});

// To start the app
function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'name',
                choices: ["View", "Add", "Update", "Exit App"],
                message: 'Would you like to view, add, update, or exit the app?',
            }]).then(function (response) {
                switch (response.name) {
                    case "View":
                        viewFunc();
                        break;
                    case "Add":
                        addFunc();
                        break;
                    case "Update":
                        updateEmployeeRoleFunc();
                        break;
                    default:
                        console.log("----------- You've exited the app successfully! -----------");
                }

            })
}

// Function to allow user to view the tables' contents
function viewFunc() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'name',
                choices: ["View all departments", "View all roles", "View all employees", "Exit App"],
                message: 'Select the field you would like to view',
            }]).then(function (response) {
                switch (response.name) {
                    case "View all departments":
                        departments();
                        break;
                    case "View all roles":
                        roles();
                        break;
                    case "View all employees":
                        employees();
                        break;
                    default:
                        console.log("----------- You've exited the app successfully! -----------");
                }
                init();
            })
}
function departments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log('---◆----------------------◆◆◆----------------------◆---');
        console.table(res);
        console.log('---◆----------------------◆◆◆----------------------◆---');
        init();
    })
}
function roles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log('---◆----------------------◆◆◆----------------------◆---');
        console.table(res);
        console.log('---◆----------------------◆◆◆----------------------◆---');
        init();
    })
}
function employees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log('---◆----------------------◆◆◆----------------------◆---');
        console.table(res);
        console.log('---◆----------------------◆◆◆----------------------◆---');
        init();
    })
}

// Function to allow user to create tables' contents
function addFunc() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'name',
                choices: ["Add department", "Add role", "Add employee", "Exit App"],
                message: 'Select the table you would like to add to',
            }]).then(function (response) {
                switch (response.name) {
                    case "Add department":
                        addToDepartment();
                        break;
                    case "Add role":
                        addToRole();
                        break;
                    case "Add employee":
                        addToEmployee();
                        break;
                    default:
                        console.log("----------- You've exited the app successfully! -----------");
                }
                init();
            })
}
function addToDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Please input the department name you would like to add.'
            }]).then(function (response) {
                connection.query("INSERT INTO department VALUES (?)", [response.department], function (err) {
                    if (err) throw err;
                    console.log('---◆----------------------◆◆◆----------------------◆---');
                    console.log('Added successfully!' + response.department);
                    console.log('---◆----------------------◆◆◆----------------------◆---');
                    init();
                })
            })
}
function addToRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role',
                message: 'Please input the role you would like to add.'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter salary.'
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter department id.',
                // To check if types are numbers or strings
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (response) {
            connection.query("INSERT INTO role VALUES (?)", {
                title: response.role,
                salary: response.salary,
                department_id: response.department_id
            }, function (err) {
                if (err) throw err;
                console.log('---◆----------------------◆◆◆----------------------◆---');
                console.log('Added successfully!' + response.role);
                console.log('---◆----------------------◆◆◆----------------------◆---');
                init();
            })
        })
}
function addToEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Enter employee's first name."
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Enter employee's last name."
            },
            {
                // This type is to allow user to enter the index of their choice
                type: 'rawlist',
                name: 'role',
                message: 'Select a role title.',
                choices: // Function to select the title associated with the index the user entered
                    function () {
                        const choiceArr = [];
                        for (i = 0; i < results.length; i++) {
                            choiceArr.push(results[i].title)
                        }
                        return choiceArr;
                    },
            },
            {
                type: 'number',
                name: 'manager',
                message: 'Enter manager id.',
                // To check if types are numbers or strings
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (response) {
            connection.query("INSERT INTO role VALUES (?)", {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: response.role,
                manager_id: response.manager
            }, function (err) {
                if (err) throw err;
                console.log('---◆----------------------◆◆◆----------------------◆---');
                console.log('Added successfully!' + response.first_name.last_name);
                console.log('---◆----------------------◆◆◆----------------------◆---');
                init();
            })
        })
}

// Function to allow user to update the tables' contents
function updateEmployeeRoleFunc() {
    inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'empToUpdate',
                message: 'Select employee to be updated.',
                choices: // Function to select employee to be updated with the index the user entered
                    function () {
                        const choiceArr = [];
                        for (i = 0; i < results.length; i++) {
                            choiceArr.push(results[i].last_name)
                        }
                        return choiceArr;
                    },
            }]).then(function (response) {
                const savedEmpName = response.empToUpdate;

                connection.query("SELECT * FROM department", function (err, res) {
                    if (err) throw err;
                    inquirer
                        .prompt([
                            {
                                type: 'rawlist',
                                name: 'role',
                                message: 'Select role title.',
                                choices: 
                                    function () {
                                        const choiceArr = [];
                                        for (i = 0; i < results.length; i++) {
                                            choiceArr.push(results[i].last_name)
                                        }
                                        return choiceArr;
                                    },
                            },
                            {
                                type: 'number',
                                name: 'manager',
                                message: 'Enter manager id.',
                                // To check if types are numbers or strings
                                validate: function (value) {
                                    if (isNaN(value) === false) {
                                        return true;
                                    }
                                    return false;
                                }
                            }
                        ]).then(function (response) {
                            console.log(response);
                            console.log(savedEmpName);

                            connection.query("UPDATE department SET ? WHERE last_name = ?", [
                                {
                                    role_id: response.role,
                                    manager_id: response.manager
                                },
                                savedEmpName
                            ]),
                            console.log('---◆----------------------◆◆◆----------------------◆---');
                            console.log('Updated successfully!' + response.last_name);
                            console.log('---◆----------------------◆◆◆----------------------◆---');
                            init();
                        })
                })
            })
}

init();