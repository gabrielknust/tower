import { Router } from 'express';
import playerRoutes from './player.routes';

const router = Router();

router.use('/player', playerRoutes);

export default router;
