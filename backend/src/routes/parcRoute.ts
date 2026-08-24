import { Router } from 'express';
import {
  createParc,
  updateParc,
  deleteParc,
  getParcs,
  getParcById,
  searchParcs
} from '../controllers/parcController.js';

const parcRouter = Router();

// CRUD routes for parcs
parcRouter.post('/', createParc);
parcRouter.post('/:id', updateParc);
parcRouter.post('/delete/:id', deleteParc);
parcRouter.post('/list/search', searchParcs);
parcRouter.get('/', getParcs);
parcRouter.get('/:id', getParcById);

export default parcRouter;