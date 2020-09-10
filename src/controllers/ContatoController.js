const Model = require('../models/ContatoModel');

exports.index = (req, res) => {
	res.render('contato');
	console.log(req.flash['errors']);
};

exports.register = async (req, res) => {
	try{
		const contato = new Model(req.body);
		await contato.register();
		
		if(contato.errors.length > 0){
			console.log(contato.errors);
			req.flash('errors', contato.errors);
			req.session.save(() => res.redirect('back'));
			return;
		};

		req.flash('success', 'Contato Registrado com sucesso!');
		req.session.save(() => res.redirect('back'));
		return;	
	}catch(e){
		return res.render('error', {error: e});
	}
};