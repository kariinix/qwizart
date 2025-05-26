import axios from 'axios'

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  authModal: false,
  authModalContext: 'login',
  pendingReview: null
}

const getters = {
  isAuthenticated: state => !!state.token,
  currentUser: state => state.user,
  showAuthModal: state => state.authModal,
  authModalContext: state => state.authModalContext
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  CLEAR_AUTH(state) {
    state.token = null
    state.user = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
SET_AUTH_MODAL(state, { show, context = 'login', review = null }) {
  state.authModal = show
  state.authModalContext = context
  state.pendingReview = review
},
  UPDATE_USER(state, userData) {
    state.user = { ...state.user, ...userData }
    localStorage.setItem('user', JSON.stringify(state.user))
  }
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, credentials)
      commit('SET_TOKEN', response.data.token)
      commit('SET_USER', response.data.user)
      return response.data.user
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Невірний email або пароль')
      }
      throw new Error(error.response?.data?.message || 'Помилка при вході. Спробуйте пізніше.')
    }
  },

  async register({ commit }, userData) {
    try {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/register`, userData)
      commit('SET_TOKEN', response.data.token)
      commit('SET_USER', response.data.user)
      return response.data.user
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error('Користувач з таким email вже існує')
      }
      throw new Error(error.response?.data?.message || 'Помилка при реєстрації')
    }
  },

  async checkAuth({ commit, state }) {
    if (!state.token) {
      console.log('No token found');
      return false;
    }

    try {
      console.log('Checking auth with token:', state.token);
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      
      console.log('Auth check response:', response.data);
      if (response.data.user) {
        commit('SET_USER', response.data.user);
        return true;
      }
      commit('CLEAR_AUTH');
      return false;
    } catch (error) {
      console.error('Auth check error:', error);
      commit('CLEAR_AUTH');
      return false;
    }
  },

  logout({ commit }) {
    commit('CLEAR_AUTH')
  },

   async updateUser({ commit, state }, userData) {
    try {
      console.log('Updating user with data:', userData) 
      const response = await axios.put(
        `${process.env.VUE_APP_API_URL}/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      commit('UPDATE_USER', response.data.user)
      return response.data.user
    } catch (error) {
      console.error('Update user error:', error) 
      throw error
    }
  },

async deleteUser({ state, commit }) {
  try {
    await axios.delete(`${process.env.VUE_APP_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
    commit('CLEAR_AUTH')
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при видаленні акаунту')
  }
}
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}