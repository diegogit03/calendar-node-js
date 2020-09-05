const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login',LoginSchema);

class Login{
	constructor(body){
		this.body = body;
		this.errors = [];
		this.user = null;
	}

	async register(){
		this.valida();
		if(this.errors.length > 0) return;

		await this.userExists();

		if(this.errors.length > 0) return;

		try{
			const salt = bcrypt.genSaltSync();
			this.body.password = bcrypt.hashSync(this.body.password, salt);
			this.user = await LoginModel.create(this.body);
		}catch(e){
			console.log(e);
		}
		
	}

	async userExists(){
		const user = await LoginModel.findOne({email: this.body.email});
		if (user) this.errors.push('Usuario já existe!');
	}

	valida(){
		this.cleanUp();

		if(!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');

		if(this.body.password.length < 3 || this.body.password.length > 50){
			this.errors.push('Senha precisa ter menos de 50 e mais de 3 caracteres');
		};
	}

	cleanUp(){
		for(const key in this.body){
			if(typeof this.body[key] !== 'string'){
				this.body[key] = '';
			};
		};

		this.body = {
			email: this.body.email,
			password: this.body.password
		};
	}
}

module.exports = Login;