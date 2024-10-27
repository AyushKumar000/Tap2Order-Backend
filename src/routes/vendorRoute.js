import express from 'express';
import {
    createVendor,
    getVendorById,
    updateVendor,
    deleteVendor
} from '../controllers/vendorController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new vendor
router.post('/', protect, createVendor); // POST /api/vendors

// Get a single vendor by ID
router.get('/', protect, getVendorById); // GET /api/vendors/:id

// Update a vendor by ID
router.put('/:id', protect, updateVendor); // PUT /api/vendors/:id

// Delete a vendor by ID
router.delete('/:id', protect, deleteVendor); // DELETE /api/vendors/:id

export default router;
