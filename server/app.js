const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path') 
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const reviewRoutes = require('./routes/review.routes');

dotenv.config()

const app = express()

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:5052',
    process.env.VUE_APP_CLIENT_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/api', (req, res) => {
  res.send('API is working!');
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
