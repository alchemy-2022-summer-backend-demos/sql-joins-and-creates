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
      { id: '1', name: 'Anne' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Carol' },
      { id: '4', name: 'Dave' },
      { id: '5', name: 'Erin' },
      { id: '6', name: 'Greg' },
    ]);
  });

  it('/owner/:id should return owner detail', async () => {
    const resp = await request(app).get('/owners/1');
    expect(resp.status).toBe(200);
    expect(resp.body.id).toEqual('1');
    expect(resp.body.name).toEqual('Anne');
    expect(resp.body).toHaveProperty('pets');
  });

  it('POST /owners should create a new owner', async () => {
    const resp = await request(app).post('/owners').send({ name: 'Franny' });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Franny');
  });

  it('POST /owners should create a new owner with an associated Pet', async () => {
    const resp = await request(app)
      .post('/owners')
      .send({ name: 'Harriet', petIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Harriet');

    const { body: georgia } = await request(app).get(`/owners/${resp.body.id}`);
    expect(georgia.pets.length).toBe(2);
  });

  afterAll(() => {
    pool.end();
  });
});
