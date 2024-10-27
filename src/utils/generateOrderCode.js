import Cart from '../models/Cart.js';

export const generateUniqueOrderCode = async () => {
    let uniqueCode;
    let isUnique = false;

    while (!isUnique) {
        // Generate a random 4-digit number
        uniqueCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a number between 1000 and 9999
        
        // Check if the generated code already exists in the database
        const existingOrder = await Cart.findOne({ order_code: uniqueCode });

        if (!existingOrder) {
            // If it doesn't exist, we have our unique code
            isUnique = true;
        }
    }

    return uniqueCode;
};
