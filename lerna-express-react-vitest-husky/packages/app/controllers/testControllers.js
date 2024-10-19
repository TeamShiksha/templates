let items = [];

const getAllItems = (req, res) => {
  res.status(200).json(items);
};

const getItemById = (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

const createItem = (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
};

const updateItem = (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id, 10));
  if (index !== -1) {
    items[index] = { id: parseInt(req.params.id, 10), ...req.body };
    res.status(200).json(items[index]);
  } else {
    res.status(404).json({ message: 'Item could not found' });
  }
};

const deleteItem = (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id, 10));
  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
