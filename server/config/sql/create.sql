DROP TABLE Todo, Project, User;

CREATE TABLE IF NOT EXISTS User(
    Uid INT AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password CHAR(76) NOT NULL,    
    Role VARCHAR(255) NOT NULL DEFAULT 'Standard',
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Last_Update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Uid),
    CONSTRAINT CHK_Role CHECK (Role IN('Admin', 'Standard'))
);

CREATE TABLE IF NOT EXISTS Project (
    Pid INT NOT NULL AUTO_INCREMENT,
    Uid INT NOT NULL,
    Name VARCHAR(30) NOT NULL DEFAULT 'Un-titled',
    Target VARCHAR(255) NOT NULL,
    Progress INT NOT NULL DEFAULT 0,
    Status VARCHAR(50) NOT NULL DEFAULT 'Incomplete',
    Last_Update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Pid),
    FOREIGN KEY (Uid) REFERENCES User(Uid),
    CONSTRAINT CHK_Progress CHECK (Progress BETWEEN 0 and 100),
    CONSTRAINT CHK_Status CHECK (Status IN('Incomplete', 'Complete'))        
);

CREATE TABLE IF NOT EXISTS Todo (
    Tid INT NOT NULL AUTO_INCREMENT,
    Pid INT NOT NULL,
    Text VARCHAR(255) NOT NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'Incomplete',
    Last_Update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Tid),
    FOREIGN KEY (Pid) REFERENCES Project(Pid),
    CONSTRAINT CHK_Status CHECK (Status IN('Incomplete', 'Complete'))        
);



INSERT INTO User (Email, Password, Role, Firstname, Lastname) VALUES('drstrange@marvel.com', '1234', 'Admin', 'Stephen', 'Strange');


INSERT INTO Project (Uid, Name, Target) VALUES(1, 'Dr. Strange first act.', 'Reaching the sacred temple');
INSERT INTO Project (Uid, Name, Target) VALUES(1, 'Dr. Strange second act.', 'Becoming a sorcerer');


INSERT INTO Todo (Pid, Text) VALUES(1, 'Being a good doctor');
INSERT INTO Todo (Pid, Text) VALUES(1, 'Getting into a car accident');
INSERT INTO Todo (Pid, Text) VALUES(1, 'Finding people who can fix broken hands');
INSERT INTO Todo (Pid, Text) VALUES(1, 'Find the sacred temple');

INSERT INTO Todo (Pid, Text) VALUES(2, 'Talking with the elder');
INSERT INTO Todo (Pid, Text) VALUES(2, 'Learning to teleport');
INSERT INTO Todo (Pid, Text) VALUES(2, 'Reading books');
INSERT INTO Todo (Pid, Text) VALUES(2, 'Mastering the sacred weapons');


SELECT Todo.Tid, User.email, Project.Name, Todo.Text, Todo.Status
FROM Todo
INNER JOIN Project ON Todo.Pid = Project.Pid
INNER JOIN User ON Project.Uid = User.Uid ;

