import express from 'express';
const router = express.Router();
import { shortenUrl, redirectUrl } from '../controllers/url.controller.js';

// Shorten URL
router.post('/shorten', shortenUrl);

// Redirect to long URL
router.get('/:shortUrl', redirectUrl);

export default router;