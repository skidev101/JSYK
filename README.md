# JSYK - Anonymous Messaging Platform 💬

JSYK is a modern, full-stack web application designed for sending and receiving anonymous messages. It provides a safe and private space for users to share thoughts, confessions, or questions without revealing their identity. The platform focuses on fostering genuine connections through honest, no-judgment interactions.

## Features ✨

*   **Anonymous Messaging**: Send and receive messages without disclosing sender identity.
*   **User Profiles**: Personalized profiles with unique URLs for receiving messages.
*   **Topic-Based Conversations**: Create specific topics to organize messages and engage in focused discussions.
*   **Image Uploads**: Enhance topic context with image attachments (images expire after 15 days).
*   **Customizable Themes**: Personalize message cards with custom colors.
*   **Dashboard**: Centralized hub for managing messages and topics.
*   **Admin Panel**: Analytics and management tools for administrators.
*   **OG Image Generation**: Dynamically generated Open Graph images for social sharing.
*   **Rate Limiting**: Protects against abuse and ensures fair usage.
*   **Firebase Authentication**: Secure user authentication.

## Technologies Used

| Category   | Technology       | Description                                  |
| :--------- | :--------------- | :------------------------------------------- |
| **Backend**  | Node.js          | JavaScript runtime environment               |
|            | Express.js       | Web framework for building APIs              |
|            | MongoDB (Mongoose) | NoSQL database for data storage              |
|            | Firebase Admin   | User authentication and management           |
|            | Cloudinary       | Cloud-based image management                 |
|            | ImageKit         | Real-time image optimization and delivery    |
|            | Brevo (Sendinblue) | Transactional email service                  |
|            | Upstash Redis    | Serverless Redis for caching and rate limiting |
|            | Satori, Resvg-js | OG image generation                          |
| **Frontend** | React.js         | JavaScript library for building UIs          |
|            | TypeScript       | Superset of JavaScript for type safety       |
|            | Vite             | Fast frontend tooling                        |
|            | Tailwind CSS     | Utility-first CSS framework                  |
|            | Zustand          | Small, fast, scalable state management       |
|            | Framer Motion    | Production-ready motion library for React    |
|            | Recharts         | Composable charting library                  |
| **Deployment**| Vercel           | Serverless deployment for both frontend and backend |

## Getting Started

Follow these steps to set up and run JSYK project locally.

### ⚙️ Prerequisites

Ensure you have the following installed:
*   ✅ Node.js (v18 or higher)
*   ✅ npm (comes with Node.js) or Yarn
*   ✅ MongoDB (local or cloud instance)
*   ✅ Firebase Project (for authentication)
*   ✅ Cloudinary Account (for image storage)
*   ✅ ImageKit Account (for OG image generation)
*   ✅ Brevo Account (for transactional emails)
*   ✅ Upstash Redis Account (for rate limiting)

### 🚀 Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/skidev101/JSYK.git
cd JSYK
```

### 📦 Backend Installation

1.  Navigate into the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### 🛠️ Backend Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```ini
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster_url>/jsyk_db?retryWrites=true&w=majority

# Firebase Admin SDK (Base64 encoded JSON)
FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=<your_firebase_service_account_key_base64_encoded_json>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# ImageKit (for OG image generation)
IMAGEKIT_PUBLIC_KEY=<your_imagekit_public_key>
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
IMAGEKIT_URL_ENDPOINT=<your_imagekit_url_endpoint>

# Upstash Redis
UPSTASH_REDIS_REST_URL=<your_upstash_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_upstash_redis_rest_token>

# CORS Client URL
CLIENT_URL=http://localhost:5173,https://jsyk.pxxl.click

# IP Rate Limiter Salt
IP_SALT=<a_strong_random_string_for_ip_hashing>

# Frontend URL (for OG image redirects)
FRONTEND_URL=https://jsyk.pxxl.click

# Brevo (Sendinblue) API Key
BREVO_API_KEY=<your_brevo_api_key>

