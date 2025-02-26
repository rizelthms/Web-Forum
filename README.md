# Rizel's Fun Forum

## Introduction
Rizel's Fun Forum is a web application designed to foster community engagement by allowing users to create, share, and discuss posts on various topics. The platform supports three types of users:  
- **Admin**: Manages users, categories, and posts.  
- **Post Creator**: Can create, edit, and delete their own posts.  
- **Reader**: Can view approved posts.  

## Features
- User authentication (Admin, Post Creator, Reader).  
- Post creation, approval, and moderation system.  
- Category management for organizing posts.  
- RESTful API for interaction with the backend.  

## Installation & Setup

### Backend Setup
The backend is powered by Spring Boot with an embedded H2 database.  

Run the backend using:
```sh
mvn spring-boot:run
```
Access the database at:  
[http://localhost:8080/h2](http://localhost:8080/h2)  
(Default credentials: **username/password**: `cms`).  

### Frontend Setup
Navigate to the frontend directory and install dependencies:
```sh
cd frontend
npm install
```
Start the frontend server:
```sh
npm start
```

## API Endpoints

### Users
- `GET /api/v1/users` - Fetch all users.  
- `POST /api/v1/users` - Create a new user.  
- `PUT /api/v1/users/{id}` - Update user details.  
- `DELETE /api/v1/users/{id}` - Remove a user.  

### Categories
- `GET /api/v1/categories` - Fetch all categories.  
- `POST /api/v1/forum_category` - Create a new category.  
- `DELETE /api/v1/forum_categories/{id}` - Remove a category.  

### Forums (Posts)
- `GET /api/v1/forums` - Fetch all posts.  
- `POST /api/v1/forum` - Create a new post.  
- `PUT /api/v1/forums/{id}` - Update a post.  
- `DELETE /api/v1/forums/{id}` - Delete a post.  

## Architecture
- **Frontend**: Built with React.  
- **Backend**: Spring Boot with Hibernate ORM and H2 Database.  
- **Database**: Embedded H2 database for lightweight storage.  


