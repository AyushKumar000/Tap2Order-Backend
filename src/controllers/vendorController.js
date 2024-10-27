import Vendor from '../models/Vendor.js';

export const createVendor = async (req, res) => {
    const { name, qr, no_of_orders, description, owner_name } = req.body;
    console.log(req.user);
    
    
    const userId = req.user._id; // Get user ID from req.user set by protect middleware
    console.log(userId);
    
    try {
        const vendor = await Vendor.create({ 
            name, 
            qr: qr ?? "", 
            no_of_orders, 
            description, 
            owner_name, 
            userId: userId // Store userId in Vendor
        });
        res.status(201).json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a single vendor by ID
export const getVendorById = async (req, res) => {
    const userId = req.user._id; 
    console.log(userId);
    

    try {
        const vendor = await Vendor.findOne({ userId: userId }).populate('userId', 'email');
        
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found for this user' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vendor by ID
export const updateVendor = async (req, res) => {
    const {id} = req.params;
    const { name, qr, no_of_orders, description, owner_name } = req.body;

    // Create an update object with only the fields present in req.body
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (qr !== undefined) updateFields.qr = qr;
    if (no_of_orders !== undefined) updateFields.no_of_orders = no_of_orders;
    if (description !== undefined) updateFields.description = description;
    if (owner_name !== undefined) updateFields.owner_name = owner_name;

    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(
            id,
            updateFields, // Only fields that exist in req.body
            { new: true }
        );
        
        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        
        res.status(200).json(updatedVendor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a vendor by ID
export const deleteVendor = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedVendor = await Vendor.findByIdAndDelete(id);
        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(204).send({message : "Vendor deleted successfully "}); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