# Cron Job Secret (for scheduled tasks)
CRON_SECRET=<a_strong_random_string_for_cron_jobs>
```

**Note on `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64`**: Generate a new private key for your Firebase project from "Project settings" > "Service accounts". Copy the entire JSON content, then Base64 encode it (e.g., using an online tool or `base64 -w 0 < your_key.json` on Linux/macOS) and paste the encoded string here.

### ▶️ Run Backend

To start the backend server in development mode:

```bash
npm run dev
# or
yarn dev
```

The server will typically run on `http://localhost:5000`.

### 🌐 Frontend Installation

1.  Navigate back to the root directory and then into the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### 🛠️ Frontend Environment Variables

Create a `.env` file in the `frontend` directory and add the following variables:

```ini
VITE_BASE_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000

# Firebase Client SDK
VITE_FIREBASE_API_KEY=<your_firebase_client_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
VITE_FIREBASE_PROJECT_ID=<your_firebase_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
VITE_FIREBASE_APP_ID=<your_firebase_app_id>
VITE_FIREBASE_MEASUREMENT_ID=<your_firebase_measurement_id>
```

### ▶️ Run Frontend

To start the frontend development server:

```bash
npm run dev
# or
yarn dev
```

The frontend application will typically run on `http://localhost:5173`.

## Usage

Once both the backend and frontend servers are running, you can access the JSYK application in your web browser.

1.  **Register/Login**: Navigate to the frontend URL (`http://localhost:5173`). You can register using email/password or Google authentication.
2.  **Create a Topic**: From your dashboard, create a new anonymous topic. You can specify a title, a theme color, and optionally upload up to two images.
3.  **Share Link**: After creating a topic, a unique shareable link will be generated. Copy this link and share it with others.
4.  **Send Anonymous Message**: Anyone with your profile link or a specific topic link can send you an anonymous message.
5.  **View Messages**: All incoming messages will appear in your dashboard. You can view message content, mark them as read, or delete them.
6.  **Admin Dashboard (if applicable)**: If you have admin privileges, navigate to `/admin/dashboard` to view analytics and manage feature requests.

*(No screenshots are provided in the project files.)*

---

# JSYK Backend API

## Overview
The JSYK Backend API is a robust Node.js application built with Express.js, handling user authentication, message management, topic creation, and administrative analytics. It integrates with MongoDB for data persistence, Firebase for authentication, Cloudinary and ImageKit for media management, Brevo for email services, and Upstash Redis for efficient rate limiting.

## Features
- **User Authentication & Authorization**: Secure Firebase-backed authentication with role-based access control (e.g., Admin privileges).
- **Profile Management**: Endpoints for creating, fetching, and updating user profiles, including username availability checks and profile image uploads.
- **Anonymous Messaging**: Core functionality allowing anonymous message submission to user profiles or specific topics.
- **Topic Creation & Management**: Users can create, view, and manage anonymous topics, including optional image attachments and theme colors.
- **Message Lifecycle**: Functionality to retrieve, view (marks as read), and delete messages.
- **Image Upload & Storage**: Utilizes Cloudinary for user profile and topic image storage, with auto-expiration for topic images.
- **Dynamic OG Image Generation**: On-the-fly generation of Open Graph images for shared messages using Satori and ImageKit.
- **Rate Limiting**: Implements IP-based rate limiting using Upstash Redis to prevent abuse on message submission.
- **Admin Analytics**: Dedicated endpoints for administrators to monitor user activity, message trends, topic statistics, and cloud resource usage.
- **Email Notifications**: Sends welcome emails to new users via Brevo.
- **Scheduled Jobs**: Includes cron jobs for daily profile view resets and image cleanup.

