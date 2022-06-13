const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should return a list of owners', async () => {
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
  afterAll(() => {
    pool.end();
  });
});
