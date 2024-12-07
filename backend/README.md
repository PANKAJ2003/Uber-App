# Backend API Documentation

## API Endpoints

### User Registration

* **Endpoint:** `/users/register`
* **Request Method:** `POST`
* **Request Body:**
	+ fullname (Object)
		- firstname (String)
		- lastname (String)
	+ email (String)
	+ password (String)
* **Response:**
	+ token (String)
	+ user (Object)
		- _id (String)
		- fullname (Object)
			- firstname (String)
			- lastname (String)
		- email (String)
* **Status Codes:**
	+ `200 OK`: User created successfully
	+ `400 Bad Request`: Validation errors
	+ `500 Internal Server Error`: Server error

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