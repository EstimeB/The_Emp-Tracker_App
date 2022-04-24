// Import and require inquirer, express, and mysql2
const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require('./config/connection');

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
                        console.log("----------- You've exited the app -----------");
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
                    console.log("----------- You've exited the app -----------");
            }

        })
}