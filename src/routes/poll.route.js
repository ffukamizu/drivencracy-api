import { Router } from 'express';
import schemaPoll from '../schemas/poll.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import { postPoll, getPoll } from '../controllers/poll.controller.js';

const pollRouter = Router();

pollRouter.post('/poll', validateSchema(schemaPoll), postPoll);
pollRouter.get('/poll', validateSchema(schemaPoll), getPoll);

export default pollRouter;