const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const { authRoutes, userRoutes } = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Trail API running');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
