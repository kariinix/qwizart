<template>
  <main class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Сторінку не знайдено</h2>
        <p>Вибачте, але сторінка, яку ви шукаєте, не існує або була видалена.</p>
        <router-link to="/" class="home-link">Повернутися на головну</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  padding: 100px 0;
  text-align: center;
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}

.not-found-content {
  max-width: 600px;
  margin: 0 auto;
}

.not-found h1 {
  font-size: 120px;
  color: #8B8A4A;
  margin-bottom: 20px;
  line-height: 1;
}

.not-found h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #666;
}

.home-link {
  display: inline-block;
  padding: 12px 30px;
  background: #8B8A4A;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s;
}

.home-link:hover {
  background: #6b6a3a;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .not-found h1 {
    font-size: 80px;
  }
  
  .not-found h2 {
    font-size: 28px;
  }
}
</style>