const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Song = require('../lib/models/Song');

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

  it('should be able to list songs by id', async () => {
    const song = await Song.insert({ title: 'aquemini', artist: 'outkast' });
    const res = await request(app).get(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
  });

  it('should be able to list songs', async () => {
    const expected = await Song.insert({
      title: 'aquemini',
      artist: 'outkast',
    });
    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'aquemini',
        artist: 'outkast',
      },
    ]);
  });

  it('should be able to delete a song', async () => {
    const song = await Song.insert({ title: 'aquemini', artist: 'outkast' });
    const res = await request(app).delete(`/api/v1/songs/${song.id}`);

    expect(res.body).toEqual(song);
    expect(await Song.getById(song.id)).toBeNull();
  });

  it('should be able to update a song', async () => {
    const song = await Song.insert({ title: 'aquemini', artist: 'outkast' });
    const res = await request(app)
      .patch(`/api/v1/songs/${song.id}`)
      .send({ title: 'New Song', artist: 'New Artist' });
    console.log(song);

    // expect(res.body).toEqual([
    //   {
    //     id: expect.any(String),
    //     title: 'New Song',
    //     artist: 'New Artist',
    //   },
    // ]);

    // const expected = {
    //   id: expect.any(String),
    //   title: 'New Song',
    //   artist: 'New Artist',
    // };

    // console.log(song);
    // expect(res.body).toEqual(expected);
    // expect(await Song.getById(song.id)).toEqual(expected);
  });
});
