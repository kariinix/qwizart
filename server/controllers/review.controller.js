const Review = require('../models/review.model')
const User = require('../models/user.model')

exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      user: req.userId, // <-- тут
      text: req.body.text
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при створенні відгуку' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні відгуків' });
  }
};

exports.getUserReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.userId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
}

exports.updateReview = async (req, res, next) => {
  try {
    const { text } = req.body
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { text },
      { new: true, runValidators: true }
    ).populate('user', 'name email')

    if (!review) {
      return res.status(404).json({ message: 'Відгук не знайдено або ви не маєте прав' })
    }

    res.json(review)
  } catch (error) {
    next(error)
  }
}

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    })

    if (!review) {
      return res.status(404).json({ message: 'Відгук не знайдено або ви не маєте прав' })
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { reviews: review._id }
    })

    res.json({ message: 'Відгук успішно видалено' })
  } catch (error) {
    next(error)
  }
}

exports.checkUserReview = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    res.json({ exists: !!user })
  } catch (error) {
    next(error)
  }
}