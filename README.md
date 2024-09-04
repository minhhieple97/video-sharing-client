# Video Sharing App Frontend

This is the frontend service for the Video Sharing App, allowing users to interact with the backend service for sharing YouTube videos.

## Backend Repository

The backend repository can be found at [https://github.com/minhhieple97/video-sharing-server](https://github.com/minhhieple97/video-sharing-server).

## Prerequisites

- Docker
- Docker Compose

## Features

- User registration and login
- Sharing YouTube videos
- Viewing a list of shared videos
- Real-time notifications for new video shares

## Technologies Used

- Frontend: React.js
- Styling: Tailwind CSS
- Real-time notifications: WebSockets

## Setup and Running the App with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/minhhieple97/video-sharing-client.git
   cd video-sharing-client
   ```

2. Create the environment file manually:

   Create a file named `.env.local` in the root directory and add your configuration settings follow `.env.example`.

3. Build and start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. The application should now be running. Access it through your web browser:

   - Frontend: http://localhost:5173

## Running Tests

To run the tests, use the following command:

```bash
pnpm run test
```
