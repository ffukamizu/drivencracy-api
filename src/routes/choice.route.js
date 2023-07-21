import { Router } from 'express';
import schemaChoice from '../schemas/choice.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import { postChoice, postVote } from '../controllers/choice.controller.js';

const choiceRouter = Router();

choiceRouter.post('/choice', validateSchema(schemaChoice), postChoice);
choiceRouter.get('/choice/:id/vote', postVote);

export default choiceRouter;