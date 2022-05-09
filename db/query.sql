SELECT *
FROM role
JOIN department ON role.department_id = department.id;

SELECT *
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN employee ON employee.manager_id = role.id;
