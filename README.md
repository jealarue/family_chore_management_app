# Family Chore Management App

![Project Screenshot](link-to-your-screenshot.png)

A web application for managing family chores with a points/rewards system. This app allows parents to assign tasks to children, verify completion, and manage rewards based on points earned.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Initial Setup](#initial-setup)
- [Docker Containerization](#docker-containerization)
  - [Docker Prerequisites](#docker-prerequisites)
  - [Running with Docker](#running-with-docker)
  - [Docker Environment Variables](#docker-environment-variables)
  - [Managing Docker Containers](#managing-docker-containers)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Management:** Admin (parent) and user (children) roles with different permissions. Admins can:
  - Create and manage user accounts.
  - Assign roles and set permissions.
  - View user profiles and activity.
- **Task Management:** Create, assign, and track chores. Admins can:
  - Create new tasks with descriptions, due dates, and assigned users.
  - Assign tasks to specific users.
  - Track task completion status.
  - Verify completed tasks.
- **Points System:** Earn points for completing tasks, with bonuses for good behavior.
  - Points are automatically awarded upon task verification.
  - Bonus points can be manually awarded for exceptional effort.
  - Points can be viewed on user profiles and leaderboards.
- **Rewards System:** Convert points to rewards or money.
  - Admins can create and manage rewards.
  - Users can redeem points for rewards.
  - Point-to-money conversion rates can be configured.
- **Leaderboard:** Friendly competition among family members.
  - Displays users ranked by points earned.
  - Encourages engagement and motivation.
- **Calendar View:** Schedule and view upcoming tasks.
  - Provides a visual overview of tasks and deadlines.
  - Helps users plan their activities.
- **Notifications:** Reminders and updates about tasks and rewards.
  - Sends email or in-app notifications for new tasks, upcoming deadlines, and reward availability.
- **Analytics:** Track progress and performance over time.
  - Provides insights into task completion rates, points earned, and reward redemption.
  - Helps admins identify areas for improvement.

## Tech Stack

- **Frontend:**
  - [Next.js 14](https://nextjs.org/): Used for building the user interface and handling routing. Next.js provides server-side rendering, static site generation, and API routes.
  - [React 18](https://reactjs.org/): A JavaScript library for building user interfaces. React's component-based architecture makes it easy to create reusable UI elements.
  - [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework that allows for rapid UI development.
  - [Framer Motion](https://www.framer.com/motion/): A library for creating animations and transitions in React.
- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction): Used for handling API requests and server-side logic.
- **Database:**
  - [PostgreSQL](https://www.postgresql.org/): A powerful, open-source relational database system.
  - [Prisma ORM](https://www.prisma.io/): An ORM that simplifies database access and management.
- **Authentication:**
  - [NextAuth.js](https://next-auth.js.org/): An authentication library for Next.js applications.
- **UI Components:**
  - [Radix UI](https://www.radix-ui.com/): A set of unstyled, accessible UI components.
  - [Lucide Icons](https://lucide.dev/): A collection of beautiful, hand-crafted icons.
- **Containerization:**
  - [Docker](https://www.docker.com/): Platform for developing, shipping, and running applications in containers.
  - [Docker Compose](https://docs.docker.com/compose/): Tool for defining and running multi-container Docker applications.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm/yarn
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/jealarue/family-chore-management-app.git
    cd family-chore-management-app
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables:

    Create a `.env` file in the root directory with the following:

    ```
    DATABASE_URL="postgresql://username:password@localhost:5432/familychores"
    NEXTAUTH_SECRET="your-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

    -   `DATABASE_URL`: The connection string for your PostgreSQL database. Replace `username`, `password`, and `familychores` with your actual database credentials.
    -   `NEXTAUTH_SECRET`: A secret key used for encrypting sessions. Generate a random string for this value.
    -   `NEXTAUTH_URL`: The URL of your application. This is typically `http://localhost:3000` during development.

4.  Initialize the database:

    ```bash
    npx prisma db push
    ```

5.  Run the development server:

    ```bash
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Initial Setup

After starting the application for the first time:

1.  Create an admin account (parent).
2.  Add children as users.
3.  Create task categories.
4.  Set up rewards.
5.  Configure point-to-money conversion rates in settings.

## Docker Containerization

The application is containerized using Docker, which simplifies deployment and ensures consistency across different environments.

### Docker Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0.0 or higher)

### Running with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/jealarue/family-chore-management-app.git
   cd family-chore-management-app
   ```

2. Create a `.env` file in the root directory with at least the following variables:

   ```
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. Build and start the containers:

   ```bash
   docker compose up -d --build
   ```

   This command builds the Docker images and starts the containers in detached mode.

4. The application will be available at [http://localhost:3000](http://localhost:3000).

5. The PostgreSQL database will be accessible on port 5432.

### Docker Environment Variables

The Docker setup uses the following environment variables:

- **App Container:**
  - `DATABASE_URL`: Connection string for the PostgreSQL database (default: `postgresql://postgres:postgres@db:5432/familychores`)
  - `NEXTAUTH_SECRET`: Secret key for NextAuth.js (required)
  - `NEXTAUTH_URL`: URL of your application (default: `http://localhost:3000`)

- **Database Container:**
  - `POSTGRES_USER`: PostgreSQL username (default: `postgres`)
  - `POSTGRES_PASSWORD`: PostgreSQL password (default: `postgres`)
  - `POSTGRES_DB`: PostgreSQL database name (default: `familychores`)

You can override these defaults by setting them in your `.env` file or by passing them directly to the `docker compose up` command.

### Managing Docker Containers

- **Start the containers:**

  ```bash
  docker compose up -d
  ```

- **Stop the containers:**

  ```bash
  docker compose down
  ```

- **View container logs:**

  ```bash
  # View logs for all containers
  docker compose logs

  # View logs for a specific container
  docker compose logs app
  docker compose logs db

  # Follow logs in real-time
  docker compose logs -f
  ```

- **Restart containers:**

  ```bash
  docker compose restart
  ```

- **Rebuild and restart containers (after code changes):**

  ```bash
  docker compose up -d --build
  ```

- **Access the database directly:**

  ```bash
  docker exec -it family-chore-db psql -U postgres -d familychores
  ```

- **Run Prisma commands:**

  ```bash
  # Generate Prisma client
  docker exec -it family-chore-app npx prisma generate

  # Run database migrations
  docker exec -it family-chore-app npx prisma migrate dev

  # Open Prisma Studio
  docker exec -it family-chore-app npx prisma studio
  ```

- **Clean up unused resources:**

  ```bash
  # Remove stopped containers
  docker compose down

  # Remove volumes (will delete database data)
  docker compose down -v
  ```

## Usage

Provide examples of how to use the app. Include screenshots or GIFs to demonstrate the app's functionality.

## Contributing

We welcome contributions to the FamilyChore Management App! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Jesse LaRue - jesse.green81@gmail.com
