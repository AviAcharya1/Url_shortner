import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import urlRoutes from './src/routes/url.routes.js';
import { atlasUri } from './src/config/db.config.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// Connect to MongoDB Atlas
mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Atlas connection successful'))
  .catch(err => console.error(err));

// Routes
app.use('/api', urlRoutes);

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});