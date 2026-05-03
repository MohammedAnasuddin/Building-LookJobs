# LookJobs Backend

## Overview

This is the backend service for the LookJobs project, a job scraping and management platform. The backend is built with Node.js, Express, and PostgreSQL, providing RESTful APIs for user management, job data retrieval, and background scraping tasks.

## Table of Contents

- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Background Jobs](#background-jobs)
- [Technologies Used](#technologies-used)
- [Future Improvements](#future-improvements)

## Project Structure

```
backend/
├── .env                  # Environment variables (not committed)
├── cookies/              # Storage for browser cookies (used by scrapers)
├── src/                  # Source code
│   ├── controllers/      # Request handlers (logic for each route)
│   │   ├── demo.controller.js
│   │   ├── jobs.controller.js
│   │   └── user.controller.js
│   ├── cron/             # Scheduled tasks (using node-cron)
│   │   └── scraper.cron.js
│   ├── db/               # Database configuration and queries
│   │   ├── db_setup.js   # PostgreSQL connection pool
│   │   └── new_user.js   # User insertion logic
│   ├── middleware/       # Custom middleware (if any)
│   ├── routes/           # API route definitions
│   │   ├── demo.routes.js
│   │   ├── jobs.routes.js
│   │   └── user.routes.js
│   ├── scrapers/         # Web scraping logic (using Puppeteer)
│   │   └── ...           # (Various scraper files for different job sites)
│   ├── services/         # Business logic layer
│   │   └── user.service.js
│   ├── utils/            # Utility functions
│   └── server.js         # Express application entry point
├── package.json          # Dependencies and scripts
├── package-lock.json
└── user/                 # Chrome user data for Puppeteer (likely for persistent sessions)
```

## Key Components

### 1. **Controllers** (`src/controllers/`)

Handle incoming HTTP requests, validate input, call services, and send responses.

- `user.controller.js`: Handles user registration and profile retrieval.
- `jobs.controller.js`: Manages job data retrieval (likely filtering, pagination).
- `demo.controller.js`: Possibly for testing or demonstration endpoints.

### 2. **Services** (`src/services/`)

Contain the core business logic, abstracting data access and operations from controllers.

- `user.service.js`: Interacts with the database for user-related operations (registration, profile fetch).

### 3. **Routes** (`src/routes/`)

Define API endpoints and map them to controller functions.

- `user.routes.js`: Routes for `/api/user` (e.g., POST `/register`, GET `/profile/:userId`).
- `jobs.routes.js`: Routes for `/api/jobs` (e.g., GET for fetching jobs with filters).
- `demo.routes.js`: Routes for `/api/demo` (likely test endpoints).

### 4. **Database** (`src/db/`)

- `db_setup.js`: Sets up the PostgreSQL connection pool using `pg` and validates connection.
- `new_user.js`: Contains the SQL query or function to insert a new user into the database.

### 5. **Middleware** (`src/middleware/`)

Currently empty, but intended for custom middleware (e.g., authentication, logging, error handling).

### 6. **Cron Jobs** (`src/cron/`)

- `scraper.cron.js`: Scheduled task that triggers job scraping at defined intervals (using `node-cron`). Likely invokes scrapers to fetch new job listings and store them in the database.

### 7. **Scrapers** (`src/scrapers/`)

Contains Puppeteer-based scrapers for various job portals (e.g., LinkedIn, Indeed, etc.). These scripts:

- Launch headless browsers (with stealth plugin to avoid detection).
- Navigate to job sites, search for relevant listings.
- Extract job details (title, company, location, description, etc.).
- Save scraped data to the PostgreSQL database (`job_scrape_results` table).
- Utilize persistent user data (`cookies/` and `user/` directories) to maintain sessions and avoid repeated logins/captchas.

### 8. **Utilities** (`src/utils/`)

Helper functions (e.g., date formatting, string manipulation, API response wrappers).

### 9. **Server Entry Point** (`src/server.js`)

- Initializes Express app.
- Configures CORS (origin from `FRONTEND_URL` env var or wildcard).
- Parses JSON bodies.
- Registers API routes.
- Sets up a basic health check endpoint (`GET /`).
- Starts the server on port from `PORT` env var (default 5000).

## API Endpoints

| Method | Endpoint                     |
| ------ | ---------------------------- |
| `POST` | `/api/jobs/add-job`          |
| `GET`  | `/api/jobs/{jobId}`          |
| `GET`  | `/api/user/profile/{userId}` |
| `POST` | `/api/user/register-user`    |
| `POST` | `/api/demo/run-scraper`      |


## Background Jobs

The backend uses `node-cron` to schedule scraping tasks.

- **File**: `src/cron/scraper.cron.js`
- **Functionality**: At a scheduled interval (e.g., every 6 hours), it triggers the scraping process for various job portals.
- **Scrapers**: Located in `src/scrapers/`, each scraper is responsible for a specific job site.
- **Data Storage**: Scraped job listings are inserted into the `job_scrape_results` table in PostgreSQL.
- **Dependencies**: Uses `puppeteer`, `puppeteer-extra`, and `puppeteer-extra-plugin-stealth` to avoid bot detection.

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (with `pg` driver)
- **ORM/Query Builder**: Raw SQL queries (via `pg`)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) - *Note: Currently used? Check services/routes for JWT implementation.*
- **Secrets Management**: `dotenv`
- **HTTP Middleware**: `cors`
- **Scheduling**: `node-cron`
- **Web Scraping**: `puppeteer` with `puppeteer-extra-plugin-stealth`
- **Unique ID Generation**: `uuid`
- **Date Handling**: `moment`
- **HTTP Client**: Implicit via Puppeteer (for scraping) and Express (for API)
