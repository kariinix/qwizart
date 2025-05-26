const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/all', reviewController.getAllReviews);
router.post('/check-user', reviewController.checkUserReview);

router.post('/', authMiddleware, reviewController.createReview);
router.get('/', authMiddleware, reviewController.getUserReviews);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;