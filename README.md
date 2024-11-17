# Flight Booking System

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Architecture Overview](#architecture-overview)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Setup Guide](#setup-guide)

---

## Introduction

The **Flight Booking System** is a web-based platform built to simplify the flight booking process. Users can:
- Search for flights by origin and destination.
- View available seats, flight details, and pricing.
- Book flights by providing their name and ID.

This system ensures efficient booking management and seamless user experience.

---

## Key Features

- **Flight Search**: Filter flights based on origin, destination, and date.
- **Real-Time Availability**: View available seats for each flight.
- **Booking System**: Securely book flights with minimal user input.
- **Modern UI**: An intuitive and user-friendly frontend built with React.
- **API-Driven**: Robust RESTful API built with Express.js for scalability.

---

## Architecture Overview

The system is built using a **three-layered architecture**:

1. **Frontend**: 
   - Built with React for a modern and interactive user experience.
   - Communicates with the backend via API requests.

2. **Backend**:
   - Built with Express.js, handling all API logic and business processes.
   - Validates user input, processes flight searches, and manages bookings.

3. **Database**:
   - PostgreSQL database for reliable storage of flight, airport, and booking data.
   - Optimized with indexes and relationships for efficient querying.

For more details, visit the [Architecture Overview](./Architecture-Overview) page.

---

## Database Schema

The database is designed to efficiently manage flight-related operations. It includes the following primary tables:

1. **Airports**: Stores airport details such as name, city, and country.
2. **Flights**: Contains flight schedules, pricing, and availability.
3. **Bookings**: Tracks passenger bookings and their statuses.

View the full schema on the [Database Schema](./Database-Schema-Architecture) page.

---

## API Endpoints

The system exposes several API endpoints for interacting with flights and bookings. Key endpoints include:

- **GET `/flights/get/all`**: Retrieve all flights.
- **POST `/flights/search`**: Search for flights by origin and destination.
- **POST `/flights/book`**: Book a flight by providing flight ID and passenger details.

Visit the [API Endpoints](./API-Endpoints) page for detailed documentation.

---

## Setup Guide

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NadavMozeson/simple-flight-booking-website
   ```

2. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Start the database**:
   ```bash
   cd database
   docker-compose up -d
   ```

4. **Run the backend**:
   ```bash
   cd backend
   npm start
   ```

5. **Run the frontend**:
   ```bash
   cd frontend
   npm start
   ```

For a detailed guide, visit the [Setup Guide](./Setup-Guide) page.
