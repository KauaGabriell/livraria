import joi from 'joi';

export const userValidatorSchemaRegister = new joi.object({
    name: joi.string().required().min(3).max(60),
    email: joi.string().email(),
    password: joi.string().required().min(3).max(30)
})

export const userValidatorSchemaLogin = new joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3).max(30)
})

