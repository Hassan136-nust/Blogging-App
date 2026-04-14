# Blogging App

A full-stack blogging application built with Node.js, Express, MongoDB, and EJS.

## Features

- User authentication (signup/signin/logout)
- Create, read blogs
- Comment on blogs
- Image upload for blog covers
- Responsive design with Bootstrap

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   - Set your MongoDB URI
   - Set a strong JWT secret
   - Set your preferred port

5. Start MongoDB (if running locally)

6. Run the application:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Port number for the server

## Usage

1. Navigate to `http://localhost:10000`
2. Sign up for a new account or sign in
3. Create and share your blogs
4. Comment on other users' blogs

## Project Structure

```
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware
├── models/         # MongoDB models
├── public/         # Static files
├── routes/         # Route definitions
├── services/       # Business logic
├── views/          # EJS templates
└── index.js        # Main application file
```