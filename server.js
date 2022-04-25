// Import and require 
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
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.log('---◆----------------------◆◆◆----------------------◆---');
        console.log(res);
        console.log('---◆----------------------◆◆◆----------------------◆---');
        init();
    })
}

function roles(){
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.log('---◆----------------------◆◆◆----------------------◆---');
        console.log(res);
        console.log('---◆----------------------◆◆◆----------------------◆---');
        init();
    })
}

function employees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.log('---◆----------------------◆◆◆----------------------◆---');
        console.log(res);
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
            connection.query("INSERT INTO department VALUES (?)", [response.department], function(err) {
                if (err) throw err;
                console.log('---◆----------------------◆◆◆----------------------◆---');
                console.log('Added successfully!' + response.department);
                console.log('---◆----------------------◆◆◆----------------------◆---');
                init();
            })
        })
}

// Function to allow user to update the tables' contents
function updateFunc() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'name',
            choices: ["Update department", "Update role", "Update employee", "Exit App"],
            message: 'Select the table you would like to update',
        }]).then(function (response) {
            switch (response.name) {
                case "Update department":
                    updateDepartment();
                    break;
                case "Update role":
                    updateRole();
                    break;
                case "Update employee":
                    updateEmployee();
                    break;
                default:
                    console.log("----------- You've exited the app successfully! -----------");
            }
            init();
        })
}

init();