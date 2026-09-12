import { Router } from 'express';
import {
  createTrailer,
  updateTrailer,
  deleteTrailer,
  getTrailers,
  getTrailerById,
  searchTrailers
} from '../controllers/trailerController.js';

const traillerRouter   = Router();

// CRUD routes for trailers
traillerRouter.post('/', createTrailer);
traillerRouter.post('/:id', updateTrailer);
traillerRouter.delete('/:id', deleteTrailer);
traillerRouter.post('/list/get_trailers', getTrailers);
traillerRouter.get('/:id', getTrailerById);
traillerRouter.post("/list/search",searchTrailers)

export default traillerRouter ;