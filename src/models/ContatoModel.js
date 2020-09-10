const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: false, default: '' },
	email: { type: String, required: false, default: '' },
	telephone: { type: String, required: false, default: '' },
	createdAt: { type: Date, required: false, default: Date.now() }
});


const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
	this.body = body;
	this.errors = [];
	this.contato = null;
};

Contato.findById = async function(id){
	const contact = await ContatoModel.findById(id);
	return contact;
};

Contato.prototype.register = async function(){
	this.valida();

	if(this.errors.length > 0) return;
	this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function(){
	this.cleanUp();

	if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
	if (!this.body.name) this.errors.push('Nome é um campo obrigatório!');
	if (!this.body.email && !this.body.telephone) this.errors.push('É obrigatório preencher email ou telefone');
};

Contato.prototype.cleanUp = function(){
	for(const key in this.body){
		if(typeof this.body[key] !== 'string'){
			this.body[key] = '';
		};
	};

	this.body = {
		name: this.body.name,
		surname: this.body.surname,
		email: this.body.email,
		telephone: this.body.telephone,
	};
};




module.exports = Contato;