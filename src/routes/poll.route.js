import { Router } from 'express';
import schemaPoll from '../schemas/poll.schema';

const pollRouter = Router();

pollRouter.post('/poll', validateSchema(schemaPoll), postPoll);
pollRouter.get('/poll', validateSchema(schemaPoll), getPoll);

export default pollRouter;