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

### User Profile

- **Endpoint:** `/users/profile`
- **Request Method:** `GET`
- **Requirements:** Token in request header's authentication or in cookie.
- **Response:**
  - user (Object)
    - \_id (String)
    - fullname (Object)
      - firstname (String)
      - lastname (String)
    - email (String)
- **Status Codes:**
  - `200 OK`: User Data
  - `401 Bad Request`: Validation errors

### User Logout

- **Endpoint:** `/users/logout`
- #### Description
  - Clears the token set in cookies and add token to blacklist.
- **Status Codes:**
  - `200 OK`: Logout successfully

### Captain Registration

- **Endpoint:** `/captains/register`
- **Request Method:** `POST`
- **Request Body:**
  - fullname (Object)
    - firstname (String, minimum length: 3)
    - lastname (String, minimum length: null)
  - email (String, minimum length: 5)
  - password (String, minimum length: 6)
  - vehicle (Object)
    - color (String, minimum length: 3)
    - plate (String, minimum length: 3)
    - type (String, options: car,auto,motorcycle,bus)
    - capacity (Number)
- **Response:**
  - token (String)
  - captain (Object)
    - \_id (String)
    - fullname (Object)
      - firstname (String)
      - lastname (String)
    - email (String)
    - vehicle (Object)
      - color (String, minimum length: 3)
      - plate (String, minimum length: 3)
      - type (String, options: car,auto,motorcycle,bus)
      - capacity (Number)
- **Status Codes:**
  - `200 OK`: User created successfully
  - `401 Bad Request`: Validation errors

Example Request:

```json
{
  "fullname": {
    "firstname": "Joe",
    "lastname": "Toe"
  },
  "email": "joe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1235",
    "capacity": 4,
    "type": "car"
  }
}
```
### Captain Login

- **Endpoint:** `/captains/login`
- **Request Method:** `POST`
- **Request Body:**
  - email (String, minimum length: 5)
  - password (String, minimum length: 6)
- **Response:**
  - token (String)
  - captain (Object)
    - \_id (String)
    - fullname (Object)
      - firstname (String)
      - lastname (String)
    - email (String)
    - vehicle (Object)
      - color (String, minimum length: 3)
      - plate (String, minimum length: 3)
      - type (String, options: car,auto,motorcycle,bus)
      - capacity (Number)
    - status (String, options: active, inactive(default))
- **Status Codes:**
  - `200 OK`: User created successfully
  - `401 Bad Request`: Validation errors

```json
{
  "email": "joe@example.com",
  "password": "password123"
}
```

### Captain Profile

- **Endpoint:** `/captains/profile`
- **Request Method:** `GET`
- **Requirements:** Token in request header's authentication or in cookie.
- **Response:**
  - captain (Object)
    - \_id (String)
    - fullname (Object)
      - firstname (String)
      - lastname (String)
    - email (String)
    - vehicle (Object)
      - color (String, minimum length: 3)
      - plate (String, minimum length: 3)
      - type (String)
      - capacity (Number)
    - status (String)
- **Status Codes:**
  - `200 OK`: User Data
  - `401 Bad Request`: Validation errors

### Captain Logout

- **Endpoint:** `/captains/logout`
- **Description:**
  - Clears the token set in cookies and add token to blacklist.
- **Status Codes:**
  - `200 OK`: Logout successfully
