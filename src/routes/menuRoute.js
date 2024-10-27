import express from 'express';
import {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
} from '../controllers/menuController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new menu item
router.post('/', protect, createMenuItem); // POST /api/menu

// Get all menu items
router.get('/', protect, getAllMenuItems); // GET /api/menu

// Get a single menu item by ID
router.get('/:id', protect, getMenuItemById); // GET /api/menu/:id

// Update a menu item by ID
router.put('/:id', protect, updateMenuItem); // PUT /api/menu/:id

// Delete a menu item by ID
router.delete('/:id', protect, deleteMenuItem); // DELETE /api/menu/:id

export default router;
