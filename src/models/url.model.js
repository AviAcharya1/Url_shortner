import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String
});

const Url = mongoose.model('Url', urlSchema);

export default Url;