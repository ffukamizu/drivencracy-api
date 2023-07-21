import { Router } from 'express';
import schemaPoll from '../schemas/poll.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import { postPoll, getPoll, getChoicesList } from '../controllers/poll.controller.js';

const pollRouter = Router();

pollRouter.post('/poll', validateSchema(schemaPoll), postPoll);
pollRouter.get('/poll', validateSchema(schemaPoll), getPoll);
pollRouter.get('/poll/:id/choice', getChoicesList);

export default pollRouter;