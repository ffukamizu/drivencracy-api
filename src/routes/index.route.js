import { Router } from 'express';
import choiceRouter from './choice.route';
import pollRouter from './poll.route';

const router = Router();

router.use(choiceRouter);
router.use(pollRouter);

export default router;
