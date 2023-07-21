import Joi from 'joi';

const schemaChoice = Joi.object({
    title: Joi.string().min(1).required(),
});

export default schemaChoice;