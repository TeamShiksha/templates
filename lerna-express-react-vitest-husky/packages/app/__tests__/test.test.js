const request = require('supertest');
const server = require('../index');

describe('Tests API', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should return an empty array initially', async () => {
    const response = await request(server).get('/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a new item', async () => {
    const newItem = { name: 'Test Item', description: 'This is a test item.' };
    const response = await request(server).post('/test').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, ...newItem });
  });

  it('should get an item by ID', async () => {
    const response = await request(server).get('/test/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Test Item',
      description: 'This is a test item.',
    });
  });

  it('should update an item by ID', async () => {
    const updatedItem = {
      name: 'Updated Item',
      description: 'This is an updated item.',
    };
    const response = await request(server).put('/test/1').send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...updatedItem });
  });

  it('should delete an item by ID', async () => {
    const response = await request(server).delete('/test/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Item deleted' });
  });

  it('should return 404 if item is not found', async () => {
    const response = await request(server).get('/test/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});
