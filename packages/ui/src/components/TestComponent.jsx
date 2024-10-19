import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api/test'; // Proxy url

const TestComponent = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    axios
      .post(API_URL, newItem)
      .then((response) => {
        setItems([...items, response.data]);
        setNewItem({ name: '', description: '' });
      })
      .catch((error) => console.error('Error adding item:', error));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const updateItem = () => {
    axios
      .put(`${API_URL}/${editItem.id}`, editItem)
      .then((response) => {
        setItems(
          items.map((item) => (item.id === editItem.id ? response.data : item))
        );
        setEditItem(null);
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <h1>Item List</h1>
      <div>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange }
          placeholder="Item Name"
          data-testid="add-item-name" // Unique test ID for adding items
        />
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Item Description"
          data-testid="add-item-description" // Unique test ID for adding items
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editItem && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            name="name"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            placeholder="Item Name"
            data-testid="edit-item-name" // Unique test ID for editing items
          />
          <input
            type="text"
            name="description"
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value })
            }
            placeholder="Item Description"
            data-testid="edit-item-description" // Unique test ID for editing items
          />
          <button onClick={updateItem}>Update Item</button>
          <button onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TestComponent;
