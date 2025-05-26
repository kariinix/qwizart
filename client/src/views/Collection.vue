<template>
  <main class="collection-page">
    <section class="collection-hero">
      <div class="container">
        <h1>Колекція «Punk Death Note»</h1>
        <p>Унікальні NFT з персонажами аніме у панк стилі</p>
      </div>
    </section>

    <section class="collection-content">
      <div class="container">
        <div class="collection-filters">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Пошук NFT..." 
              v-model="searchQuery"
              @input="filterCollection"
            >
            <button class="search-btn">🔍</button>
          </div>
          <div class="sort-options">
            <select v-model="sortOption" @change="sortCollection">
              <option value="newest">Спочатку нові</option>
              <option value="oldest">Спочатку старі</option>
              <option value="price-high">Ціна: від високої</option>
              <option value="price-low">Ціна: від низької</option>
            </select>
          </div>
        </div>

        <div class="collection-grid">
          <div 
            class="nft-card" 
            v-for="nft in filteredCollection" 
            :key="nft.id"
            @click="openNFTModal(nft)"
          >
            <div class="nft-image">
              <img :src="nft.image" :alt="nft.title">
              <div class="nft-price">{{ nft.price }} ETH</div>
            </div>
            <div class="nft-info">
              <h3>{{ nft.title }}</h3>
              <p>{{ nft.description }}</p>
              <div class="nft-actions">
                <button class="buy-btn" @click.stop="handleBuy(nft)">Придбати</button>
                <button class="details-btn" @click.stop="openNFTModal(nft)">Деталі</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="nft-modal" v-if="selectedNFT" @click.self="selectedNFT = null">
      <div class="modal-content">
        <button class="close-modal" @click="selectedNFT = null">&times;</button>
        <div class="modal-grid">
          <div class="modal-image">
            <img :src="selectedNFT.image" :alt="selectedNFT.title">
          </div>
          <div class="modal-info">
            <h2>{{ selectedNFT.title }}</h2>
            <p class="nft-description">{{ selectedNFT.longDescription }}</p>
            <div class="nft-meta">
              <div class="meta-item">
                <span class="meta-label">Автор:</span>
                <span class="meta-value">Karina</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Ціна:</span>
                <span class="meta-value">{{ selectedNFT.price }} ETH</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Дата створення:</span>
                <span class="meta-value">{{ selectedNFT.date }}</span>
              </div>
            </div>
            <button class="buy-btn" @click="handleBuy(selectedNFT)">Придбати NFT</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Collection',
  data() {
    return {
      searchQuery: '',
      sortOption: 'newest',
      selectedNFT: null,
      nftCollection: [
        {
          id: 1,
          title: 'Лайт & Рюк',
          description: 'Головні герої аніме у панк стилі',
          longDescription: 'Це NFT зображує головних героїв аніме "Death Note" - Лайта та Рюка у унікальному панк стилі. Робота виконана у високій якості з увагою до деталей.',
          image: require('../../public/images/death1.png'),
          price: 0.5,
          date: '15.03.2022'
        },
        {
          id: 2,
          title: 'Лайт',
          description: 'Головний герой у панк стилі',
          longDescription: 'NFT з головним героєм аніме "Death Note" - Лайтом у панк стилі. Особлива увага приділена деталям одягу та аксесуарам.',
          image: require('../../public/images/death3.png'),
          price: 0.3,
          date: '20.03.2022'
        },
        {
          id: 3,
          title: 'Лайт & Міса',
          description: 'Двоє головних героїв у панк стилі',
          longDescription: 'Унікальне NFT, що зображує Лайта та Місу з "Death Note" у панк стилі. Композиція підкреслює їхні стосунки в аніме.',
          image: require('../../public/images/death4.png'),
          price: 0.7,
          date: '25.03.2022'
        },
        {
          id: 4,
          title: 'Рюк',
          description: 'Бог смерті у панк стилі',
          longDescription: 'NFT з Рюком - богом смерті з "Death Note". Особливий акцент на крилах та моторошній усмішці персонажа.',
          image: require('../../public/images/death5.png'),
          price: 0.6,
          date: '10.04.2022'
        },
        {
          id: 5,
          title: 'Лайт & Рюк (альтернативний)',
          description: 'Альтернативний варіант головних героїв',
          longDescription: 'Альтернативна версія NFT з Лайтом та Рюком. Відрізняється кольоровою гамою та композицією.',
          image: require('../../public/images/death6.png'),
          price: 0.55,
          date: '15.04.2022'
        },
        {
          id: 6,
          title: 'Міса',
          description: 'Дівчина-ідол у панк стилі',
          longDescription: 'NFT з Місою - дівчиною-ідолом з "Death Note". Стилізація підкреслює її ексцентричний характер.',
          image: require('../../public/images/death7.png'),
          price: 0.4,
          date: '20.04.2022'
        }
      ],
      filteredCollection: []
    }
  },
  created() {
    this.filteredCollection = [...this.nftCollection]
    this.sortCollection()
  },
  methods: {
    filterCollection() {
      if (!this.searchQuery) {
        this.filteredCollection = [...this.nftCollection]
      } else {
        const query = this.searchQuery.toLowerCase()
        this.filteredCollection = this.nftCollection.filter(nft =>
          nft.title.toLowerCase().includes(query) ||
          nft.description.toLowerCase().includes(query)
        )
      }
      this.sortCollection()
    },
    sortCollection() {
      switch (this.sortOption) {
        case 'newest':
          this.filteredCollection.sort((a, b) => new Date(b.date) - new Date(a.date))
          break
        case 'oldest':
          this.filteredCollection.sort((a, b) => new Date(a.date) - new Date(b.date))
          break
        case 'price-high':
          this.filteredCollection.sort((a, b) => b.price - a.price)
          break
        case 'price-low':
          this.filteredCollection.sort((a, b) => a.price - b.price)
          break
        default:
          break
      }
    },
    openNFTModal(nft) {
      this.selectedNFT = nft
      document.body.style.overflow = 'hidden'
    },
    handleBuy(nft) {
      if (!this.$store.getters['auth/isAuthenticated']) {
        this.$store.commit('auth/SET_AUTH_MODAL', true)
        return
      }
      alert(`Ви намагаєтесь придбати NFT "${nft.title}" за ${nft.price} ETH`)
    }
  },
  watch: {
    selectedNFT(val) {
      if (!val) {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>

<style scoped>
.collection-page {
  padding-top: 80px;
}

.collection-hero {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../../public/images/slider1.png');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
}

.collection-hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.collection-hero p {
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.collection-content {
  padding: 60px 0;
}

.collection-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 20px;
}

.search-box {
  flex: 1;
  max-width: 500px;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
}

.search-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.sort-options select {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background: white;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.nft-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.nft-card:hover {
  transform: translateY(-5px);
}

.nft-image {
  position: relative;
}

.nft-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.nft-price {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(139, 138, 74, 0.9);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
}

.nft-info {
  padding: 20px;
}

.nft-info h3 {
  margin-bottom: 10px;
  color: #333;
}

.nft-info p {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.nft-actions {
  display: flex;
  gap: 10px;
}

.buy-btn, .details-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.buy-btn {
  background: #8B8A4A;
  color: white;
}

.buy-btn:hover {
  background: #6b6a3a;
}

.details-btn {
  background: #f0f0f0;
  color: #333;
}

.details-btn:hover {
  background: #ddd;
}

.nft-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 10px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 40px;
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.modal-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.nft-description {
  margin: 20px 0;
  line-height: 1.6;
}

.nft-meta {
  margin: 30px 0;
}

.meta-item {
  margin-bottom: 15px;
  display: flex;
}

.meta-label {
  font-weight: bold;
  min-width: 120px;
  color: #8B8A4A;
}

.modal-info .buy-btn {
  padding: 12px 30px;
  font-size: 16px;
}

@media (max-width: 768px) {
  .collection-filters {
    flex-direction: column;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .modal-grid {
    grid-template-columns: 1fr;
  }
  
  .collection-hero h1 {
    font-size: 36px;
  }
  
  .collection-hero p {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 20px;
  }
  
  .nft-actions {
    flex-direction: column;
  }
  
  .buy-btn, .details-btn {
    width: 100%;
  }
}
</style>