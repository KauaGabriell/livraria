import mongoose from "mongoose";
import bcrypt, { genSaltSync } from 'bcrypt';

//Criando Schema do Model
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

//Model do Mongoose
const userModel = mongoose.model('User', userSchema);

//Classe User
class User {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    //Método para cadastrar/criar um usuário.
    async register(){
        //Adicionando um hash na senha com bcrypt
        const salt = genSaltSync();
        this.body.password = await bcrypt.hash(this.body.password, salt);

        
        this.user = await userModel.create(this.body);
    }
}

export default User;



