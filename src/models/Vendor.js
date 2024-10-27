import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qr: { type: String }, 
    no_of_orders: { type: Number, default: 0 },
    description: { type: String },
    owner_name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }, // One-to-one with User
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
