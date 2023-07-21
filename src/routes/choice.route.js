import { Router } from 'express';
import schemaChoice from '../schemas/choice.schema';

const choiceRouter = Router();

choiceRouter.post('/poll', validateSchema(schemaChoice), postPoll);
choiceRouter.get('/poll', validateSchema(schemaChoice), getPoll);

export default choiceRouter;