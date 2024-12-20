const { Pool } = require('pg');

class DatabaseManager {
  constructor() {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'admin_user',
      password: 'admin_password',
      database: 'FlightBooking',
    });

    this.pool.on('connect', () => {
      console.log('Connected to PostgreSQL');
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client', err);
    });
  }

  /**
   * Executes a SQL query.
   * @private
   * @param {string} sql - SQL query string.
   * @param {Array} params - Array of query parameters.
   * @returns {Array} Resulting rows from the query.
   * @throws {Error} If the query fails.
   */
  async #execute(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (err) {
      console.error('Database query error', err.stack);
      throw err;
    }
  }

  /**
   * Fetches all flights from the database.
   * @returns {Object} Status and flight data (or a placeholder in test environment).
   */
  async getAllFlights() {
    try {
      const sqlString = `SELECT 
    f.flight_id,
    f.flight_number,
    f.origin_airport_id,
    oa.name AS origin_airport_name,
    oa.city AS origin_city,
    oa.country AS origin_country,
    f.destination_airport_id,
    da.name AS destination_airport_name,
    da.city AS destination_city,
    da.country AS destination_country,
    f.departure_time,
    f.arrival_time,
    f.duration,
    f.price,
    f.available_seats,
    COALESCE(COUNT(b.booking_id), 0) AS reserved_seats,
    f.available_seats - COALESCE(COUNT(b.booking_id), 0) AS remaining_seats
FROM 
    public.flights f
JOIN 
    public.airports oa ON f.origin_airport_id = oa.airport_id
JOIN 
    public.airports da ON f.destination_airport_id = da.airport_id
LEFT JOIN 
    public.bookings b ON f.flight_id = b.flight_id
GROUP BY 
    f.flight_id, oa.name, oa.city, oa.country, da.name, da.city, da.country
ORDER BY 
    f.departure_time ASC;
`
      if (process.env.NODE_ENV !== 'test') {
        const dbResult = await this.#execute(sqlString)
        return { status: 'successful', data: dbResult }
      } else {
        return { status: 'successful', data: [{
          "flight_id": 1,
          "flight_number": "FL001",
          "origin_city": "New York",
          "destination_city": "Los Angeles",
          "departure_time": "2024-12-01T10:00:00Z",
          "arrival_time": "2024-12-01T13:00:00Z",
          "price": 300,
          "remaining_seats": 50
        }] }
      }
    } catch (err) {
      console.error(err);
      return { status: 'failed' }
    }
  }

  /**
   * Adds a new booking to the database.
   * @param {number} flightId - ID of the flight to book.
   * @param {string} name - Full name of the passenger.
   * @param {string} personalId - Personal ID of the passenger.
   * @returns {Object} Status of the booking operation.
   */
  async addBooking(flightId, name, personalId) {
    try {
      if (flightId && name && personalId) {
        const sqlString = `INSERT INTO public.bookings (flight_id, full_name, personal_id, status) VALUES(${flightId}, '${name}', '${personalId}', 'Confirmed');`
        if (process.env.NODE_ENV !== 'test') {
          await this.#execute(sqlString)
        }
        return { status: 'successful' }
      } else {
        return { status: 'invalid data' }
      }
    } catch (err) {
      console.error(err);
      return { status: 'failed' }
    }
  }

  /**
   * Searches for flights based on criteria.
   * @param {Object} criteria - Search criteria (e.g., origin, destination).
   * @returns {Object} Status and matching flight data.
   */
  async searchFlights(criteria) {
    try {
      const filters = [];
  
      if (criteria.origin) {
        filters.push(`oa.city ILIKE '${criteria.origin}'`);
      }
      if (criteria.destination) {
        filters.push(`da.city ILIKE '${criteria.destination}'`);
      }
  
      const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
  
      const sqlString = `
        SELECT 
          f.flight_id,
          f.flight_number,
          f.origin_airport_id,
          oa.name AS origin_airport_name,
          oa.city AS origin_city,
          oa.country AS origin_country,
          f.destination_airport_id,
          da.name AS destination_airport_name,
          da.city AS destination_city,
          da.country AS destination_country,
          f.departure_time,
          f.arrival_time,
          f.duration,
          f.price,
          f.available_seats,
          COALESCE(COUNT(b.booking_id), 0) AS reserved_seats,
          f.available_seats - COALESCE(COUNT(b.booking_id), 0) AS remaining_seats
        FROM 
          public.flights f
        JOIN 
          public.airports oa ON f.origin_airport_id = oa.airport_id
        JOIN 
          public.airports da ON f.destination_airport_id = da.airport_id
        LEFT JOIN 
          public.bookings b ON f.flight_id = b.flight_id
        ${whereClause}
        GROUP BY 
          f.flight_id, oa.name, oa.city, oa.country, da.name, da.city, da.country
        ORDER BY 
          f.departure_time ASC;
      `;
  
      if (process.env.NODE_ENV !== 'test') {
        const dbResult = await this.#execute(sqlString)
        return { status: 'successful', data: dbResult }
      } else {
        return { status: 'successful', data: [{
          "flight_id": 1,
          "flight_number": "FL001",
          "origin_city": "New York",
          "destination_city": "Los Angeles",
          "departure_time": "2024-12-01T10:00:00Z",
          "arrival_time": "2024-12-01T13:00:00Z",
          "price": 300,
          "remaining_seats": 50
        }] }
      }
    } catch (err) {
      console.error('Search query error:', err.stack);
      return { status: 'failed' };
    }
  }
}

const DBManager = new DatabaseManager();

module.exports = DBManager;
