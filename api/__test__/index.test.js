const request = require('supertest');
require('dotenv').config({ path: './.env' });

const baseURL = process.env.PATH_URL;

describe('The API Routes', () => {
  test('GET /movies/page/1)', async () => {
    const page = 1;
    const res = await request(baseURL).get(`/api/v1/movies/page/${page}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(res.body.page).toEqual(page);
    expect(Array.isArray(res.body.results)).toBe(true);
  });

  test('GET /movies/page/30000)', async () => {
    const page = 30000;
    const res = await request(baseURL).get(`/api/v1/movies/page/${page}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(400);
    expect(res.body.page).toBeUndefined();
    expect(Array.isArray(res.body.results)).toBe(false);
  });

  test('GET /movies/page)', async () => {
    const res = await request(baseURL).get(`/api/v1/movies/page`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(400);
    expect(res.body.page).toBeUndefined();
    expect(Array.isArray(res.body.results)).toBe(false);
  });

  test('GET /movies/query?title=John&page=1)', async () => {
    const query = '?title=John&page=1';
    const res = await request(baseURL).get(`/api/v1/movies/query/${query}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(typeof res.body.page).toEqual('number');
    expect(Array.isArray(res.body.results)).toBe(true);
  });
  test('GET /movies/query?title=John&page=100)', async () => {
    const query = '?title=John&page=100';
    const res = await request(baseURL).get(`/api/v1/movies/query/${query}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(typeof res.body.page).toEqual('number');
    expect(Array.isArray(res.body.results)).toBe(true);
  });

  test('GET /movies/query?title=&page=)', async () => {
    const query = '?title=&page=';
    const res = await request(baseURL).get(`/api/v1/movies/query/${query}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(400);
    expect(res.body.page).toBeUndefined();
    expect(Array.isArray(res.body.results)).toBe(false);
  });

  test('GET /movies/555)', async () => {
    const id = 555;
    const res = await request(baseURL).get(`/api/v1/movies/${id}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(typeof res.body.id).toBe('number');
    expect(typeof res.body.title).toBe('string');
  });

  test('GET /movies/1)', async () => {
    const id = 1;
    const res = await request(baseURL).get(`/api/v1/movies/${id}`);

    expect(res).toBeTruthy();
    expect(res.status).toBe(400);
    expect(res.body.page).toBeUndefined();
    expect(res.body.id).toBeUndefined();
  });
});
