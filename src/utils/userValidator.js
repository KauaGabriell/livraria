import joi from 'joi';

export const userValidatorSchema = new joi.object({
    name: joi.string().required().min(3).max(60),
    email: joi.string().email(),
    password: joi.string().required().min(3).max(30)
})

export default userValidatorSchema;