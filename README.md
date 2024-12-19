# User Registration API Implementation

This document explains the implementation of user registration functionality in our Express.js backend application.

## Architecture Overview

The user registration system follows a layered architecture:

- Routes → Controllers → Services → Models
- Each layer has a specific responsibility, making the code modular and maintainable

## Implementation Details

### 1. Route Layer (`routes/userRoutes.js`)

- Handles HTTP request routing and input validation
- Uses express-validator for request validation: `javascript
router.post('/register',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({min:3 }),
  body('password').isLength({min:6})
], registerUser)  `

### 2. Controller Layer (`controllers/user.controllers.js`)

- Manages HTTP request/response
- Validates input using express-validator
- Hashes password before storage
- Generates JWT token after successful registration

## API Documentation

### Register User Endpoint

**URL**: `/users/register`
**Method**: `POST`

### Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Validation Rules
- `firstname`: Minimum 3 characters
- `email`: Must be a valid email format
- `password`: Minimum 6 characters

### Success Response

**Status Code**: `201 Created`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "65df12345678901234567890"
    }
}
```

### Error Responses

#### Validation Error
**Status Code**: `400 Bad Request`
```json
{
    "status": "fail",
    "errors": [
        {
            "type": "field",
            "msg": "Invalid Email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

#### Missing Fields
**Status Code**: `400 Bad Request`
```json
{
    "status": "fail",
    "message": "All fields are required"
}
```

#### Email Already Exists
**Status Code**: `400 Bad Request`
```json
{
    "status": "fail",
    "message": "Email already exists"
}
```

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
1. Create a new POST request
2. Enter URL: `http://localhost:1200/users/register`
3. Set Headers:
   - Key: `Content-Type`
   - Value: `application/json`
4. In Body tab, select 'raw' and 'JSON'
5. Enter the request body as shown above
6. Send the request 