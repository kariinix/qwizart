<template>
  <div class="account-wrapper">
    <div class="account-header">
      <router-link to="/" class="back-arrow">←</router-link>
      <h1>Налаштування акаунту</h1>
    </div>
    
    <div class="account-container">
      <div class="sidebar">
        <div :class="['sidebar-item', activeTab === 'personal' && 'active']" 
             @click="activeTab = 'personal'">Особиста інформація</div>
        <div :class="['sidebar-item', activeTab === 'reviews' && 'active']" 
             @click="activeTab = 'reviews'">Мої відгуки</div>
        <div :class="['sidebar-item', 'danger', activeTab === 'delete' && 'active']" 
             @click="activeTab = 'delete'">Видалити акаунт</div>
        <div class="sidebar-item logout" @click="logout">Вихід</div>
      </div>
      
      <div class="account-content">
        <div v-if="activeTab === 'personal'">
          <h2>Особиста інформація</h2>
          <div class="profile">
            <div class="avatar-container">
              <div v-if="!user.photo" class="avatar">{{ userInitial }}</div>
              <img v-else :src="userPhotoUrl" class="avatar-photo" alt="Profile Photo">
            </div>
            <div>
              <div class="label">Фото профілю</div>
              <label class="edit" @click="changePhoto">Натисніть щоб змінити</label>
              <input type="file" ref="photoInput" style="display: none" 
                     accept="image/*" @change="handlePhotoUpload">
              <button v-if="user.photo" class="remove-photo-btn" @click="removePhoto">
                Видалити фото
              </button>
            </div>
          </div>
          <div class="info"><span>Ім'я</span><span>{{ user.name }}</span></div>
          <div class="info"><span>Email</span><span>{{ user.email }}</span></div>
          <div class="edit" @click="startEditing">Натисніть щоб змінити</div>
        </div>
        
        <div v-else-if="activeTab === 'reviews'">
          <h2>Мої відгуки</h2>
          <div v-if="reviews.length === 0" class="no-reviews">
            Ви поки не залишили ні одного відгуку
          </div>
          
          <div v-else>
<div v-for="(review, index) in reviews" :key="review._id" class="review-card">
  <div class="review-header">
    <div v-if="user.photo" class="avatar-circle">
      <img :src="userPhotoUrl" class="review-avatar" alt="User Photo" />
    </div>
    <div v-else class="avatar-circle">{{ userInitial }}</div>
    <strong>{{ user.name }}</strong>
                <div class="review-actions">
                  <button class="edit-btn" @click="startEditReview(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </button>
                  <button class="delete-btn" @click="deleteReview(review._id, index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div v-if="editingReviewIndex === index" class="review-edit">
                <textarea v-model="editingReviewText" class="review-textarea"></textarea>
                <div class="review-actions">
                  <button class="save-btn" @click="saveReviewEdit(review._id, index)">
                    Зберегти
                  </button>
                  <button class="cancel-btn" @click="cancelReviewEdit">
                    Скасувати
                  </button>
                </div>
              </div>
              <div v-else class="review-text">{{ review.text }}</div>
              
              <div class="review-date">{{ formatDate(review.createdAt) }}</div>
            </div>
          </div>
        </div>
  
        <div v-else-if="activeTab === 'delete'">
          <h2>Видалити акаунт</h2>
          <p>Це незворотня дія!</p>
          <p>Справді видалити всі дані про ваш обліковий запис із сайту?</p>
          <button class="danger-btn" @click="deleteAccount">Я розумію і хочу видалити</button>
        </div>
      </div>
    </div>
  
    <div v-if="editing" class="edit-modal">
      <div class="edit-modal-content">
        <div class="edit-modal-header">
          <h3>Редагування профілю</h3>
          <button class="close-btn" @click="cancelEditing">&times;</button>
        </div>
        <div class="edit-modal-body">
          <div class="form-group">
            <label>Ім'я</label>
            <input type="text" v-model="editData.name" class="form-input">
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="editData.email" class="form-input">
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label>Пароль</label>
            <input type="password" v-model="editData.password" class="form-input" 
                   placeholder="Введіть новий пароль (залиште порожнім, щоб не змінювати)">
            <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          </div>
        </div>
        <div class="edit-modal-footer">
          <button class="btn btn-secondary" @click="cancelEditing">Скасувати</button>
          <button class="btn btn-primary" @click="saveChanges">Зберегти зміни</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      activeTab: 'personal',
      editing: false,
      editData: {
        name: '',
        email: '',
        password: '',
        photo: null
      },
      errors: {},
      reviews: [],
      editingReviewIndex: -1,
      editingReviewText: '',
      photoFile: null
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/currentUser'] || {}
    },
    userInitial() {
      return this.user.name ? this.user.name.charAt(0).toUpperCase() : ''
    },
