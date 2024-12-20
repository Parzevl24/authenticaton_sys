const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { fullName, email, dateOfBirth, phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ fullName, email, dateOfBirth, phoneNumber, password: hashedPassword });

        await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({ success: true, token, message: 'Login successful' });
    } catch (err) {

        res.status(500).json({ success: false, error: 'Server error' });
    }
};


module.exports = { registerUser, loginUser };
