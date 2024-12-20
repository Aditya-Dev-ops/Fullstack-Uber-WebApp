# User Registration and Authentication API

This document explains the implementation of user registration, login, logout, and authentication functionality in our Express.js backend application.

## Architecture Overview

The system follows a layered architecture:

- Routes → Controllers → Services → Models
- Each layer has a specific responsibility, making the code modular and maintainable.

## Implementation Details

### 1. Route Layer (`routes/userRoutes.js`)

- Handles HTTP request routing and input validation.
- Uses `express-validator` for request validation.

### 2. Controller Layer (`controllers/user.controllers.js`)

- Manages HTTP request/response.
- Validates input using `express-validator`.
- Hashes password before storage.
- Generates JWT token after successful registration and login.
- Handles user logout by blacklisting the token.

### 3. Middleware Layer (`middleware/authMiddleware.js`)

- **Authentication Middleware**: Verifies JWT tokens and checks if they are blacklisted.
- Protects routes by ensuring only authenticated users can access them.

## API Documentation

### Register User Endpoint

**URL**: `/users/register`  
**Method**: `POST`

### Login User Endpoint

**URL**: `/users/login`  
**Method**: `POST`

### Logout User Endpoint

**URL**: `/users/logout`  
**Method**: `GET`

- **Description**: Logs out the user by blacklisting the token and clearing the cookie.
- **Response**:
  - **Success**: Returns a status of 200 with a message indicating successful logout.

### Middleware Checks

- **CORS Middleware**: Allows cross-origin requests from specified domains.
- **Authentication Middleware**: Checks if the user is authenticated before allowing access to protected routes.
- **Error Handling Middleware**: Catches and handles errors, sending appropriate responses to the client.

## Handling Blacklisted Tokens

- Tokens are blacklisted by storing them in a `BlacklistToken` model.
- Blacklisted tokens are checked during authentication to prevent their use.
- Tokens are automatically removed from the blacklist after 24 hours using a TTL index.

## Required Environment Variables

```env
PORT=1200
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Testing the API

### Using cURL

```bash
curl -X POST http://localhost:1200/users/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}'
```

### Using Postman

1. Create a new POST request.
2. Enter URL: `http://localhost:1200/users/register`.
3. Set Headers:
   - Key: `Content-Type`
   - Value: `application/json`
4. In Body tab, select 'raw' and 'JSON'.
5. Enter the request body as shown above.
6. Send the request.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.