# Video Sharing App Frontend

This is the frontend service for the Video Sharing App, allowing users to interact with the backend service for sharing YouTube videos.

## Backend Repository

The backend repository can be found at [https://github.com/minhhieple97/video-sharing-app.git](https://github.com/minhhieple97/video-sharing-app.git) (You should run the backend service first).

## Prerequisites

- Docker
- Docker Compose

## Local development prerequisites (optional)

- Node.js (v20.12.2)
- pnpm (v9.1.0)
- npm (v10.8.1)

## Features

- User registration and login
- Sharing YouTube videos
- Viewing a list of shared videos
- Real-time notifications for new video shares

## Technologies Used

- Frontend: React.js
- Styling: Tailwind CSS
- Real-time notifications: WebSockets

## Live Demo

A live demo of the application is available at [https://video-sharing-green.vercel.app/](https://video-sharing-green.vercel.app/).

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
docker-compose run client npm run test
```

You can check test case in `src/__tests__` folder.

## Running the App Locally (Without Docker)

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm run dev
   ```

3. The application should now be running. Access it through your web browser:

   - Frontend: http://localhost:5173
