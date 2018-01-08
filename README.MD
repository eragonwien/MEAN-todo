# MEAN-Todo
========

$project will solve your problem of where to start with documentation,
by providing a basic explanation of how to do it easily.

Look how easy it is to use:

    import project
    # Get your stuff done
    project.do_stuff()

Features
--------

- Be awesome
- Make things faster

Installation
------------

Install MEAN-Todo by running:

    npm install

API
----------

>api/todos

Method | Description
--- | --- 
GET | get all todos
POST | create new todo
PUT | 400 - bad request
DELETE | 401 - unauthorized

>api/todos/:tid

Method | Description
--- | --- 
GET | get todo by id
POST | 400 - bad request
PUT | update todo by id
DELETE | delete todo by id

>api/users

Method | Description
--- | --- 
GET | get all users
POST | create new user
PUT | 400 - bad request
DELETE | 401 - unauthorized

>api/users/:uid

Method | Description
--- | --- 
GET | get user by id
POST | 400 - bad request
PUT | update user by id
DELETE | delete user by id

>api/users/:uid/todos

Method | Description
--- | --- 
GET | get all todos of an user
POST | create new todo for an user
PUT | 400 - bad request
DELETE | 401 - unauthorized

>api/users/:uid/todos/:tid

Method | Description
--- | --- 
GET | get specific todo of an user
POST | 400 - bad request
PUT | update specific todo of an user
DELETE | delete specific todo of an user

Contribute
----------

- Issue Tracker: https://github.com/eragonwien/MEAN-todo/issues
- Source Code:      https://github.com/eragonwien/MEAN-todo

Support
-------

If you are having issues, please let me know.
Contact me 
nguyennhoangson@gmail.com

License
-------

The project is created by Hoang Son Nguyen.