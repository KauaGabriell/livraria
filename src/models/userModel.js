import mongoose from 'mongoose';
import bcrypt, { genSaltSync } from 'bcrypt';

//Criando Schema do Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

//Model do Mongoose
const userModel = mongoose.model('User', userSchema);

//Classe User
class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  //Método para cadastrar/criar um usuário.
  async register() {
    await this.userExist();  //Verifica se o usuário já existe.

    if(this.errors.length > 0) return //Verifica se tem alguma erro na nossa criação, se tiver para a aplicação.

    //Adicionando um hash na senha com bcrypt
    const salt = genSaltSync();
    this.body.password = await bcrypt.hash(this.body.password, salt);

    this.user = await userModel.create(this.body); //Cria o usuário.
  }

  //Método para verificar se o usuário existe.
  async userExist() {
    const user = await userModel.findOne({email: this.body.email});
    if(user){
        this.errors.push("Usuário Já Cadastrado");
    }
  }

  
}

export default User;
