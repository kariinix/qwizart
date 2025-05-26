<template>
  <section class="collection-section">
    <div class="container">
      <h2 class="section-title">Колекція «Punk Death Note»</h2>
      <div class="collection-slider">
        <div class="slider-container">
          <div class="slider-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div 
              class="slide" 
              v-for="(item, index) in collectionItems" 
              :key="item.id"
              :class="{ 'active-slide': index === currentIndex, 'left-slide': index < currentIndex, 'right-slide': index > currentIndex }"
            >
              <img 
                :src="item.image" 
                :alt="item.title"
                :class="{ 'grayscale': index !== currentIndex }"
              >
              <div class="slide-info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.subtitle }}</p>
              </div>
            </div>
          </div>
          <button class="slider-btn prev" @click="prevSlide">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" fill="currentColor"/>
            </svg>
          </button>
          <button class="slider-btn next" @click="nextSlide">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      <router-link to="/collection" class="button">Переглянути всю колекцію</router-link>
    </div>
  </section>
</template>
<script>
export default {
  name: 'CollectionSlider',
  data() {
    return {
      currentIndex: 0,
      collectionItems: [
        { id: 1, image: '/images/death1.png', title: 'Лайт & Рюк', subtitle: '«Punk Death Note»' },
        { id: 2, image: '/images/death2.png', title: 'Лайт & Рюк', subtitle: '«Punk Death Note»' },
        { id: 3, image: '/images/death3.png', title: 'Лайт', subtitle: '«Punk Death Note»' },
        { id: 4, image: '/images/death4.png', title: 'Лайт & Міса', subtitle: '«Punk Death Note»' },
        { id: 5, image: '/images/death5.png', title: 'Рюк', subtitle: '«Punk Death Note»' },
        { id: 6, image: '/images/death6.png', title: 'Лайт & Рюк', subtitle: '«Punk Death Note»' },
        { id: 7, image: '/images/death7.png', title: 'Міса', subtitle: '«Punk Death Note»' }
      ]
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.collectionItems.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.collectionItems.length) % this.collectionItems.length;
    }
  }
};
</script>

<style scoped>
.collection-section {
  padding: 80px 0;
  background: #f8f8f8;
  text-align: center;
}

.collection-slider {
  margin: 40px 0;
  position: relative;
}

.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;
}

.slide img {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  transition: filter 0.5s ease;
}

.slide img.grayscale {
  filter: grayscale(100%);
  opacity: 0.7;
}

.slide-info {
  margin-top: 20px;
  text-align: center;
}

.slide-info h3 {
  font-size: 20px;
  margin-bottom: 5px;
}

.slide-info p {
  color: #666;
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
  left: 10px;
}

.slider-btn.next {
  right: 10px;
}

.slider-btn svg {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .slide {
    padding: 0 10px;
  }
  
  .slide img {
    max-width: 200px;
  }
}
</style>