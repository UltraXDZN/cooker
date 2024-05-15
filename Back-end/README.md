# cooker
# Phishing Event Tracking API

This project provides a secure backend API for tracking phishing events, implemented using FastAPI and Firebase.

## Features

- User registration and login with Firebase Authentication
- Secure endpoints for creating, editing, and viewing phishing events
- Comment management for events, including adding and deleting comments
- Password reset functionality via email

## Setup

### Prerequisites

- Python 3.7+
- Firebase project setup with Realtime Database and Authentication

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-repo/phishing-event-tracker.git
    cd phishing-event-tracker
    ```

2. **Create and activate a virtual environment:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Set up Firebase Admin SDK:**

    - Download your Firebase project's service account key file from the Firebase Console.
    - Save the key file in the project directory and rename it to `apiKey.json`.

5. **Create a `.env` file and set your Firebase API key:**

    ```sh
    echo "FIREBASE_API_KEY=your_firebase_api_key" > .env
    ```

### Running the Application

1. **Start the FastAPI server:**

    ```sh
    uvicorn main:app --reload
    ```

2. **Access the API documentation:**

    Open your browser and navigate to `http://127.0.0.1:8000/docs` to view the interactive API documentation provided by Swagger UI.

## Endpoints

### User Registration

- **URL:** `/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "name": "string",
        "surname": "string",
        "email": "user@example.com",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "access_token": "string",
        "token_type": "bearer"
    }
    ```

### User Login

- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "user@example.com",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "access_token": "string",
        "token_type": "bearer"
    }
    ```

### Forgot Password

- **URL:** `/forgot-password`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "email": "user@example.com"
    }
    ```
- **Response:**
    ```json
    {
        "detail": "Password reset email sent."
    }
    ```

### Get Current User

- **URL:** `/users/me`
- **Method:** `GET`
- **Response:**
    ```json
    {
        "name": "string",
        "surname": "string",
        "email": "user@example.com",
        "password": "string"
    }
    ```

### Create Event

- **URL:** `/events`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "name": "string",
        "affected_brand": "string",
        "description": "string",
        "malicious_url": "string",
        "malicious_domain_registration_date": "2024-05-15T19:20:57.179Z",
        "dns_records": ["string"],
        "matching_keywords": ["string"],
        "status": "string",
        "analyst_comments": []
    }
    ```
- **Response:**
    ```json
    "event_id"
    ```

### Edit Event

- **URL:** `/events/{event_id}`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
        "name": "string",
        "affected_brand": "string",
        "description": "string",
        "malicious_url": "string",
        "malicious_domain_registration_date": "2024-05-15T19:20:57.179Z",
        "dns_records": ["string"],
        "matching_keywords": ["string"],
        "status": "string",
        "analyst_comments": []
    }
    ```
- **Response:**
    ```json
    "event_id"
    ```

### Add Comment

- **URL:** `/events/{event_id}/comments`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "comment": "string",
        "timestamp": "2024-05-15T15:52:51.498Z",
        "username": "string",
        "user_id": "user_id"
    }
    ```
- **Response:**
    ```json
    "event_id"
    ```

### Delete Comment

- **URL:** `/events/{event_id}/comments/{comment_id}`
- **Method:** `DELETE`
- **Response:**
    ```json
    "event_id"
    ```

### Get All Events

- **URL:** `/events`
- **Method:** `GET`
- **Response:**
    ```json
    [
        {
            "name": "string",
            "affected_brand": "string",
            "description": "string",
            "malicious_url": "string",
            "malicious_domain_registration_date": "2024-05-15T19:20:57.179Z",
            "dns_records": ["string"],
            "matching_keywords": ["string"],
            "status": "string",
            "analyst_comments": [
                {
                    "comment": "string",
                    "timestamp": "2024-05-15T15:52:51.498Z",
                    "username": "string",
                    "user_id": "user_id"
                }
            ],
            "user_id": "string",
            "id": "event_id"
        }
    ]
    ```
