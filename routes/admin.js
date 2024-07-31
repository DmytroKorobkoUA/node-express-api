import express from 'express';
import User from '../models/user.js';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

// Admin root
router.get('/', authMiddleware, authorize('admin'), (req, res) => {
    res.json({ message: 'Welcome, admin!' });
});

// Get all users
router.get('/users', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new user
router.post('/users', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update existed user
router.put('/users/:id', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove existed user
router.delete('/users/:id', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
