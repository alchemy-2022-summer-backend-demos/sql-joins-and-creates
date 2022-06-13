const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/owners should return a list of owners', async () => {
    const resp = await request(app).get('/owners');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      { name: 'Anne' },
      { name: 'Bob' },
      { name: 'Carol' },
      { name: 'Dave' },
      { name: 'Erin' },
    ]);
  });

  it('/owner/:id should return owner detail', async () => {
    const resp = await request(app).get('/owners/1');
    expect(resp.status).toBe(200);
    expect(resp.body.name).toEqual('Anne');
    expect(resp.body).toHaveProperty('pets');
  });

  afterAll(() => {
    pool.end();
  });
});
