import Cart from '../models/Cart.js';
import { generateUniqueOrderCode } from '../utils/generateOrderCode.js';
import Menu from '../models/Menu.js'; 
import Vendor from '../models/Vendor.js'; 

export const createCartItem = async (req, res) => {
    const { quantity, total_price, status, payment, menu } = req.body;

    console.log((req.body));
    

    try {
        const order_code = await generateUniqueOrderCode(); // Generate a unique order code
        const cartItem = await Cart.create({ order_code, quantity, total_price, status, payment, menu });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCartItems = async (req, res) => {
    const userId = req.user._id; 

    try {
        const vendor = await Vendor.findOne({ userId: userId });
        
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found for this user' });
        }
        const menus = await Menu.find({ vendor: vendor._id });

        const menuIds = menus.map(menu => menu._id);

        const cartItems = await Cart.find({
            $or: [
                { status: 'pending' },
                { status: 'processing' }
            ],
            menu: { $in: menuIds } // Filter by menu IDs
        }).populate('menu')
        .sort({ createdAt: 1 }); // Populate menu field if needed

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCartItemsByOrderIds = async (req, res) => {
    const { orderIds } = req.query; // Get orderIds from query parameters
    
  
    if (!orderIds) {
      return res.status(400).json({ message: 'Order IDs are required' });
    }
  
    // Convert orderIds from a string into an array
    const orderIdArray = JSON.parse(orderIds);
    
  
    try {
      // Find cart items that match the given order IDs
      const carts = await Cart.find({ order_code: { $in: orderIdArray } }).populate('menu'); // Populating menu data if necessary
      console.log(carts);
      
      res.status(200).json(carts);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ message: error.message });
    }
  }



export const getCartItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await Cart.findById(id).populate('menu');
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    const { id } = req.params;
    
    const { order_code, quantity, total_price, status, payment, menu } = req.body;
    
    // Update fields only if they are provided in the request body
    const updateFields = {};
    if (order_code !== undefined) updateFields.order_code = order_code;
    if (quantity !== undefined) updateFields.quantity = quantity;
    if (total_price !== undefined) updateFields.total_price = total_price;
    if (status !== undefined) updateFields.status = status;
    if (payment !== undefined) updateFields.payment = payment;
    if (menu !== undefined) updateFields.menu = menu;

    console.log(updateFields);
    

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCartItem = await Cart.findByIdAndDelete(id);
        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
