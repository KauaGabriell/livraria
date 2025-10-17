import User from '../models/userModel.js';

export async function userCreate(req, res) {
  try {
    const user = new User(req.body);
    await user.register();

     
    res.status(201).json({name: user.user.name, email: user.user.email});
  } catch (error) 
  {
   return res.status(501).json({message: 'Não foi possível cadastrar seu usuário.'})
  }
}
