import { nanoid } from 'nanoid';
import Url from '../models/url.model.js';

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ longUrl });

    if (!url) {
      // Generate a new short URL
      const shortUrl = nanoid(7); // Adjust the length as needed

      // Save the URL to the database
      url = new Url({ longUrl, shortUrl });
      await url.save();
    }

    res.json({ shortUrl: url.shortUrl });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export  const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};