# Express API Project

This project is a simple RESTful API built with Express.js, Sequelize, and PostgreSQL. It provides CRUD operations for managing tasks, allowing you to create, read, update, and delete task records.

## Features

- **User Registration and Authentication**: Allows users to register and log in using JWT tokens.
- **User Management**: Admins can manage users, including creating, updating, and deleting users.
- **User Roles**: Supports various user roles, including admin and regular users.
- **CRUD Operations**: Create, read, update, and delete tasks.
- **Database Integration**: Uses PostgreSQL as the database with Sequelize ORM for object-relational mapping.
- **Environment Configuration**: Utilizes dotenv for environment variable management.
- **ES6+ Support**: Written using modern JavaScript features.

## Requirements

- **Node.js**: Ensure you have Node.js (version 12 or later) installed.
- **PostgreSQL**: A running PostgreSQL server to connect to.

## Getting Started

### Installation

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/DmytroKorobkoUA/express-api.git
   cd express-api
   ```
   
2. **Install Dependencies**

   Run the following command to install all necessary packages:

   ```bash
   npm install
   ```
   
3. **Environment Setup**

   Create a .env file in the root directory of the project and provide the necessary environment variables. An example configuration is provided below:

   ```bash
   DB_NAME=express_api
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```
   
4. **Database Setup**

   Ensure your PostgreSQL server is running and create a database matching the DB_NAME value in your .env file:

   ```bash
   CREATE DATABASE express_api;
   ```
   
   Run the following command to apply the database migrations:
   ```bash
   npm run migrate
   ```

### Running the Application

Start the server with:

   ```bash
   npm start
   ```

The server will start on http://localhost:3000. You can customize the port in the app.js file if needed.

## API Endpoints

### Task Management

- **GET /tasks**: Retrieve all tasks
- **POST /tasks**: Create a new task
- **GET /tasks/:id**:  Retrieve a specific task by ID
- **PUT /tasks/:id**: Update a task by ID
- **DELETE /tasks/:id**: Delete a task by ID

### User Management (Admin Only)

- **GET /admin/users**: Retrieve all users
- **POST /admin/users**: Create a new user
- **GET /admin/users/:id**:  Retrieve a specific user by ID
- **PUT /admin/users/:id**: Update a user by ID

### User Authentication

- **POST /users/register**: Register a new user
- **POST /users/login**: Log in an existing user

## Authentication and Authorization

- **JWT Authentication**: The API uses JSON Web Tokens (JWT) for authentication. Include the token in the Authorization header for endpoints that require authentication.
- **Role-Based Access Control**: Certain endpoints require admin privileges, enforced via middleware.

### Example Request

#### Creating a New Task

To create a new task, send a POST request to /tasks with the following JSON payload:

   ```bash
   {
     "title": "Learn Node.js",
     "completed": false
   }
   ```

#### User Registration

To register a new user, send a POST request to /users/register with the following JSON payload:

   ```bash
   {
     "name": "John Doe",
     "email": "john.doe@example.com",
     "password": "securepassword",
     "role": "user" // or "admin"
   }
   ```

## Development

If you want to contribute or modify this project, ensure you are using a compatible Node.js version and have PostgreSQL installed locally.

### Development Commands:

- **Run Migrations**:
   ```bash
   npm run migrate
   ```
  
- **Seed Database**: Create a new task
   ```bash
   npm run seed
   ```

## Testing

### Run Tests:
   ```bash
   npm test
   ```
