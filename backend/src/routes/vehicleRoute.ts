import { Router } from 'express';
import {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicles,
  getVehicleById,
  searchTrucks
} from '../controllers/vehicleController.js';

const vehicleRoute = Router();

// CRUD routes for Vehicles
vehicleRoute.post('/', createVehicle);
vehicleRoute.put('/:id', updateVehicle);
vehicleRoute.delete('/:id', deleteVehicle);
vehicleRoute.post('/list/get_trucks', getVehicles);
vehicleRoute.post('/list/search', searchTrucks);
vehicleRoute.get('/:id', getVehicleById);

export default vehicleRoute;