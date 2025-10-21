import User from '../models/userModel.js';

export function homeRegister(req, res){
  res.render('register');
}

export function homeLogin(req, res){
  res.render('login');
}


//User Register
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

//User Login.
export async function userLogin(req, res){
  try {
    const user = new User(req.body);
    await user.login();
    console.log(user.errors);
    
    res.status(200).json(user.user);
  } catch (error) {
    res.status(501).json({message: "Não foi possível realizar o login"});
  }
}