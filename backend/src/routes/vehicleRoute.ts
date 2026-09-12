import { Router } from 'express';
import {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicles,
  getVehicleById,
  searchVehicle
} from '../controllers/vehicleController.js';

const vehicleRouter = Router();

// CRUD routes for Vehicles
vehicleRouter.post('/', createVehicle);
vehicleRouter.post('/:id', updateVehicle);
vehicleRouter.delete('/:id', deleteVehicle);
vehicleRouter.post('/list/get_trucks', getVehicles);
vehicleRouter.post('/list/search', searchVehicle);
vehicleRouter.get('/:id', getVehicleById);

export default vehicleRouter;