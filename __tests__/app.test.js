const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('anyapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a post', async () => {
    const res = await request(app)
      .post('/api/v1/songs')
      .send({ title: 'aquemini', artist: 'outkast' });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'aquemini',
      artist: 'outkast',
    });
  });
});
