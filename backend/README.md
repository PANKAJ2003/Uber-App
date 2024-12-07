# Backend API Documentation

## API Endpoints

### User Registration

* **Endpoint:** `/users/register`
* **Request Method:** `POST`
* **Request Body:**
	+ fullname (Object)
		- firstname (String, minimum length: 3)
		- lastname (String, minimum length: 3)
	+ email (String, minimum length: 5)
	+ password (String, minimum length: 6)
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