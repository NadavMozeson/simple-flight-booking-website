const request = require('supertest');
const app = require('../index'); 

describe('API Functionality Tests', () => {
  /**
   * Test: GET /ping
   * Description: Verifies that the ping endpoint responds with "Pong!" and status code 200.
   */
  test('GET /ping should return "Pong!"', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Pong!');
  });

  /**
   * Test: GET /flights/get/all
   * Description: Ensures that the endpoint returns a list of all flights with status "successful".
   */
  test('GET /flights/get/all should return all flights', async () => {
    const response = await request(app).get('/flights/get/all');
    expect(response.statusCode).toBe(200);
    expect((response.body.status === 'successful')).toBe(true); 
    expect(Array.isArray(response.body.data)).toBe(true); 
  });

  /**
   * Test: POST /flights/book
   * Description: Verifies that booking a flight with valid data returns a success response.
   * Input: Booking data containing `flight`, `fullName`, and `tz`.
   */
  test('POST /flights/book should successfully book a flight', async () => {
    const bookingData = {
      flight: 1,
      fullName: 'John Doe',
      tz: '123456789',
    };

    const response = await request(app).post('/flights/book').send(bookingData);
    expect(response.statusCode).toBe(200);
    expect((response.body.status === 'successful')).toBe(true); 
  });

  /**
   * Test: POST /flights/book
   * Description: Verifies that booking a flight with incomplete data returns an error.
   * Input: Partial booking data containing only `flight`.
   */
  test('POST /flights/book should return an error for incomplete data', async () => {
    const invalidData = { flight: 1 }; 

    const response = await request(app).post('/flights/book').send(invalidData);
    expect(response.statusCode).toBe(200); 
    expect((response.body.status === 'invalid data')).toBe(true); 
  });

  /**
   * Test: POST /flights/search
   * Description: Ensures that the search endpoint returns flights matching the provided criteria.
   * Input: Search criteria containing `origin`, `destination`, and `date`.
   */
  test('POST /flights/search should return filtered flights', async () => {
    const searchCriteria = {
      origin: 'New York',
      destination: 'Los Angeles',
      date: '2024-12-01',
    };
  
    const response = await request(app).post('/flights/search').send(searchCriteria);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('successful');
    expect(Array.isArray(response.body.data)).toBe(true);
    if (response.body.data.length > 0) {
      expect(response.body.data[0].origin_city).toMatch(/New York/i);
      expect(response.body.data[0].destination_city).toMatch(/Los Angeles/i);
    }
  });
  
});