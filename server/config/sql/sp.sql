/*STORED PROCEDURE*/
DROP PROCEDURE IF EXISTS UserAuthentication;
DROP PROCEDURE IF EXISTS GetUserById;
DROP PROCEDURE IF EXISTS GetUserByEmail;
DROP PROCEDURE IF EXISTS CreateNewUser;
DROP PROCEDURE IF EXISTS UpdateUserById;
DROP PROCEDURE IF EXISTS UpdateUserByEmail;
DROP PROCEDURE IF EXISTS DeleteUserById;
DROP PROCEDURE IF EXISTS DeleteUserByEmail;
DROP PROCEDURE IF EXISTS UserAuthentication;
DROP PROCEDURE IF EXISTS GetAllProjectByUid;
DROP PROCEDURE IF EXISTS GetAllTodosByPidByUid;

/* USER */
DELIMITER //
CREATE PROCEDURE UserAuthentication(IN email VARCHAR(30), IN password CHAR(76))
    BEGIN
        SELECT User.Uid, User.Role
        FROM User
        WHERE User.Email = email AND User.Password = password
        LIMIT 1;
    END //
DELIMITER ;

CALL UserAuthentication('drstrange@marvel.com', '1234');

DELIMITER //
CREATE PROCEDURE GetAllUsers()
    BEGIN
        SELECT User.Uid, User.Email, User.Role, User.Firstname, User.Lastname
        FROM User;
    END //
DELIMITER ;

CALL GetAllUsers();

DELIMITER //
CREATE PROCEDURE GetUserById(IN uid INT)
    BEGIN
        SELECT User.Uid, User.Email, User.Role, User.Firstname, User.Lastname
        FROM User
        WHERE User.Uid = uid
        LIMIT 1;
    END //
DELIMITER ;

CALL GetUserById(1);

DELIMITER //
CREATE PROCEDURE GetUserByEmail(IN email VARCHAR(50))
    BEGIN
        SELECT User.Uid, User.Email, User.Password, User.Role, User.Firstname, User.Lastname
        FROM User
        WHERE User.Email = email
        LIMIT 1;
    END //
DELIMITER ;

CALL GetUserByEmail('drstrange@marvel.com');

DELIMITER //
CREATE PROCEDURE CreateNewUser(
    IN email VARCHAR(50), IN password CHAR(76), IN role VARCHAR(20), IN firstname VARCHAR(50), IN lastname VARCHAR(50))
    BEGIN
        INSERT INTO User (Email, Password, Role, Firstname, Lastname) 
        VALUES(email, password, role, firstname, lastname);
    END //
DELIMITER ;

CALL CreateNewUser('test@mail', '1234', 'Standard', 'test', 'object');
CALL GetUserByEmail('test@mail');

DELIMITER //
CREATE PROCEDURE UpdateUserById(IN uid INT, IN role VARCHAR(50), IN firstname VARCHAR(50), IN lastname VARCHAR(50))
    BEGIN
        UPDATE User
        SET User.Firstname = firstname, User.Lastname = lastname, User.Role = role
        WHERE User.Uid = uid;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateUserByEmail(IN email VARCHAR(50), IN role VARCHAR(50), IN firstname VARCHAR(50), IN lastname VARCHAR(50))
    BEGIN
        UPDATE User
        SET User.Firstname = firstname, User.Lastname = lastname, User.Role = role
        WHERE User.Email = email;
    END //
DELIMITER ;

CALL UpdateUserByEmail('test@mail','Standard', 'Captain', 'America');
CALL GetUserByEmail('test@mail');

DELIMITER //
CREATE PROCEDURE DeleteUserById(IN uid INT)
    BEGIN
        DELETE FROM User
        WHERE User.Uid = uid
        LIMIT 1;
    END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE DeleteUserByEmail(IN email VARCHAR(50))
    BEGIN
        DELETE FROM User
        WHERE User.Email = email
        LIMIT 1;
    END //
DELIMITER ;

CALL DeleteUserByEmail('test@mail');
CALL GetUserByEmail('test@mail');

/* PROJECT */

DELIMITER //
CREATE PROCEDURE GetAllProjectByUid(IN uid INT)
    BEGIN
        SELECT * 
        FROM Project
        WHERE Uid = uid;
    END //
DELIMITER ;

CALL GetAllProjectByUid(1);

/* TODO */

DELIMITER //
CREATE PROCEDURE GetAllTodosByPidByUid(IN pid INT, IN uid INT)
    BEGIN
        SELECT Todo.Tid, User.email, Project.Name, Todo.Text, Todo.Status
        FROM Todo
        INNER JOIN Project ON Todo.Pid = Project.Pid
        INNER JOIN User ON Project.Uid = User.Uid 
        WHERE Project.Pid = pid AND User.Uid = uid;
    END //
DELIMITER ;

CALL GetAllTodosByPidByUid(1, 1);