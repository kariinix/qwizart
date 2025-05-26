<template>
  <section v-if="reviews.length > 0" class="reviews-section">
    <div class="container">
      <h2 class="section-title">Відгуки</h2>
      <div class="reviews-slider">
        <button class="slider-btn prev" @click="prevReview" v-if="reviews.length > 1">
          <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/></svg>
        </button>
        <div
          class="review active-review"
          v-if="reviews[activeReviewIndex]"
          :key="reviews[activeReviewIndex]._id"
        >
          <div class="review-header">
            <template v-if="getUserPhoto(reviews[activeReviewIndex].user)">
              <img :src="getUserPhoto(reviews[activeReviewIndex].user)" class="review-avatar" alt="User Photo" />
            </template>
            <div v-else class="review-photo">
              {{ reviews[activeReviewIndex].user?.name ? reviews[activeReviewIndex].user.name.charAt(0) : '?' }}
            </div>
            <div class="review-name">{{ reviews[activeReviewIndex].user?.name || 'Користувач' }}</div>
          </div>
          <div class="review-text">{{ reviews[activeReviewIndex].text }}</div>
        </div>
        <button class="slider-btn next" @click="nextReview" v-if="reviews.length > 1">
          <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Reviews',
  data() {
    return {
      activeReviewIndex: 0,
      reviews: [],
      interval: null
    }
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_API_URL.replace('/api', '');
    }
  },
  methods: {
    getUserPhoto(user) {
      return user && user.photo ? `${this.baseUrl}/uploads/${user.photo}` : null;
    },
    prevReview() {
      if (this.reviews.length > 0) {
        this.activeReviewIndex = (this.activeReviewIndex - 1 + this.reviews.length) % this.reviews.length;
        this.resetAutoRotation();
      }
    },
    nextReview() {
      if (this.reviews.length > 0) {
        this.activeReviewIndex = (this.activeReviewIndex + 1) % this.reviews.length;
        this.resetAutoRotation();
      }
    },
    resetAutoRotation() {
      clearInterval(this.interval)
      this.startAutoRotation()
    },
    startAutoRotation() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.nextReview();
      }, 5000)
    },
    async fetchReviews() {
      try {
        const response = await this.$axios.get('/reviews/all')
        this.reviews = response.data
        this.$emit('reviews-loaded', this.reviews)
        if (this.reviews.length > 0) {
          this.startAutoRotation()
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
  },
  mounted() {
    this.fetchReviews()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.reviews-section {
  padding: 80px 0;
  background: white;
  text-align: center;
}

.reviews-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
  min-height: 250px;
  position: relative;
}

.review {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
  max-width: 400px;
  margin: 0 auto;
  opacity: 1;
  position: relative;
  left: 0;
  transform: none;
  z-index: 2;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: center;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 2px solid #8B8A4A;
}

.review-photo {
  width: 40px;
  height: 40px;
  background: #8B8A4A;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
  font-size: 22px;
}

.review-name {
  font-weight: bold;
}

.review-text {
  line-height: 1.6;
  text-align: left;
  font-size: 18px;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(139, 138, 74, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}
.slider-btn.prev {
  left: 0;
}
.slider-btn.next {
  right: 0;
}
.slider-btn svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .reviews-slider {
    flex-direction: column;
    gap: 10px;
  }
  .review {
    max-width: 100%;
    width: 100%;
  }
}
</style>