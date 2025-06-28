import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  jest,
} from '@jest/globals';
import request from 'supertest';
import express from 'express';
import createCrudRouter from '../../factories/createCrudRouter.js';
import handleDbError from '../../util/handleDbError.js';

jest.mock('../../util/handleDbError.js');

describe('createCrudRouter', () => {
  let app;
  let model;
  const requestBody = { name: 'Michael', city: 'New York' };
  const document = { _id: 1, name: 'Michael', city: 'New York' };

  beforeAll(() => {
    model = jest.fn();
    model.find = jest.fn();
    model.findById = jest.fn();
    model.findByIdAndUpdate = jest.fn();
    model.findByIdAndDelete = jest.fn();

    app = express();
    app.use(express.json());
    app.use('/api/v1/users', createCrudRouter(model));

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(() => console.error.mockRestore());

  it('returns 200 and all documents on GET /', async () => {
    const documents = [
      document,
      { id: 2, name: 'Mary', city: 'San Francisco' },
    ];

    model.find.mockResolvedValue(documents);

    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(documents);
    expect(model.find).toHaveBeenCalled();
  });

  it('returns 200 and specific document on GET /:id', async () => {
    model.findById.mockResolvedValue(document);

    const response = await request(app).get('/api/v1/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([document]);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('returns 404 when no document found on GET /:id', async () => {
    model.findById.mockResolvedValue(null);

    const response = await request(app).get('/api/v1/users/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual([]);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('returns 201 and new document on POST /', async () => {
    const mockSave = jest.fn().mockResolvedValue(document);
    model.mockImplementation(() => ({ save: mockSave }));

    const response = await request(app).post('/api/v1/users').send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body).toEqual([document]);
    expect(mockSave).toHaveBeenCalled();
  });

  it('returns 200 and updated document on PATCH /:id', async () => {
    model.findByIdAndUpdate.mockResolvedValue(document);

    const response = await request(app)
      .patch('/api/v1/users/1')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([document]);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { $set: requestBody },
      { new: true, runValidators: true },
    );
  });

  it('returns 404 when no document found on PATCH /:id', async () => {
    model.findByIdAndUpdate.mockResolvedValue(null);

    const response = await request(app)
      .patch('/api/v1/users/1')
      .send(requestBody);

    expect(response.status).toBe(404);
    expect(response.body).toEqual([]);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      { $set: requestBody },
      { new: true, runValidators: true },
    );
  });

  it('returns 200 and deletes document on DELETE /:id', async () => {
    model.findByIdAndDelete.mockResolvedValue(document);

    const response = await request(app).delete('/api/v1/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('returns 404 when no document found on DELETE /:id', async () => {
    model.findByIdAndDelete.mockResolvedValue(null);

    const response = await request(app).delete('/api/v1/users/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual([]);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('calls handleDbError on GET / failure', async () => {
    const error = new Error();

    model.find.mockRejectedValueOnce(error);

    handleDbError.mockImplementation(
      (response) => response.status(500).json(['error']),
    );

    await request(app).get('/api/v1/users');

    expect(handleDbError).toHaveBeenCalledWith(expect.any(Object), error);
  });
});
