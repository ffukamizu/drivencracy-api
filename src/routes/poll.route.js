import { Router } from 'express';

const pollRouter = Router();

pollRouter.post('/poll', validateSchema(pollSchema), postPoll);

pollRouter.get('/poll', validateSchema(pollSchema), getPoll);