# Backend API Documentation

## API Endpoints

### User Registration

- **Endpoint:** `/users/register`
- **Request Method:** `POST`
- **Request Body:**
  - fullname (Object)
    - firstname (String, minimum length: 3)
    - lastname (String, minimum length: null)
  - email (String, minimum length: 5)
  - password (String, minimum length: 6)
- **Response:**
  - token (String)
  - user (Object)
    - \_id (String)
    - fullname (Object)
      - firstname (String)
      - lastname (String)
    - email (String)
- **Status Codes:**
  - `200 OK`: User created successfully
  - `401 Bad Request`: Validation errors

Example Request:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### User Login

- **Endpoint:** `/users/login`
- **Request Method:** `POST`
- **Request Body:**
  - email (String, minimum length: 5)
  - password (String, minimum length: 6)
- **Response:**
  - token (String)
  - user (Object)
    - \_id (String)
    - fullname (Object)
      - firstname (String)
      - lastname (String)
    - email (String)
- **Status Codes:**
  - `200 OK`: Login successfully
  - `401 Bad Request`: Validation errors

Example Request:

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
