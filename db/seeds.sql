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
	employee (first_name, last_name, role_id, manager_id)
VALUES 	('Sarah', 'Lourd', 'Legal Team Lead', NULL),
		('Kunal', 'Singh', 'Account Manager', NULL),
        ('Ashley', 'Rodriguez', 'Lead Engineer', NULL),
        ('Malia', 'Brown', 'Accountant', 2),
        ('Kevin', 'Tupik', 'Sofware Engineer', 3),
        ('Tom', 'Allen', 'Lawyer', 1),
		('Mike', 'Chan', 'Salesperson', 4);