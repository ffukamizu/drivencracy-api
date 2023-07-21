import { Router } from 'express';
import schemaChoice from '../schemas/choice.schema.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';

const choiceRouter = Router();

choiceRouter.post('/choice', validateSchema(schemaChoice), postChoice);
choiceRouter.get('/choice', validateSchema(schemaChoice), getChoice);

export default choiceRouter;