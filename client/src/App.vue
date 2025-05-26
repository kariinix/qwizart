<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
    <AuthModal v-if="$store.getters['auth/showAuthModal']" @close="closeAuthModal" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AuthModal from '@/components/AuthModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    AuthModal
  },
  methods: {
    closeAuthModal() {
      this.$store.commit('auth/SET_AUTH_MODAL', false)
    }
  },
  created() {
    this.$store.dispatch('auth/checkAuth')
  }
}
</script>

<style>
/* Global styles */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.section {
  padding: 60px 0;
}

.section-title {
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
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

.button {
  display: inline-block;
  padding: 12px 30px;
  background: #8B8A4A;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.button:hover {
  background: #6b6a3a;
  transform: translateY(-2px);
}
</style>