## Getting Started
Refer to the [Backend Installation](#-backend-installation) and [Backend Environment Variables](#️-backend-environment-variables) sections above for setup instructions.

## API Documentation

### Base URL
`http://localhost:5000/api` (for local development)

### Endpoints

#### `GET /api/auth`
Retrieves the currently authenticated user's profile data.
**Authentication**: Required (Bearer Token)
**Request**:
_No payload required._
**Response**:
```json
{
  "success": true,
  "data": {
    "uid": "firebase_user_id",
    "username": "exampleuser",
    "email": "user@example.com",
    "bio": "A short bio.",
    "profileImgUrl": "https://res.cloudinary.com/...",
    "jsykLink": "exampleuser",
    "memberSince": "2023-01-01T12:00:00.000Z",
    "profileViews": 150,
    "role": "User"
  }
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `500 Internal Server Error`: Server-side error.

#### `POST /api/auth`
Handles user authentication and registration via Firebase, creating or updating a user record in the database.
**Authentication**: Required (Bearer Token)
**Request**:
```json
{
  "username": "newusername"
}
```
_Note: `username` is optional; if not provided, one will be generated from Firebase display name or a fallback._
**Response**:
```json
{
  "success": true,
  "data": {
    "uid": "firebase_user_id",
    "username": "newusername",
    "email": "user@example.com",
    "bio": "",
    "profileImgUrl": "https://res.cloudinary.com/...",
    "jsykLink": "newusername",
    "memberSince": "2023-01-01T12:00:00.000Z",
    "profileViews": 0,
    "role": "User"
  }
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `400 Bad Request`: Invalid username (`FORBIDDEN_USERNAME`).
- `500 Internal Server Error`: Server-side error.

#### `GET /api/profile/:profileSlug`
Retrieves public profile information for a given user slug. Increments profile views.
**Authentication**: None
**Request**:
_No payload required._
**Response**:
```json
{
  "success": true,
  "data": {
    "username": "john_doe",
    "profileImgUrl": "https://res.cloudinary.com/...",
    "jsykLink": "john_doe",
    "bio": "Loves anonymous messages.",
    "profileSlug": "john_doe"
  }
}
```
**Errors**:
- `404 Not Found`: User not found (`USER_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `GET /api/profile?username=[username]`
Checks the availability of a username.
**Authentication**: None
**Request**:
_Query Parameter:_ `username` (e.g., `/api/profile?username=testuser`)
**Response**:
```json
{
  "success": true,
  "available": true,
  "message": "Username is available"
}
```
or
```json
{
  "success": true,
  "available": false,
  "message": "Username is already taken"
}
```
**Errors**:
- `403 Forbidden`: Username not allowed (`FORBIDDEN_USERNAME`).
- `500 Internal Server Error`: Server-side error.

#### `PATCH /api/profile`
Updates the authenticated user's profile information.
**Authentication**: Required (Bearer Token)
**Request**:
```json
{
  "username": "updated_username",
  "email": "updated@example.com",
  "bio": "New bio content.",
  "profileImgUrl": "https://res.cloudinary.com/new_image.jpg",
  "publicId": "cloudinary_public_id_for_new_image"
}
```
_Note: All fields are optional._
**Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "username": "updated_username",
    "email": "updated@example.com",
    "bio": "New bio content.",
    "profileImgUrl": "https://res.cloudinary.com/new_image.jpg",
    "jsykLink": "updated_username_slug"
  }
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: User not found (`USER_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `POST /api/message`
Sends an anonymous message to a user or a specific topic.
**Authentication**: None (sender is anonymous)
**Rate Limiting**: 10 requests per 60 seconds per IP.
**Request**:
```json
{
  "profileSlug": "target_user_slug",
  "topicId": "optional_topic_id",
  "content": "Your anonymous message here.",
  "themeColor": "#RRGGBB"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```
**Errors**:
- `400 Bad Request`: Message content or theme color missing (`EMPTY_BODY`).
- `404 Not Found`: User or Topic not found (`USER_NOT_FOUND`, `TOPIC_NOT_FOUND`).
- `429 Too Many Requests`: Rate limit exceeded (`TOO_MANY_REQUESTS`).
- `500 Internal Server Error`: Server-side error.

#### `GET /api/message`
Retrieves messages for the authenticated user.
**Authentication**: Required (Bearer Token)
**Request**:
_Query Parameters (optional):_
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `topicId`: Filter messages by a specific topic ID.
**Response**:
```json
{
  "success": true,
  "messages": [
    {
      "_id": "message_id_1",
      "topic": "Daily Thoughts",
      "topicSlug": "daily-thoughts-abcd123",
      "content": "Just wanted to say hi!",
      "isRead": false,
      "themeColor": "#FF5733",
      "createdAt": "2023-10-26T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3,
    "hasNextPage": true
  },
  "unreadCount": 10
}
```
**Errors**:
- `400 Bad Request`: Invalid pagination parameters.
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `500 Internal Server Error`: Server-side error.

#### `GET /api/message/:messageId`
Retrieves a specific message for the authenticated user and marks it as read.
**Authentication**: Required (Bearer Token)
**Request**:
_URL Parameter:_ `messageId` (e.g., `/api/message/651d7c585e8a6f4d2f8e1234`)
**Response**:
```json
{
  "success": true,
  "data": {
    "topic": "Feedback",
    "topicSlug": "feedback-xyz789",
    "content": "Great app!",
    "createdAt": "2023-10-25T15:30:00.000Z",
    "isRead": true,
    "themeColor": "#33FF57",
    "topicImgUrls": [
      {
        "url": "https://res.cloudinary.com/...",
        "publicId": "cloudinary_public_id",
        "expiresAt": "2023-11-09T15:30:00.000Z",
        "_id": "image_id_1"
      }
    ]
  }
}
```
**Errors**:
- `400 Bad Request`: Invalid message ID.
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: Message or associated topic not found (`MESSAGE_NOT_FOUND`, `TOPIC_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `DELETE /api/message/:messageId`
Deletes a specific message for the authenticated user.
**Authentication**: Required (Bearer Token)
**Request**:
_URL Parameter:_ `messageId` (e.g., `/api/message/651d7c585e8a6f4d2f8e1234`)
**Response**:
```json
{
  "success": true,
  "message": "Message deleted",
  "unreadCount": 9,
  "totalMessages": 49
}
```
**Errors**:
- `400 Bad Request`: Invalid message ID.
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: Message not found (`NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `POST /api/topic`
Creates a new topic for the authenticated user.
**Authentication**: Required (Bearer Token)
**Request**:
```json
{
  "topic": "My New Anonymous Topic",
  "themeColor": "#FF0000",
  "topicImgUrls": [
    {
      "url": "https://res.cloudinary.com/image1.jpg",
      "publicId": "image1_public_id"
    },
    {
      "url": "https://res.cloudinary.com/image2.jpg",
      "publicId": "image2_public_id"
    }
  ]
}
```
_Note: `topicImgUrls` and `themeColor` are optional._
**Response**:
```json
{
  "success": true,
  "topicId": "random_topic_id",
  "topic": "My New Anonymous Topic",
  "link": "user_profile_slug/my-new-anonymous-topic-random_topic_id",
  "message": "Topic created successfully"
}
```
**Errors**:
- `400 Bad Request`: Invalid topic title (e.g., empty, too long, invalid characters), invalid theme color, invalid image URLs/public IDs.
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: User not found (`USER_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `GET /api/topic`
Retrieves all topics created by the authenticated user.
**Authentication**: Required (Bearer Token)
**Request**:
_Query Parameters (optional):_
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
**Response**:
```json
{
  "success": true,
  "topics": [
    {
      "_id": "topic_id_1",
      "uid": "user_firebase_uid",
      "profileSlug": "user_profile_slug",
      "topic": "About My Hobbies",
      "slug": "about-my-hobbies",
      "topicId": "abcd1234",
      "topicLink": "user_profile_slug/about-my-hobbies-abcd1234",
      "themeColor": "#008080",
      "topicImgUrls": [],
      "hadImages": false,
      "messageCount": 5,
      "createdAt": "2023-09-01T10:00:00.000Z"
    }
  ],
  "topicsCount": 1,
  "message": "No topics yet"
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `500 Internal Server Error`: Server-side error.

#### `GET /api/topic/:topicId`
Retrieves details of a specific topic for the authenticated user.
**Authentication**: Required (Bearer Token)
**Request**:
_URL Parameter:_ `topicId` (e.g., `/api/topic/abcd1234`)
**Response**:
```json
{
  "success": true,
  "data": {
    "topic": "My Secret",
    "topicLink": "user_profile_slug/my-secret-wxyz7890",
    "themeColor": "#FFA500",
    "topicImgUrls": [],
    "createdAt": "2023-10-15T09:00:00.000Z",
    "messageCount": 3,
    "hadImages": false
  }
}
```
**Errors**:
- `400 Bad Request`: Invalid topic ID.
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: Topic not found (`TOPIC_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `GET /api/topic/:profileSlug/:topicId`
Retrieves public information about a specific topic and the user who created it.
**Authentication**: None
**Request**:
_URL Parameters:_ `profileSlug`, `topicId` (e.g., `/api/topic/john_doe/abcd1234`)
**Response**:
```json
{
  "success": true,
  "data": {
    "username": "john_doe",
    "profileImgUrl": "https://res.cloudinary.com/...",
    "topic": "About My Day",
    "topicId": "abcd1234",
    "themeColor": "#8A2BE2",
    "topicImgUrls": [
      {
        "url": "https://res.cloudinary.com/image3.jpg",
        "publicId": "image3_public_id",
        "expiresAt": "2023-11-10T11:00:00.000Z",
        "_id": "image_id_2"
      }
    ]
  }
}
```
**Errors**:
- `400 Bad Request`: Invalid topic ID or profile slug.
- `404 Not Found`: Topic or user not found (`INVALID_TOPIC`, `USER_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `DELETE /api/topic/:topicId`
Deletes a specific topic and all its associated messages for the authenticated user. Also deletes associated images from Cloudinary.
**Authentication**: Required (Bearer Token)
**Request**:
_URL Parameter:_ `topicId` (e.g., `/api/topic/abcd1234`)
**Response**:
```json
{
  "success": true,
  "message": "Topic and related messages deleted successfully"
}
```
**Errors**:
- `400 Bad Request`: Invalid topic ID.
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: Topic not found (`TOPIC_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error.

#### `GET /api/image/sign`
Generates a Cloudinary upload signature for client-side image uploads.
**Authentication**: None
**Request**:
_Query Parameter (optional):_ `folder` (e.g., `/api/image/sign?folder=/jsyk/profileImgs`)
**Response**:
```json
{
  "success": true,
  "timestamp": 1678886400,
  "signature": "cloudinary_signature_string",
  "cloudName": "your_cloudinary_cloud_name",
  "apiKey": "your_cloudinary_api_key"
}
```
**Errors**:
- `500 Internal Server Error`: Failed to generate signature.

#### `GET /api/image/share/:messageId`
Serves an HTML page with Open Graph (OG) meta tags, designed for social media scraping. The `og:image` tag points to a dynamically generated image.
**Authentication**: None
**Request**:
_URL Parameter:_ `messageId` (e.g., `/api/image/share/651d7c585e8a6f4d2f8e1234`)
**Response**:
_HTML content containing OG meta tags._
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta property="og:title" content="JSYK" />
    <meta property="og:description" content="send me messages anonymously 🤫🌚" />
    <meta property="og:image" content="https://ik.imagekit.io/og-image-url.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://jsyk.pxxl.click/m/userslug" />
  </head>
  <body></body>
</html>
```
**Errors**:
- `400 Bad Request`: Message ID is required.
- `404 Not Found`: Message not found.
- `500 Internal Server Error`: Failed to render OG page.

#### `GET /api/image/generate/:messageId`
Generates an Open Graph (OG) image based on the message content, uploads it to ImageKit, and returns the image URL.
**Authentication**: None
**Request**:
_URL Parameter:_ `messageId` (e.g., `/api/image/generate/651d7c585e8a6f4d2f8e1234`)
**Response**:
```json
{
  "imageUrl": "https://ik.imagekit.io/og-image-url.png"
}
```
**Errors**:
- `404 Not Found`: Message not found.
- `500 Internal Server Error`: Failed to generate OG image.

#### `GET /api/admin/analytics`
Retrieves comprehensive analytics data for administrators, including user, topic, message statistics, and Cloudinary usage.
**Authentication**: Required (Bearer Token) and Admin Role.
**Request**:
_No payload required._
**Response**:
```json
{
  "users": {
    "total": 100,
    "today": 5,
    "perDay": [
      { "_id": "2023-10-20", "count": 2 },
      { "_id": "2023-10-21", "count": 3 }
    ]
  },
  "topics": {
    "total": 50,
    "today": 2,
    "top": [
      { "topic": "Popular Topic", "messageCount": 20 }
    ]
  },
  "messages": {
    "total": 200,
    "today": 10,
    "unread": 30,
    "perDay": [
      { "_id": "2023-10-20", "count": 10 },
      { "_id": "2023-10-21", "count": 15 }
    ]
  },
  "cloudinary": {
    "storage": {
      "usage": "10485760",
      "limit": "1073741824"
    },
    "bandwidth": {
      "usage": "5242880",
      "limit": "1073741824"
    },
    "requests": 10000,
    "transformations": 500
  }
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token or user is not an Admin.
- `500 Internal Server Error`: Failed to fetch analytics.

#### `POST /api/feature`
Submits a feature request.
**Authentication**: Required (Bearer Token)
**Request**:
```json
{
  "content": "I would like a dark mode feature.",
  "username": "requestor_username"
}
```
**Response**:
```json
{
  "success": true,
  "message": "feature request created"
}
```
**Errors**:
- `400 Bad Request`: Content is required (`EMPTY_BODY`).
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `500 Internal Server Error`: Server-side error.

#### `GET /api/feature`
Retrieves all feature requests.
**Authentication**: Required (Bearer Token) and Admin Role.
**Request**:
_No payload required._
**Response**:
```json
{
  "success": true,
  "featureRequests": [
    {
      "_id": "request_id_1",
      "uid": "user_firebase_uid",
      "username": "user_name",
      "email": "user@example.com",
      "content": "Add multi-language support.",
      "createdAt": "2023-10-20T10:00:00.000Z"
    }
  ]
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token or user is not an Admin.
- `500 Internal Server Error`: Server-side error.

#### `DELETE /api/user`
Deletes the authenticated user's account, including all associated topics, messages, and uploaded images. Also deletes the user from Firebase Authentication.
**Authentication**: Required (Bearer Token)
**Request**:
_No payload required._
**Response**:
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```
**Errors**:
- `401 Unauthorized`: No token provided.
- `403 Forbidden`: Invalid token.
- `404 Not Found`: User not found (`USER_NOT_FOUND`).
- `500 Internal Server Error`: Server-side error (e.g., Firebase deletion failure).

#### `GET /api/jobs/cleanup-images`
Triggers the image cleanup job, deleting expired topic images from Cloudinary and updating topic records.
**Authentication**: Required (Query Parameter: `secret`)
**Request**:
_Query Parameter:_ `secret` (e.g., `/api/jobs/cleanup-images?secret=your_cron_secret`)
**Response**:
```json
{
  "success": true,
  "message": "Cleanup executed"
}
```
**Errors**:
- `403 Forbidden`: Invalid `secret` provided.
- `500 Internal Server Error`: Job execution failed.

#### `GET /api/jobs/reset-views`
Triggers the daily profile view reset job, setting `viewsToday` to 0 for all users.
**Authentication**: Required (Query Parameter: `secret`)
**Request**:
_Query Parameter:_ `secret` (e.g., `/api/jobs/reset-views?secret=your_cron_secret`)
**Response**:
```json
{
  "success": true,
  "message": "Views reset"
}
```
**Errors**:
- `403 Forbidden`: Invalid `secret` provided.
- `500 Internal Server Error`: Job execution failed.

## JSYK Frontend

The frontend is a dynamic and responsive web interface built with React.js and TypeScript. It utilizes Vite for a fast development experience and Tailwind CSS for streamlined styling. State management is handled by Zustand, and Framer Motion provides smooth, engaging UI animations. It interacts seamlessly with the JSYK Backend API to deliver all core features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author Info

👋 Hi, I'm Ojomona Ethan Inedu (monaski)!

Connect with me:
*   🐦 [Twitter](https://x.com/monaski_)
*   💼 [LinkedIn](https://linkedin.com/in/ojomona-ethan-inedu)

## Badges

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/skidev101/JSYK/Node.js%20CI?label=Node.js%20CI)](https://github.com/skidev101/JSYK/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub last commit](https://img.shields.io/github/last-commit/skidev101/JSYK)](https://github.com/skidev101/JSYK/commits)
[![Frontend - React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Backend - Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![Database - MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Images-Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![ImageKit](https://img.shields.io/badge/Images-ImageKit-FF4E6F?logo=imagekit&logoColor=white)](https://imagekit.io/)
[![Authentication - Firebase](https://img.shields.io/badge/Auth-Firebase-FFCA28?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Cache - Upstash Redis](https://img.shields.io/badge/Cache-Upstash%20Redis-000000?logo=redis&logoColor=white)](https://upstash.com/)
[![Deployed with Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

