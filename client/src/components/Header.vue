<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="logo">
          <router-link to="/">
          <img src="/images/logo.png" alt="NFT Collection" width="200">
          </router-link>
        </div>
        <nav class="nav">
          <div class="search-container">
            <input 
              type="text" 
              placeholder="Пошук" 
              v-model="searchQuery"
              @keyup.enter="performSearch"
            >
            <div v-if="isAuthenticated" class="user-circle" @click="goToAccount">
            <img
               v-if="userPhotoUrl"
               :src="userPhotoUrl"
               alt="User Photo"
               class="user-avatar"
                 />
                 <span v-else>{{ userInitial }}</span>
            </div>
            <button v-else class="login-btn" @click="openAuthModal">Увійти</button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser']),
    userInitial() {
      return this.currentUser?.name?.charAt(0).toUpperCase() || 'U'
    },
    userPhotoUrl() {
      if (!this.currentUser?.photo) return null;
      const baseUrl = process.env.VUE_APP_API_URL.replace('/api', '');
      return `${baseUrl}/uploads/${this.currentUser.photo}`;
    }
  },
  methods: {
    ...mapMutations('auth', ['SET_AUTH_MODAL']),
    
    goToAccount() {
      if (this.$route.path !== '/account') {
        this.$router.push('/account')
      }
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ 
          name: 'Collection', 
          query: { search: this.searchQuery.trim() } 
        })
        this.searchQuery = ''
      }
    },
    openAuthModal() {
      this.SET_AUTH_MODAL({ show: true, context: 'login' })
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: auto;
}

.nav {
  display: flex;
  align-items: center;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-container input {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 200px;
}

.login-btn {
  padding: 8px 20px;
  background: #8B8A4A;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.user-circle {
  width: 40px;
  height: 40px;
  background: #8B8A4A;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>