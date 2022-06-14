const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.only('POST /pets should create a new pet with an associated Owner', async () => {
    const resp = await request(app)
      .post('/pets')
      .send({ name: 'Hugo', type: 'pig', age: 2, ownerIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Hugo');

    const { body: hugo } = await request(app).get(`/pets/${resp.body.id}`);
    expect(hugo.owners.length).toBe(2);
  });

  afterAll(() => {
    pool.end();
  });
});
