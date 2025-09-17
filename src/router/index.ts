import { Router } from 'express';
import playerRoutes from './player.routes';
import classificationRoutes from './classification.route';
import towerRoutes from './tower.routes';

const router = Router();

router.use('/player', playerRoutes);
router.use('/classification', classificationRoutes);
router.use('/tower', towerRoutes);

export default router;
