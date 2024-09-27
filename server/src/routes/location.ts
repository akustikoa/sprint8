import { Router } from "express";
import { deleteLocation, getLocation, getLocations, postLocation, updateLocation } from "../controllers/location";

const router = Router();

router.get('/', getLocations);
router.get('/:id', getLocation)
router.post('/', postLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
