DROP TABLE IF EXISTS Todo, Project, User;

CREATE TABLE IF NOT EXISTS User(
    Uid INT AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password CHAR(76) NOT NULL,    
    Role ENUM('Admin', 'Standard') NOT NULL,
    Firstname VARCHAR(255) NOT NULL,
    Lastname VARCHAR(255) NOT NULL,
    Last_Update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Uid)
);

CREATE TABLE IF NOT EXISTS Project (
    Pid INT NOT NULL AUTO_INCREMENT,
    Uid INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Progress INT NOT NULL,
    Status ENUM('Initial', 'Incomplete', 'Complete', 'Closed') NOT NULL,
    Last_Update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Pid),
    FOREIGN KEY (Uid) REFERENCES User(Uid),
    CONSTRAINT CHK_Progress CHECK (Progress BETWEEN 0 and 100)    
);

CREATE TABLE IF NOT EXISTS Todo (
    Tid INT NOT NULL AUTO_INCREMENT,
    Pid INT NOT NULL,
    Text VARCHAR(255) NOT NULL,
    Status ENUM('Incomplete', 'Complete') NOT NULL,
    Last_Update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Tid),
    FOREIGN KEY (Pid) REFERENCES Project(Pid)
);



INSERT INTO User (Email, Password, Role, Firstname, Lastname) VALUES('drstrange@marvel.com', '1234', 'Admin', 'Stephen', 'Strange');
INSERT INTO User (Email, Password, Role, Firstname, Lastname) VALUES('drstrange2@marvel.com', '1234', 'Standard', 'Stephen', 'Strange');


INSERT INTO Project (Uid, Name, Progress, Status) VALUES(1, 'Dr. Strange first act.', 0, 'Initial');
INSERT INTO Project (Uid, Name, Progress, Status) VALUES(1, 'Dr. Strange second act.', 0, 'Initial');
INSERT INTO Project (Uid, Name, Progress, Status) VALUES(2, 'Dr. Strange 2 second act.', 0, 'Initial');
INSERT INTO Project (Uid, Name, Progress, Status) VALUES(2, 'Dr. Strange 2 second act.', 0, 'Initial');


INSERT INTO Todo (Pid, Text, Status) VALUES(1, 'Being a good doctor', 'Incomplete');
INSERT INTO Todo (Pid, Text, Status) VALUES(1, 'Getting into a car accident', 'Incomplete');
INSERT INTO Todo (Pid, Text, Status) VALUES(1, 'Finding people who can fix broken hands', 'Incomplete');
INSERT INTO Todo (Pid, Text, Status) VALUES(1, 'Find the sacred temple', 'Incomplete');

SELECT Todo.Tid, User.email, Project.Name, Todo.Text, Todo.Status
FROM Todo
INNER JOIN Project ON Todo.Pid = Project.Pid
INNER JOIN User ON Project.Uid = User.Uid ;

