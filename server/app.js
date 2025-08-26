const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Lead = require('./src/models/Lead.js'); 
const cors = require('cors')
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

dotenv.config();
app.use(cors(corsOptions));

const PORT = 8080;
const DB_URL = process.env.atlas_URL;


mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true, 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) => {
  res.send('Hello from Express + MongoDB!');
});

app.use('/api/leads', require('./src/routes/leadRoutes.js'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
