import Menu from '../models/Menu.js';
import Vendor from '../models/Vendor.js';

// Create a new menu item
export const createMenuItem = async (req, res) => {
    const { item_name, price, image, quantity } = req.body;
    const userId = req.user._id; // Assuming userId is set in req.user by authentication middleware
    console.log(userId);
    
    try {
        // Find the vendor based on the userId
        const vendor = await Vendor.findOne({ userId: userId });
        
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found for this user' });
        }
        console.log("Hello");
        

        // Create the menu item with the vendor ID
        const menuItem = await Menu.create({ 
            item_name, 
            price, 
            image, 
            quantity, 
            vendor: vendor._id 
        });

        console.log(menuItem);
        
        
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all menu items
export const getAllMenuItems = async (req, res) => {
    const userId = req.user._id; 
    try {
        const vendor = await Vendor.findOne({ userId: userId });
        
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found for this user' });
        }
        const menuItems = await Menu.find({ vendor: vendor._id }).populate('vendor', 'name');

        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single menu item by ID
export const getMenuItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const menuItem = await Menu.findById(id).populate('vendor', 'name'); // Populate vendor name if needed
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { item_name, price, image, quantity } = req.body;

    // Create an update object with only the fields that are defined in req.body
    const updateFields = {};
    if (item_name !== undefined) updateFields.item_name = item_name;
    if (price !== undefined) updateFields.price = price;
    if (image !== undefined) updateFields.image = image;
    if (quantity !== undefined) updateFields.quantity = quantity;

    try {
        // Only updates the fields present in updateFields
        const updatedMenuItem = await Menu.findByIdAndUpdate(id, updateFields, { new: true });
        
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a menu item by ID
export const deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({message : "Menu deleted successfully"}); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
