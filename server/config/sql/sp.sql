/*STORED PROCEDURE*/
DROP PROCEDURE IF EXISTS UserAuthentication;
DROP PROCEDURE IF EXISTS GetAllProjectByUid;
DROP PROCEDURE IF EXISTS GetAllTodosByPidByUid;

DELIMITER //
CREATE PROCEDURE UserAuthentication(
    IN email VARCHAR(30),
    IN password CHAR(76)
    )
    BEGIN
        SELECT * 
        FROM User
        WHERE Email = email AND Password = password;
    END //
DELIMITER ;

CALL UserAuthentication('drstrange@marvel.com', '1234');

DELIMITER //
CREATE PROCEDURE GetAllProjectByUid(
    IN uid INT
    )
    BEGIN
        SELECT * 
        FROM Project
        WHERE Uid = uid;
    END //
DELIMITER ;

CALL GetAllProjectByUid(1);

DELIMITER //
CREATE PROCEDURE GetAllTodosByPidByUid(
    IN pid INT,
    IN uid INT
    )
    BEGIN
        SELECT Todo.Tid, User.email, Project.Name, Todo.Text, Todo.Status
        FROM Todo
        INNER JOIN Project ON Todo.Pid = Project.Pid
        INNER JOIN User ON Project.Uid = User.Uid 
        WHERE Project.Pid = pid AND User.Uid = uid;
    END //
DELIMITER ;

CALL GetAllTodosByPidByUid(1, 1);