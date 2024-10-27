import express from 'express';
import {
    createCartItem,
    getCartItemById,
    updateCartItem,
    deleteCartItem,
    getCartItems,
    getCartItemsByOrderIds
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new cart item
router.post('/', createCartItem); // POST /api/cart

router.get('/', protect, getCartItems); // GET /api/cart

router.get('/byOrderIds', getCartItemsByOrderIds); // GET /api/cart

// Get a single cart item by ID
router.get('/:id', protect, getCartItemById); // GET /api/cart/:id

// Update a cart item by ID
router.put('/:id', updateCartItem); // PUT /api/cart/:id

// Delete a cart item by ID
router.delete('/:id', protect, deleteCartItem); // DELETE /api/cart/:id

export default router;
