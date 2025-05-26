<template>
  <main class="about-page">
    <section class="about-hero">
      <div class="container">
        <h1>Про мене</h1>
        <p>Мене звати Каріна і я створюю унікальні NFT колекції</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <h2>Моя історія</h2>
            <p>Я почала займатися NFT мистецтвом у 2021 році, коли вперше дізналася про цей напрямок. Мене завжди цікавило мистецтво та технології, тому NFT стали ідеальним поєднанням моїх інтересів.</p>
            <p>Моя перша колекція «Punk Death Note» була натхненна моїм улюбленим аніме та панк-культурою. Я хотіла створити щось унікальне, що поєднувало б поп-культуру з сучасними цифровими технологіями.</p>
            <p>Зараз я працюю над новими проектами та постійно вдосконалюю свої навички у створенні цифрового мистецтва.</p>
          </div>
          <div class="about-image">
            <img src="../../public/images/ya.png" alt="Karina">
          </div>
        </div>
        <div class="skills-section">
          <h2>Мої навички</h2>
          <div class="skills-grid">
            <div class="skill-card" v-for="(skill, index) in skills" :key="index">
              <div class="skill-icon">{{ skill.icon }}</div>
              <h3>{{ skill.name }}</h3>
              <p>{{ skill.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Testimonials />
  </main>
</template>

<script>
import Testimonials from '@/components/Testimonials.vue'

export default {
  name: 'About',
  components: {
    Testimonials
  },
  data() {
    return {
      skills: [
        {
          icon: '🎨',
          name: 'Цифровий арт',
          description: 'Створення унікальних цифрових малюнків та ілюстрацій'
        },
        {
          icon: '💻',
          name: '3D моделювання',
          description: 'Робота з 3D об\'єктами та анімаціями'
        },
        {
          icon: '🔗',
          name: 'Блокчейн',
          description: 'Розуміння технології NFT та блокчейну'
        },
        {
          icon: '📈',
          name: 'Маркетинг',
          description: 'Просування NFT колекцій на ринку'
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  padding-top: 80px;
}

.about-hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../public/images/home.png');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
}

.about-hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.about-hero p {
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  padding: 80px 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  margin-bottom: 80px;
}

.about-text h2 {
  font-size: 32px;
  margin-bottom: 30px;
  position: relative;
}

.about-text h2::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #8B8A4A;
  margin: 15px 0;
}

.about-text p {
  margin-bottom: 20px;
  line-height: 1.6;
}

.about-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.skills-section h2 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 50px;
  position: relative;
}

.skills-section h2::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #8B8A4A;
  margin: 15px auto;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.skill-card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.skill-card h3 {
  margin-bottom: 15px;
  color: #8B8A4A;
}

.skill-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .about-image {
    order: -1;
  }
  
  .about-hero h1 {
    font-size: 36px;
  }
  
  .about-hero p {
    font-size: 18px;
  }
}
</style>