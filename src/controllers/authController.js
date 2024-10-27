import User from '../models/User.js';
import { generateToken } from '../utils/token.js';

// Sign-up Controller
export const signup = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Create a new user
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sign-in Controller
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token and send response
        const token = generateToken(user._id);
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sign-out Controller (Client-Side Token Management)
export const signout = (req, res) => {
    res.status(200).json({ message: 'Sign-out successful' });
};
