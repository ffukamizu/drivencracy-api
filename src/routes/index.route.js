import { Router } from 'express';
import choiceRouter from './choice.route.js';
import pollRouter from './poll.route.js';

const router = Router();

router.use(choiceRouter);
router.use(pollRouter);

export default router;
