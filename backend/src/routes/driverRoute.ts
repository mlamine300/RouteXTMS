import { Router } from 'express';
import { createDriver, deleteDriver, forcePlugTruckTodriver, getDriverById, getDrivers, searchDrivers, simplePlugTruckTodriver, updateDriver } from '../controllers/driverController.js';


const driverRouter = Router();

// CRUD routes for Drivers
driverRouter.post('/', createDriver);
 driverRouter.post('/:id', updateDriver);
 driverRouter.delete('/:id', deleteDriver);
 driverRouter.post('/list/get_drivers', getDrivers);
 driverRouter.post('/list/search', searchDrivers);
 driverRouter.post('/plug/simple', simplePlugTruckTodriver);
 driverRouter.post('/plug/force', forcePlugTruckTodriver);
 driverRouter.get('/:id', getDriverById);

export default driverRouter;