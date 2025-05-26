<template>
  <section class="testimonials-section">
    <div class="container">
      <h2 class="section-title">Що говорять про колекцію</h2>
      <div class="testimonials-grid">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
          <div class="testimonial-content">
            <div class="quote-icon">“</div>
            <p>{{ testimonial.text }}</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.author.charAt(0) }}</div>
            <div class="author-info">
              <h4>{{ testimonial.author }}</h4>
              <span>{{ testimonial.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Testimonials',
  data() {
    return {
      testimonials: [
        {
          text: 'Це найкраща NFT колекція, яку я бачив за останній час. Дуже якісні роботи та оригінальний стиль!',
          author: 'Олег',
          role: 'Колекціонер NFT'
        },
        {
          text: 'Мені подобається як автор поєднав аніме персонажів з панк стилем. Дуже незвичайно та круто!',
          author: 'Анна',
          role: 'Шанувальниця аніме'
        },
        {
          text: 'Я придбав кілька NFT з цієї колекції і не жалкую. Вважаю це хорошою інвестицією.',
          author: 'Максим',
          role: 'Інвестор'
        }
      ]
    }
  }
}
</script>

<style scoped>
.testimonials-section {
  padding: 80px 0;
  background-color: #f8f8f8;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 32px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #8B8A4A;
  margin: 15px auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-content {
  margin-bottom: 20px;
  position: relative;
}

.quote-icon {
  font-size: 60px;
  color: #8B8A4A;
  opacity: 0.2;
  position: absolute;
  top: -20px;
  left: -10px;
  line-height: 1;
}

.testimonial-content p {
  font-size: 16px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: #8B8A4A;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  margin-right: 15px;
}

.author-info h4 {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.author-info span {
  font-size: 14px;
  color: #777;
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>