userPhotoUrl() {
const baseUrl = process.env.VUE_APP_API_URL.replace('/api', '');
return `${baseUrl}/uploads/${this.user.photo}`;
}
  },
  async created() {
  try {
    // Додайте перевірку авторизації
    if (!this.$store.getters['auth/isAuthenticated']) {
      await this.$store.dispatch('auth/checkAuth')
    }
    
    await this.fetchUserData()
    await this.fetchUserReviews()
  } catch (error) {
    console.error('Account init error:', error)
    this.$router.push('/')
  }
},
  methods: {
    async fetchUserData() {
      try {
        await this.$store.dispatch('auth/checkAuth')
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    
    async fetchUserReviews() {
      try {
        if (!this.$store.getters['auth/isAuthenticated']) return
        
        const response = await this.$axios.get('/reviews', {
          headers: {
            Authorization: `Bearer ${this.$store.state.auth.token}`
          }
        })
        this.reviews = response.data
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    },
    
    startEditing() {
      this.editData = {
        name: this.user.name,
        email: this.user.email,
        password: '',
        photo: this.user.photo
      }
      this.editing = true
    },
    
    cancelEditing() {
      this.editing = false
      this.errors = {}
    },
    
    async saveChanges() {
  this.errors = {};
  
  try {
    const formData = new FormData();
    formData.append('name', this.editData.name);
    formData.append('email', this.editData.email);
    
    if (this.editData.password) {
      formData.append('password', this.editData.password);
    }
    
    if (this.photoFile) {
      formData.append('photo', this.photoFile);
    }

    console.log('Sending update with:', {
      name: this.editData.name,
      email: this.editData.email,
      hasPassword: !!this.editData.password,
      hasPhoto: !!this.photoFile
    });

    await this.$store.dispatch('auth/updateUser', formData);
    this.editing = false;
    this.photoFile = null;
    alert('Зміни успішно збережено!');
    await this.fetchUserData();
  } catch (error) {
    console.error('Update error:', error);
    if (error.response?.data?.errors) {
      this.errors = error.response.data.errors;
    } else {
      alert(`Помилка при оновленні: ${error.message || 'Сервер не відповідає'}`);
    }
  }
},
    
    changePhoto() {
      this.$refs.photoInput.click()
    },
    
handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    console.log('Selected file:', file.name, file.size);
    if (file.size > 5 * 1024 * 1024) {
      alert('Фото занадто велике (максимум 5MB)');
      return;
    }
    this.photoFile = file;
    this.editData.photo = URL.createObjectURL(file);
  }
},
    
    async removePhoto() {
      try {
        const formData = new FormData()
        formData.append('removePhoto', 'true')

        await this.$store.dispatch('auth/updateUser', formData)
        this.photoFile = null
        await this.fetchUserData()
        alert('Фото успішно видалено!')
      } catch (error) {
        console.error('Error removing photo:', error)
        alert('Помилка при видаленні фото: ' + (error.response?.data?.message || 'Сервер не відповідає'))
      }
    },
    
    async deleteAccount() {
      if (confirm('Ви впевнені, що хочете видалити свій акаунт? Ця дія незворотна.')) {
        try {
          await this.$store.dispatch('auth/deleteUser')
          this.$router.push('/')
          alert('Ваш акаунт успішно видалено')
        } catch (error) {
          console.error('Error deleting account:', error)
          alert('Помилка при видаленні акаунту: ' + (error.response?.data?.message || 'Сервер не відповідає'))
        }
      }
    },
    
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('uk-UA')
    },
    
    startEditReview(index) {
      this.editingReviewIndex = index
      this.editingReviewText = this.reviews[index].text
    },
    
    cancelReviewEdit() {
      this.editingReviewIndex = -1
      this.editingReviewText = ''
    },
    
    async saveReviewEdit(reviewId, index) {
      try {
        const response = await this.$axios.put(
          `/reviews/${reviewId}`,
          { text: this.editingReviewText },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`
            }
          }
        )
        
        this.reviews[index] = response.data
        this.editingReviewIndex = -1
        this.editingReviewText = ''
        alert('Відгук успішно оновлено!')
      } catch (error) {
        console.error('Error updating review:', error)
        alert('Помилка при оновленні відгуку: ' + (error.response?.data?.message || 'Сервер не відповідає'))
      }
    },
    
    async deleteReview(reviewId, index) {
      if (confirm('Ви впевнені, що хочете видалити цей відгук?')) {
        try {
          await this.$axios.delete(`/reviews/${reviewId}`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`
            }
          })
          
          this.reviews.splice(index, 1)
          alert('Відгук успішно видалено!')
        } catch (error) {
          console.error('Error deleting review:', error)
          alert('Помилка при видаленні відгуку: ' + (error.response?.data?.message || 'Сервер не відповідає'))
        }
      }
    }
  }
}
</script>

