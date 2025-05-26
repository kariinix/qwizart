<template>
  <section class="main-banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
          <div class="slide-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>
          <div class="slide-content">
            <h1 class="slide-title">{{ slide.title }}</h1>
            <p class="slide-text">{{ slide.text }}</p>
            <router-link to="/collection" class="button">{{ slide.buttonText }}</router-link>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

export default {
  name: 'MainBanner',
  data() {
    return {
      slides: [
        {
          image: '/images/slider1.png',
          title: 'Нова колекція NFT «Punk Death Note»',
          text: 'Нова колекція NFT із героями аніме-серіалу «Death Note» у стилі панк уже була розміщена на платформі OpenSea. Для того, щоб переглянути або придбати нову NFT - достатньо натиснути кнопку нижче',
          buttonText: 'Перейти'
        },
        {
          image: '/images/slider2.png',
          title: 'Предпоказ колекції NFT по грі «Stalker 2»',
          text: 'Слідувати трендам - двигун для досягнення успіху. Отже незабаром буде випущено нову колекцію NFT по популярній грі Stalker 2.',
          buttonText: 'Перейти'
        },
        {
          image: '/images/slider3.png',
          title: 'Колаборація NFT «Venom»X«SpiderMan»',
          text: 'Було розроблено NFT із персонажами фільмів Venom та SpiderMan у стилі багатія-пофігіста, який фотографує себе на кожному кроці',
          buttonText: 'Перейти'
        }
      ]
    };
  },
  mounted() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
};
</script>

<style scoped>
.main-banner {
  margin-top: 80px;
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.slide-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;
  max-width: 600px;
  z-index: 2;
}

.slide-title {
  font-size: 48px;
  margin-bottom: 20px;
  line-height: 1.2;
}

.slide-text {
  font-size: 18px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.swiper-pagination {
  position: absolute;
  bottom: 30px !important;
}

.swiper-button-prev,
.swiper-button-next {
  color: white;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 20px;
}

@media (max-width: 768px) {
  .slide-content {
    left: 5%;
    right: 5%;
    max-width: 90%;
  }
  
  .slide-title {
    font-size: 32px;
  }
  
  .slide-text {
    font-size: 16px;
  }
}
</style>