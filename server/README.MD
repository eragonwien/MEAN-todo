# MEAN-Todo
========

MEAN-Todo is a web application providing an online todo list where registered user can log in, add new task and view it online. The application helps keeping track of the current progress of added tasks so that each task can be completed quickly and efficiently.

The application back-end is a Nodejs API server providing information about the registered users, saved tasks and todos.
The front-end is a AngularJS application fetching data from the back-end API and providing a user interface. 

Features
--------

- User can register for an online account to gain access to the personal user space.
- In the user space, user can create new task, adding todo i.e sub-task as well as editing and deleting them.
- The application shows tasks of each day and the current progress of each these tasks.
- User receives email reminder when the deadline of a task is nearly over.
- MEAN-Todo app is accessible through any web-browser.

Requirements
------------
- A MySQL database. 
- NodeJS environtment. 

Installation
------------

Tables for the application can be added using the *sql* file in *server/config/sql/create.sql*.
On a linux machine, first refresh the local package to the newest version using:

    sudo apt-get update

Afterwards, you can install NodeJS using:

    sudo apt-get install nodejs

It is also recommended to install NPM:

    sudo apt-get install npm

Copy the folder **server** to the any path then go into the folder using:

    cd server && npm install

This will install the required modules to the server folder.
Next, we need to configure the database access. Edit the database credentials in *server/config/database.js*.

To check if the connection to the application works, run the conncection test using:

    npm test

If error occurs, please check if the credentials are correct.
If the test runs without error, the server is ready to be executed using:

    npm start


API Description
----------
User need to have the correct role to access specific paths
>api/users

Method | Description | status code
--- | --- | ---
GET | get all users | 200
POST | create new user | 200
PUT | bad request | 400 
DELETE | bad request | 400 

>api/users/{user ID}

Method | Description | status code
--- | --- | ---
GET | get user by ID | 200
POST | bad request | 400
PUT | update user by ID | 200 
DELETE | delete user by ID | 200 

>api/users/{user ID}/projects

Method | Description | status code
--- | --- | ---
GET | get all projects of an user | 200
POST | user creates new project | 200
PUT | bad request | 400 
DELETE | bad request | 400 

>api/users/{user ID}/projects/{project ID}

Method | Description | status code
--- | --- | ---
GET | get project of an user by ID | 200
POST | bad request | 400
PUT | update project of an user by ID | 200 
DELETE | delete project of an user by ID | 200 

>api/users/{user ID}/projects/{project ID}/todos

Method | Description | status code
--- | --- | ---
GET | get all todos of a specific project | 200
POST | add new todo to a specific project | 200
PUT | bad request | 400 
DELETE | bad request | 400 

>api/users/{user ID}/projects/{project ID}/todos/{todo ID}

Method | Description | status code
--- | --- | ---
GET | get todo of a specific project by ID | 200
POST | bad request | 400
PUT | update todo of a specific project by ID | 200 
DELETE | delete todo of a specific project by ID | 200 

Contribute
----------

- Issue Tracker: https://github.com/eragonwien/MEAN-todo/issues
- Source Code: https://github.com/eragonwien/MEAN-todo

Support
-------

If you are having issues, please let me know.
Contact me 
nguyennhoangson@gmail.com

License
-------

The project is created by Hoang Son Nguyen.