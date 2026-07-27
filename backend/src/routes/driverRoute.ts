import { Router } from 'express';
import { createDriver, deleteDriver, getDriverById, getDrivers, updateDriver } from '../controllers/driverController.js';


const driverRouter = Router();

// CRUD routes for Drivers
driverRouter.post('/', createDriver);
 driverRouter.post('/:id', updateDriver);
 driverRouter.delete('/:id', deleteDriver);
 driverRouter.post('/list/get_drivers', getDrivers);
 driverRouter.get('/:id', getDriverById);

export default driverRouter;