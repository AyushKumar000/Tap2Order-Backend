import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    order_code: { type: String, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending'
    },
    payment: {
        type: String,
        enum: ['paid', 'unpaid', 'cod'],
        default: 'unpaid'
    },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }, // One-to-one with Menu
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
