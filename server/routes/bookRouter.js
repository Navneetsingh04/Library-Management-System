import {isAuthenticated,isAuthorized } from '../middlewares/authMiddleware.js';
import {addBooks, getBooks, deleteBooks} from '../controllers/bookController.js';
import express from 'express';

const router = express.Router();

router.post('/admin/add', isAuthenticated,isAuthorized("Admin"),addBooks);
router.get('/all', isAuthenticated, getBooks);    
router.delete('/delete/:id', isAuthenticated, isAuthorized("Admin"), deleteBooks);

export default router;