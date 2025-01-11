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

### Get Coordinates

- **Endpoint:** `/maps/get-coordinates`
- **Request Method:** `GET`
- **Request Query:**
  - address (String, minimum length: 3)
- **Response:**
  - coordinates (Object)
    - lat (Number)
    - lng (Number)
- **Status Codes:** - 200 OK: Coordinates fetched successfully - 400 Bad Request: Validation errors - 404 Not Found: Coordinates not found

**Example Response:**

```json
{
  "coordinates": {
    "lat": 37.7749,
    "lng": -122.4194
  }
}
```

## Get Distance and Time

**Endpoint:** `/maps/get-distance-time`

**Request Method:** `GET`

**Request Query:**

- `pickup` (String, minimum length: 3)
- `destination` (String, minimum length: 3)

**Response:**

- `distanceTime` (Object)
  - `distance` (Object)
    - `text` (String)
    - `value` (Number)
  - `duration` (Object)
    - `text` (String)
    - `value` (Number)

**Status Codes:**

- `200 OK`: Distance and time fetched successfully
- `400 Bad Request`: Validation errors
- `500 Internal Server Error`: Internal server error

**Example Response:**

```json
{
  "distanceTime": {
    "distance": {
      "text": "5.3 km",
      "value": 5300
    },
    "duration": {
      "text": "15 mins",
      "value": 900
    }
  }
}
```

## Get AutoComplete Suggestions

**Endpoint:** `/maps/get-suggestions`

**Request Method:** `GET`

**Request Query:**

- `address` (String, minimum length: 3)

**Response:**

- `suggestions` (Array)
  - `description` (String)

**Status Codes:**

- `200 OK`: Suggestions fetched successfully
- `400 Bad Request`: Validation errors
- `500 Internal Server Error`: Internal server error

**Example Response:**

```json
{
  "suggestions": [
    {
      "description": "1600 Amphitheatre Parkway, Mountain View, CA"
    },
    {
      "description": "1 Infinite Loop, Cupertino, CA"
    }
  ]
}
```

## Create Ride

**Endpoint:** `/rides/create-ride`

**Request Method:** `POST`

**Request Body:**

- `pickup` (String, minimum length: 3)
- `destination` (String, minimum length: 3)
- `vehicleType` (String, options: auto, car, moto)

**Response:**

- `ride` (Object)
  - `_id` (String)
  - `user` (String)
  - `pickup` (String)
  - `destination` (String)
  - `fare` (Number)
  - `otp` (String)

**Status Codes:**

- `201 Created`: Ride created successfully
- `400 Bad Request`: Validation errors
- `500 Internal Server Error`: Internal server error

**Example Response:**

```json
{
  "ride": {
    "_id": "60d21b4667d0d8992e610c85",
    "user": "60d21b4667d0d8992e610c84",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "fare": 25.5,
    "otp": "123456"
  }
}
```

## Get Fares

**Endpoint:** `/rides/get-fares`

**Request Method:** `GET`

**Request Query:**

- `pickup` (String, minimum length: 3)
- `destination` (String, minimum length: 3)

**Response:**

- `fares` (Object)
  - `auto` (Number)
  - `car` (Number)
  - `moto` (Number)

**Status Codes:**

- `200 OK`: Fares fetched successfully
- `400 Bad Request`: Validation errors
- `500 Internal Server Error`: Internal server error

**Example Response:**

```json
{
  "fares": {
    "auto": 100,
    "car": 200,
    "moto": 50
  }
}
```
