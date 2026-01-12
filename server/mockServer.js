import express from 'express';
import cors from 'cors';
import mockData from './mockData.json' assert { type: 'json' };

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/price-offers', (req, res) => {
  res.json(mockData);
});

app.listen(3001, () => {
  console.log('Mock server running on port 3001');
});