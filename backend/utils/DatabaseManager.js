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

  async execute(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (err) {
      console.error('Database query error', err.stack);
      throw err;
    }
  }

  async close() {
    await this.pool.end();
    console.log('PostgreSQL connection closed');
  }
}

module.exports = new DatabaseManager();
