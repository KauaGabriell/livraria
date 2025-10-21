import mongoose from 'mongoose';
import bcrypt, { genSaltSync } from 'bcrypt';
import {userValidatorSchemaRegister, userValidatorSchemaLogin} from '../utils/userValidator.js';

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
    this.registerValidation();
    await this.userExist(); //Verifica se o usuário já existe.

    if (this.errors.length > 0) return; //Verifica se tem alguma erro na nossa criação, se tiver para a aplicação.

    //Adicionando um hash na senha com bcrypt
    const salt = genSaltSync();
    this.body.password = await bcrypt.hash(this.body.password, salt);

    this.user = await userModel.create(this.body); //Cria o usuário.
  }

  //Verificação de duplicidade de usuário.
  async userExist() {
    const user = await userModel.findOne({ email: this.body.email });
    if (user) {
      this.errors.push('Usuário Já Cadastrado');
    }
  }

  //Validação dos dados de entrada.
  registerValidation() {
    const validationResult = userValidatorSchemaRegister.validate(this.body); //Usando Joi para validar

    if (validationResult.error) {
      for (let i = 0; i < validationResult.error.details.length; i++) {
        this.errors.push(validationResult.error.details[i].message); //Adicionando mensagem de erro da validação para o array de erros.
      }
      return;
    }
  }

  loginValidation(){
    const validationResult = userValidatorSchemaLogin.validate(this.body);

    if(validationResult.error){
      for(let i = 0; i < validationResult.error.details.length; i++){
        this.errors.push(validationResult.error.details[i].message);
      }
      return;
    }
  }

  async login() {
    this.loginValidation(); //Valida Campos enviados no login;
    
    if (this.errors.length > 0) return; //Retorna se tiver algum erro já na validação dos campos
    
    const user = await userModel.findOne({ email: this.body.email }).select('+password');
    

    if (user) {
      this.user = user;
      const passwordCompare = await bcrypt.compare(this.body.password, this.user.password);
      if (!passwordCompare) {
        this.errors.push('Senha Incorreta! Verifique as credenciais');
      }
    } else {
      this.errors.push(
        'Usuário não encontrado, verifique as credenciais ou faça seu registro',
      );
    }
    
  }
}

export default User;
