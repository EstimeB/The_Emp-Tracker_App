SELECT *
FROM role
JOIN department ON role.department_id = department.id;

SELECT *
FROM employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN employee m ON e.manager_id = m.id;
