import { Router } from 'express';
import { getUserProfile, loginUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';


const authRouter = Router();

// CRUD routes for xs
authRouter.post('/login', loginUser);
;
authRouter.get('/profile',protect, getUserProfile);


export default authRouter;