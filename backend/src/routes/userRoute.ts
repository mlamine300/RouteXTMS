import { Router } from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById
} from '../controllers/userController.js'

const userRouter = Router();

// CRUD routes for users
userRouter.post('/', createUser);
userRouter.post('/:id', updateUser);
userRouter.post('/delete/:id', deleteUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);

export default userRouter;