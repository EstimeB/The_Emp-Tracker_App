// Import and require inquirer, express, and mysql2
const inquirer = require('inquirer');
// const mysql = require('mysql2');
const connection = require('./config/connection');
const consoleTable = require('console.table');

// Connect to mysql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
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
                        updateFunc();
                        break;
                    default:
                        console.log("----------- You've exited the app successfully! -----------");
                }

            })
}

// The view function
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
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.log(res);
        init();
    })
}

function roles(){
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.log(res);
        init();
    })
}

function employees() {
    connection.query("SELECT * FROM employee INNER JOIN role ON role_id INNER JOIN department ON department_id", function(err, res) {
        if (err) throw err;
        console.log(res);
        init();    
    })
}

// // Add Function
// function addFunc() {

// }

// // Update Function
// function updateFunc() {
    
// }

init();