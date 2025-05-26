<template>
  <main>
    <MainBanner />
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-image">
            <img src="/images/home.png" alt="Karina">
          </div>
          <div class="about-text">
            <h2 class="section-title">Мене звати Каріна і ось як мене бачить ШІ</h2>
            <p class="big-text">Блукаючи просторами інтернету та надихнувшись історією створеня NFT, мені захотілось спробувати створити щось своє та показати це світові</p>
            <p>Я більш ніж упевнена, що зможу вас здивувати та створити щось настільки круте та незвичайне, що і ви теж захочете спробувати себе в цій справі!</p>
            <router-link to="/about" class="button">більше про мене</router-link>
          </div>
        </div>
      </div>
    </section>
    
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">Головне завдання — слідувати за новими трендами</h2>
            <p class="big-text">Для того, щоб в пусту не витрачати час на речі, які давно застаріли і втратили свою актуальність, слід створювати саме те, що популярне та цікаве людям саме зараз!</p>
            <p>Не так давно вийшла нова комп'ютерна гра під назвою «Stalker 2», що набрала дуже велику популярність. Саме тому за мотивами даної гри я вирішила створити свою колекцію, яку можна буде придбати, натиснувши кнопку нижче</p>
            <router-link to="/collection" class="button">перейти</router-link>
          </div>
          <div class="mission-images">
            <div class="image-row">
              <img src="/images/stalker1.png" alt="Stalker NFT 1">
              <img src="/images/stalker2.png" alt="Stalker NFT 2">
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <CollectionSlider />
    <section class="nft-info-section">
      <div class="container">
        <div class="nft-info-content">
          <div class="nft-info-text">
            <h2 class="section-title">NFT — це не лише про щось популярне</h2>
            <p class="big-text">Можна створити справді хороший продукт із звичайних живих фото із використанням мультяшного стилю та моделей ШІ</p>
            <p>Причому такі NFT будуть мати максимальну ідентичність, адже шанс повторити саме таку - буде доволі малий, якщо навіть не рівний нулю!</p>
            <div class="quote">
              <p>Тут потім буде якась дуже класна цитата!</p>
            </div>
          </div>
          <div class="nft-info-image">
            <img src="/images/ya.png" alt="NFT Example">
          </div>
        </div>
      </div>
    </section>
    
     <Reviews ref="reviews" />
    
  <section class="feedback-section">
    <div class="container">
      <div class="feedback-content">
        <div class="feedback-form">
          <h2 class="section-title">Залишити відгук!</h2>
          <div class="divider"></div>
          <p>Ви можете залишити відгук про мої роботи або сайт. Враховуйте, що відгуки зʼявляються на сайті, а також можливість їх залишити є лише у зареєстрованих користувачів!</p>
          
          <form @submit.prevent="submitReview">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Ім'я</label>
                <input type="text" id="name" v-model="review.name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="review.email" required>
              </div>
            </div>
            <div class="form-group">
              <label for="message">Повідомлення</label>
              <textarea id="message" v-model="review.message" required></textarea>
            </div>
            <button type="submit" class="button">Надіслати</button>
          </form>
        </div>
        
        <div class="feedback-contacts">
          <h3>Контакти</h3>
          <ul class="contact-list">
            <li>
              <span class="icon">📍</span>
              <span>Луцький національний технічний університет, вул. Львівська 75</span>
            </li>
            <li>
              <span class="icon">📞</span>
              <span>+38 (068) 876-8765, +38 (063) 987--5884</span>
            </li>
            <li>
              <span class="icon">✉️</span>
              <span>worobiovakarina@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  </main>
</template>

<script>
import MainBanner from '@/components/MainBanner.vue'
import CollectionSlider from '@/components/CollectionSlider.vue'
import Reviews from '@/components/Reviews.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    MainBanner,
    CollectionSlider,
    Reviews
  },
  data() {
    return {
      review: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
 computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
  },
  methods: {
    async submitReview() {
      try {
        if (!this.$store.getters['auth/isAuthenticated']) {
          this.$store.commit('auth/SET_AUTH_MODAL', {
            show: true,
            context: 'register',
            review: { text: this.review.message }
          });
          return;
        }
        await this.$axios.post(
          '/reviews',
          { text: this.review.message },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`
            }
          }
        );
        this.review.message = '';
        this.$refs.reviews.fetchReviews();
        alert('Відгук успішно додано!');
      } catch (error) {
        alert(`Помилка: ${error.response?.data?.message || error.message}`);
      }
    }
  },
  mounted() {
    this.$root.$on('submit-pending-review', async () => {
      if (this.$store.state.auth.pendingReview) {
        try {
          await this.$axios.post('/reviews', {
            text: this.$store.state.auth.pendingReview.text
          }, {
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`
            }
          })

          this.review = { name: '', email: '', message: '' }
          this.$refs.reviews.fetchReviews()
          alert('Дякуємо за ваш відгук!')
        } catch (error) {
          console.error('Error submitting pending review:', error)
        } finally {
          this.$store.commit('auth/SET_AUTH_MODAL', { show: false })
        }
      }
    })
  },
  beforeDestroy() {
    this.$root.$off('submit-pending-review')
  }
}
</script>

<style scoped>
.about-section {
  padding: 80px 0;
  background: white;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
}

.about-text {
  flex: 1;
}

.big-text {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.mission-section {
  padding: 80px 0;
  background: #f8f8f8;
}

.mission-content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.mission-text {
  flex: 1;
}

.mission-images {
  flex: 1;
}

.image-row {
  display: flex;
  gap: 20px;
}

.image-row img {
  width: 50%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.nft-info-section {
  padding: 80px 0;
  background: white;
}

.nft-info-content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.nft-info-text {
  flex: 1;
}

.quote {
  margin-top: 30px;
  padding: 20px;
  background: #f8f8f8;
  border-left: 4px solid #8B8A4A;
  font-style: italic;
}

.nft-info-image {
  flex: 1;
}

.nft-info-image img {
  width: 100%;
  border-radius: 10px;
}

.feedback-section {
  padding: 80px 0;
  background: #f8f8f8;
}

.feedback-content {
  display: flex;
  gap: 50px;
}

.feedback-form {
  flex: 2;
}

.feedback-contacts {
  flex: 1;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group textarea {
  height: 150px;
}

.contact-list {
  list-style: none;
}

.contact-list li {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.contact-list .icon {
  font-size: 20px;
}

.divider {
  width: 80px;
  height: 3px;
  background: #8B8A4A;
  margin: 15px 0;
}

@media (max-width: 768px) {
  .about-content,
  .mission-content,
  .nft-info-content,
  .feedback-content {
    flex-direction: column;
  }
  
  .image-row {
    flex-direction: column;
  }
  
  .image-row img {
    width: 100%;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>