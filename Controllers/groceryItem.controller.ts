import { Request, Response } from 'express';
import { GroceryItemModel } from '../Models/groceryItem.model';
import { verifyAuthToken } from '../Auth';

export const createGroceryItem = async (req: Request, res: Response) => {
  const newItem = new GroceryItemModel(req.body);
  try {
    await newItem.save();
    res.json({ message: 'Grocery item added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating grocery item' });
  }
};

export const getGroceryItems = async (req: Request, res: Response) => {
  const items = await GroceryItemModel.find();
  res.json(items);
};

export const getAvailableGroceryItems = async (req: Request, res: Response) => {
  const items = await GroceryItemModel.find({ stock: { $gt: 0 } });
  res.json(items);
};

export const deleteGroceryItem = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await GroceryItemModel.findByIdAndDelete(id);
    res.json({ message: 'Grocery item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grocery item' });
  }
};

export const updateGroceryItem = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updatedItem = await GroceryItemModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Grocery item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating grocery item' });
  }
};

export const manageInventory = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { stock } = req.body;
  if (!stock) return res.status(400).json({ message: 'Missing stock value' });

  try {
    const updatedItem = await GroceryItemModel.findByIdAndUpdate(id, { stock }, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Grocery item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory' });
  }
};

// Include this middleware for admin-only endpoints
export const isAdmin = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const decoded = verifyAuthToken(token);
  if (!decoded || !decoded.isAdmin) return res.status(403).json({ message: 'Forbidden' });

  next();
};

export default {
  createGroceryItem,
  getGroceryItems,
  getAvailableGroceryItems,
  deleteGroceryItem,
  updateGroceryItem,
  manageInventory,
  isAdmin,
};
