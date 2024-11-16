const request = require('supertest');
const app = require('../index'); 

describe('API Functionality Tests', () => {
  test('GET /ping should return "Pong!"', async () => {
    const response = await request(app).get('/ping');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Pong!');
  });

  test('GET /flights/get/all should return all flights', async () => {
    const response = await request(app).get('/flights/get/all');
    expect(response.statusCode).toBe(200);
    expect((response.body.status === 'successful')).toBe(true); 
    expect(Array.isArray(response.body.data)).toBe(true); 
  });

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

  test('POST /flights/book should return an error for incomplete data', async () => {
    const invalidData = { flight: 1 }; 

    const response = await request(app).post('/flights/book').send(invalidData);
    expect(response.statusCode).toBe(200); 
    expect((response.body.status === 'invalid data')).toBe(true); 
  });
});