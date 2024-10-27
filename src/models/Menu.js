import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    item_name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // Store image path or URL
    quantity: { type: Number, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }, // One-to-many with Vendor
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);
