import { Router } from 'express';
import {
  createGroceryItem,
  getGroceryItems,
  getAvailableGroceryItems,
  deleteGroceryItem,
  updateGroceryItem,
  manageInventory,
  isAdmin,
} from './Controllers/groceryItem.controller';

const router = Router();

router.get('/available', getAvailableGroceryItems);

// For checking of Admin permission (requires 'isAdmin' middleware)
router.post('/createItem', isAdmin, createGroceryItem); // Create a new item
router.get('/getAllItems', isAdmin, getGroceryItems); // Get all items (admin only)
router.delete('/:id', isAdmin, deleteGroceryItem); // Delete an item
router.put('/:id', isAdmin, updateGroceryItem); // Update an item
router.patch('/:id/stock', isAdmin, manageInventory); // Update inventory

export default router;