<style scoped>
.account-wrapper {
  padding: 130px 20px;
}

.account-container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.sidebar {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar-item {
  padding: 10px;
  cursor: pointer;
  color: #444;
  border-radius: 5px;
  transition: all 0.3s;
}

.sidebar-item:hover {
  background: #f0f0f0;
}

.sidebar-item.active {
  font-weight: bold;
  color: #8B8A4A;
  background: rgba(139, 138, 74, 0.1);
}

.sidebar-item.danger {
  color: #ff4444;
}

.sidebar-item.logout {
  margin-top: 20px;
  color: #444;
}

.account-content {
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #8B8A4A;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 32px;
}

.avatar-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.info span:first-child {
  font-weight: 500;
  color: #666;
}

.edit {
  color: #8B8A4A;
  cursor: pointer;
  font-size: 14px;
  margin-top: 8px;
  display: inline-block;
}

.remove-photo-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.review-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.avatar-circle {
  background: #8B8A4A;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.review-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.edit-btn {
  color: #8B8A4A;
}

.delete-btn {
  color: #ff4444;
}

.review-text {
  line-height: 1.6;
  margin-bottom: 10px;
}

.review-date {
  color: #999;
  font-size: 12px;
}

.review-edit {
  margin-top: 10px;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.review-textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  margin-bottom: 10px;
}

.save-btn, .cancel-btn {
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-btn {
  background: #8B8A4A;
  color: white;
  border: none;
  margin-right: 10px;
}

.cancel-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
}

.danger-btn {
  background: #ff4444;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

/* Модальне вікно редагування */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.edit-modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-modal-header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.edit-modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.edit-modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background: #8B8A4A;
  color: white;
  border: none;
}

.btn-secondary {
  background: white;
  border: 1px solid #ddd;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.no-reviews {
  padding: 20px;
  text-align: center;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
}

.account-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.back-arrow {
  font-size: 24px;
  margin-right: 15px;
  color: #8B8A4A;
  text-decoration: none;
}

.account-header h1 {
  margin: 0;
  font-size: 24px;
}

@media (max-width: 768px) {
  .account-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .account-content {
    width: 100%;
  }
}
</style>