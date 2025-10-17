import User from '../models/userModel.js';

export async function userCreate(req, res) {
  try {
    const user = new User(req.body);
    await user.register();

    res.status(201).json(user.body);
  } catch (error) 
  {
   return res.status(501).json({message: 'Não foi possível cadastrar seu usuário.'})
  }
}
