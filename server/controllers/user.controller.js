const User = require('../models/user.model')
const Review = require('../models/review.model')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')

exports.updateUser = async (req, res) => {
  try {
    console.log('Incoming update data:', req.body);
    
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      updates.photo = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ 
      message: error.message,
      errors: error.errors 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log('Видаляємо користувача:', userId);
    const reviewsResult = await Review.deleteMany({ user: userId });
    console.log('Видалено відгуків:', reviewsResult.deletedCount);
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      console.log('Користувача не знайдено');
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.json({ message: 'Користувача та його відгуки видалено' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Помилка при видаленні користувача', error: error.message });
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate({
        path: 'reviews',
        options: { sort: { createdAt: -1 } }
      })
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}