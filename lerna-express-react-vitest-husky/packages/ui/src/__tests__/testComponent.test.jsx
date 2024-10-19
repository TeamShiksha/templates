import React from 'react';
import axios from 'axios';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import TestComponent from '../components/TestComponent.jsx';

vi.mock('axios');

describe('TestComponent', () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  test('fetches and displays items on mount', async () => {
    const items = [{ id: 1, name: 'Item 1', description: 'Description 1' }];
    axios.get.mockResolvedValueOnce({ data: items });

    await act(async () => {
      render(<TestComponent />);
    });

    // Asserting elements are in the document
    const itemList = await screen.findByText('Item List');
    const item1 = await screen.findByText('Item 1');

    // Use a custom matcher to handle potential text split issues
    const description1 = screen.getByText((content) =>
      content.includes('Description 1')
    );

    expect(itemList).to.exist;
    expect(item1).to.exist;
    expect(description1).to.exist;
  });

  test('adds a new item', async () => {
    const items = [{ id: 1, name: 'Item 1', description: 'Description 1' }];
    axios.get.mockResolvedValueOnce({ data: items });
    axios.post.mockResolvedValueOnce({
      data: { id: 2, name: 'Item 2', description: 'Description 2' },
    });

    await act(async () => {
      render(<TestComponent />);
    });

    fireEvent.change(screen.getByPlaceholderText('Item Name'), {
      target: { value: 'Item 2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Item Description'), {
      target: { value: 'Description 2' },
    });
    fireEvent.click(screen.getByText('Add Item'));

    await waitFor(() => {
      const item2 = screen.getByText(/Item 2/i); // Using a regex matcher
      const description2 = screen.getByText(/Description 2/i); // Using regex matcher

      expect(item2).to.exist;
      expect(description2).to.exist;
    });
  });

  test('edits an existing item', async () => {
    const items = [{ id: 1, name: 'Item 1', description: 'Description 1' }];
    axios.get.mockResolvedValueOnce({ data: items });
    axios.put.mockResolvedValueOnce({
      data: {
        id: 1,
        name: 'Updated Item 1',
        description: 'Updated Description 1',
      },
    });

    await act(async () => {
      render(<TestComponent />);
    });

    fireEvent.click(screen.getByText('Edit'));

    // Use getByTestId to target the correct input for editing the item
    fireEvent.change(screen.getByTestId('edit-item-name'), {
      target: { value: 'Updated Item 1' },
    });
    fireEvent.change(screen.getByTestId('edit-item-description'), {
      target: { value: 'Updated Description 1' },
    });
    fireEvent.click(screen.getByText('Update Item'));

    await waitFor(() => {
      const updatedItem = screen.getByText(/Updated Item 1/i);
      const updatedDescription = screen.getByText(/Updated Description 1/i);
      expect(updatedItem).to.exist;
      expect(updatedDescription).to.exist;
    });
  });

  test('deletes an existing item', async () => {
    const items = [{ id: 1, name: 'Item 1', description: 'Description 1' }];
    axios.get.mockResolvedValueOnce({ data: items });
    axios.delete.mockResolvedValueOnce({});

    await act(async () => {
      render(<TestComponent />);
    });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      const deletedItem = screen.queryByText('Item 1');
      expect(deletedItem).to.not.exist;
    });
  });
});
