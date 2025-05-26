<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <router-link to="/">
            <img src="/images/logo.png" alt="NFT Collection" width="200">
          </router-link>
        </div>
        <div class="footer-links">
          <div class="links-column">
            <h3>Навігація</h3>
            <ul>
              <li><router-link to="/">Головна</router-link></li>
              <li><router-link to="/collection">Колекція</router-link></li>
              <li><router-link to="/about">Про мене</router-link></li>
            </ul>
          </div>
          <div class="links-column">
            <h3>Контакти</h3>
            <ul>
              <li><a href="mailto:worobiovakarina@gmail.com">Email</a></li>
              <li><a href="tel:+380688768765">Телефон</a></li>
              <li><a href="https://www.instagram.com/qarinyawr">Соцмережі</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} QWizart. Всі права захищені.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #2c2c2c;
  color: #fff;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.footer-logo img {
  height: auto;
}

.footer-links {
  display: flex;
  gap: 80px;
}

.links-column h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #8B8A4A;
}

.links-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-column li {
  margin-bottom: 10px;
}

.links-column a {
  color: #ccc;
  transition: color 0.3s;
}

.links-column a:hover {
  color: #8B8A4A;
}

.footer-bottom {
  border-top: 1px solid #444;
  padding-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #999;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 30px;
  }
}
</style>