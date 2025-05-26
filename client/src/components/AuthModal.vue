<template>
  <div class="auth-modal" v-if="showAuthModal">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <span class="close-btn" @click="closeModal">&times;</span>
      
      <div v-if="currentForm === 'login'" class="form-container">
        <h2>Вхід</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              v-model="loginEmail"
              required
              @input="clearError('login')"
            >
            <span class="error-message" v-if="errors.loginEmail">{{ errors.loginEmail }}</span>
          </div>
          <div class="form-group">
            <label for="login-password">Пароль</label>
            <input
              type="password"
              id="login-password"
              v-model="loginPassword"
              required
              minlength="6"
              @input="clearError('login')"
            >
            <span class="error-message" v-if="errors.loginPassword">{{ errors.loginPassword }}</span>
          </div>
          <button type="submit" class="submit-btn">Увійти</button>
        </form>
        <p class="form-switch">Ще не маєте акаунту? <span @click="switchToRegister">Зареєструватись</span></p>
      </div>

      <div v-else class="form-container">
        <h2>Реєстрація</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="register-name">Ім'я</label>
            <input
              type="text"
              id="register-name"
              v-model="registerName"
              required
              minlength="2"
              @input="clearError('register')"
            >
            <span class="error-message" v-if="errors.registerName">{{ errors.registerName }}</span>
          </div>
          <div class="form-group">
            <label for="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              v-model="registerEmail"
              required
              @input="clearError('register')"
            >
            <span class="error-message" v-if="errors.registerEmail">{{ errors.registerEmail }}</span>
          </div>
          <div class="form-group">
            <label for="register-password">Пароль</label>
            <input
              type="password"
              id="register-password"
              v-model="registerPassword"
              required
              minlength="6"
              @input="clearError('register')"
            >
            <span class="error-message" v-if="errors.registerPassword">{{ errors.registerPassword }}</span>
          </div>
          <button type="submit" class="submit-btn">Зареєструватись</button>
        </form>
        <p class="form-switch">Уже зареєстровані? <span @click="switchToLogin">Увійти</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AuthModal',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      errors: {}
    }
  },
  computed: {
    ...mapGetters('auth', ['showAuthModal', 'authModalContext']),
    currentForm() {
      return this.authModalContext || 'login'
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    ...mapMutations('auth', ['SET_AUTH_MODAL']),
    
    closeModal() {
      this.SET_AUTH_MODAL({ show: false })
      this.resetForm()
    },
    
    resetForm() {
      this.loginEmail = ''
      this.loginPassword = ''
      this.registerName = ''
      this.registerEmail = ''
      this.registerPassword = ''
      this.errors = {}
    },
    
    switchToRegister() {
      this.$store.commit('auth/SET_AUTH_MODAL', { show: true, context: 'register' })
    },
    
    switchToLogin() {
      this.$store.commit('auth/SET_AUTH_MODAL', { show: true, context: 'login' })
    },
    
    clearError(form) {
      if (form === 'login') {
        this.errors.loginEmail = ''
        this.errors.loginPassword = ''
      } else {
        this.errors.registerName = ''
        this.errors.registerEmail = ''
        this.errors.registerPassword = ''
      }
    },
    
    async handleLogin() {
  try {
    await this.login({
      email: this.loginEmail,
      password: this.loginPassword
    })
    this.closeModal()
    if (this.$store.state.auth.pendingReview) {
      await this.$axios.post('/reviews', {
        text: this.$store.state.auth.pendingReview.text
      }, {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.token}`
        }
      })
      this.$store.commit('auth/SET_AUTH_MODAL', { show: false, context: 'login', review: null })
      this.$router.push('/account')
    } else if (this.$route.path !== '/account') {
      this.$router.push('/account')
    }
        
      } catch (error) {
        console.error('Login error:', error)
        if (error.message.includes('Невірний email або пароль')) {
          this.errors.loginPassword = 'Невірний email або пароль'
        } else if (error.response && error.response.status === 401) {
          this.errors.loginPassword = 'Невірний email або пароль'
        } else {
          this.errors.loginPassword = 'Сталася помилка при вході. Спробуйте пізніше.'
        }
      }
    },
    
async handleRegister() {
  this.errors = {}
  try {
    await this.register({
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword
    })
    this.closeModal()
    if (this.$store.state.auth.pendingReview) {
      await this.$axios.post('/reviews', {
        text: this.$store.state.auth.pendingReview.text
      }, {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.token}`
        }
      })
      this.$store.commit('auth/SET_AUTH_MODAL', { show: false, context: 'login', review: null })
      this.$router.push('/account')
    } else if (this.$route.path !== '/account') {
      this.$router.push('/account')
    }
        
      } catch (error) {
        console.error('Registration error:', error)
        if (error.message.includes('Користувач з таким email вже існує')) {
          this.errors.registerEmail = 'Користувач з таким email вже існує'
        } else if (error.response && error.response.status === 400) {
          this.errors.registerEmail = 'Користувач з таким email вже існує'
        } else {
          this.errors.registerEmail = 'Сталася помилка при реєстрації. Спробуйте пізніше.'
        }
      }
    }
  }
}
</script>

<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  z-index: 2;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
}

.form-container h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #8B8A4A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #6b6a3a;
}

.form-switch {
  text-align: center;
  margin-top: 20px;
}

.form-switch span {
  color: #8B8A4A;
  cursor: pointer;
  text-decoration: underline;
}
</style>