INSERT INTO
	department (name)
VALUES
	('Sales'),
	('Engineering'),
	('Finance'),
	('Legal');

INSERT INTO
	role (title, salary, department_id)
VALUES
	('Salesperson', 80000, 1),
	('Lead Engineer', 150000, 2),
	('Sofware Engineer', 120000, 2),
	('Account Manager', 160000, 3),
	('Accountant', 125000, 3),
	('Legal Team Lead', 250000, 4),
	('Lawyer', 190000, 4);

INSERT INTO
	employee (first_name, last_name, role_id)
VALUES
	('Kunal', 'Singh', 4),
	('Malia', 'Brown', 2),
	(
		'Sarah',
		'Lourd',
		6),
-- 		('Tom', 'Allen', 7);

-- ('Kevin', 'Tupik', 2),
-- ('Mike', 'Chan', 1),
-- ('Ashley', 'Rodriguez', 2),