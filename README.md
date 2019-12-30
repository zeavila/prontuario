# PRONTOMED

System for medical records with patient records, appointment schedules and medical notes. Project developed in Node.js and React.
![Screenshot](https://raw.githubusercontent.com/zeavila/prontuario/master/frontend/public/Captura%20de%20Tela_%C3%81rea%20de%20Sele%C3%A7%C3%A3o_20191230001442.png)

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Database](#database)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Backend Configuration](#backend-configuration)
- [Running](#running)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Built With](#built-with)
- [Testing](#testing)
- [Author](#author)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Download and install the latest Node.js and npm version

  - Linux System: sudo apt install nodejs
  - Windows and Mac: https://nodejs.org

- Download and install MySQL Server
  - Linux System: sudo apt install mysql
  - Windows and Mac: https://dev.mysql.com/downloads/mysql/

### Installation

Clone the repository and check out the master branch:

```
git clone https://github.com/zeavila/prontuario.git
```

#### Database

Run 'script_mysql.sql' (founded in docs/script folder) to create database

#### Backend

- Enter in backend folder and install:

  ```
  cd backend && npm i
  ```

#### Frontend

- Enter in frontend folder and install:

  ```
  cd frontend && npm i
  ```

### Backend Configuration

To configure Backend, simply edit the _src/appconfig.json_ file.

### Running

#### Backend

- Enter in backend folder and run:

  ```
  cd backend && npm run start
  ```

#### Frontend

##### Live version

- Enter in frontend folder and run:

  ```
  cd frontend && yarn start
  ```

##### Build Version

- Enter in frontend folder and run:

  ```
  cd frontend && yarn build
  ```

### Built With

- [MySQL Community Edition](https://www.mysql.com/products/community/) - Database
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) - Client to database
- [Node.JS](https://www.nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Express](https://expressjs.com) - The Web framework used on Backend
- [React](https://reactjs.org/) - The web framework used on Frontend
- [Postman](https://www.getpostman.com/) - Api Client to Test Rest Services

### Testing

To test Backend's services, use Postman or view API documentation in https://documenter.getpostman.com/view/5057547/SWLb9VQF?version=latest

### Author

- **Alberto Ávila** - [zeavila](https://github.com/zeavila)

### License

This project is Open Source and not licensed.
