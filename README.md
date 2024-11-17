# Simple Flight Booking Website

A lightweight and user-friendly flight booking application designed to streamline the process of searching, selecting, and reserving flight seats. This project implements a robust backend, an interactive frontend, and a database for efficient data management.

---

## Features

- **Search Flights:** View all available flights with detailed information.
- **Book Flights:** Reserve a seat with just a full name and personal ID.
- **Robust Backend:** Powered by Express.js and PostgreSQL for seamless operations.
- **Scalable Frontend:** Built with React for a dynamic user experience.
- **CI/CD Automation:** Streamlined development workflow with GitHub Actions.
- **Containerized Environment:** Dockerized setup for consistent and reliable deployments.

---

## Project Structure

- **Frontend:** React application for user interactions.
- **Backend:** Express.js server managing API endpoints and business logic.
- **Database:** PostgreSQL for efficient data storage and retrieval.
- **CI/CD Pipeline:** Automated testing and deployment using GitHub Actions.

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Local Development

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/NadavMozeson/simple-flight-booking-website.git
   cd simple-flight-booking-website
   ```

2. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Start the Docker Environment:**
   ```bash
   docker-compose up
   ```

4. **Run the Application:**
   - Backend: Navigate to the `backend` folder and start the server:
     ```bash
     npm run dev
     ```
   - Frontend: Navigate to the `frontend` folder and start the client:
     ```bash
     npm start
     ```

5. **Access the Application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) for the frontend.

---

## Running Tests

### Backend Tests
Run the backend tests using:
```bash
cd backend
npm test
```

### Frontend Tests
Run the frontend tests using:
```bash
cd frontend
npm test
```
