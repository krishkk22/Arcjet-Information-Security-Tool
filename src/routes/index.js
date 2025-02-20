import express from 'express';
import { getExample } from '../controllers/example.controller.js';

const router = express.Router();

router.get('/example', getExample);

export default router;