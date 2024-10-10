import request from 'supertest';
import app from '../index';

describe('Items API', () => {
  it('should return an empty array initially', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a new item', async () => {
    const newItem = { name: 'Test Item', description: 'This is a test item.' };
    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, ...newItem });
  });

  it('should get an item by ID', async () => {
    const response = await request(app).get('/items/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Test Item', description: 'This is a test item.' });
  });

  it('should update an item by ID', async () => {
    const updatedItem = { name: 'Updated Item', description: 'This is an updated item.' };
    const response = await request(app).put('/items/1').send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, ...updatedItem });
  });

  it('should delete an item by ID', async () => {
    const response = await request(app).delete('/items/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Item deleted' });
  });

  it('should return 404 if item is not found', async () => {
    const response = await request(app).get('/items/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});
