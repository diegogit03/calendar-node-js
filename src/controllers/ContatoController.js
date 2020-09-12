const Model = require('../models/ContatoModel');

exports.index = (req, res) => {
	res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
	try{
		const contatoModel = new Model(req.body);
		await contatoModel.register();
		
		if(contatoModel.errors.length > 0){
			req.flash('errors', contatoModel.errors);
			req.session.save(() => res.redirect('back'));
			return;
		};

		req.flash('success', 'Contato Registrado com sucesso!');
		req.session.save(() => res.redirect(`/`));
		return;	
	}catch(e){
		return res.render('error', {error: e});
	}
};

exports.updateIndex = async (req, res) => {
	if(!req.params.id) return res.render('error', { error: {code: '400',message: 'Bad Request'} });
	const contact = await Model.findById(req.params.id);
	if (!contact) return res.render('error', { error: {code: '404',message: 'Not found'} });
	res.render('contato', {
		contato: contact 
	});
};

exports.update = async (req, res) => {

	try{
		if (!req.params.id) return res.render('error', { error: {code: '400',message: 'Bad Request'} });
		const contatoModel = new Model(req.body);
		await contatoModel.update(req.params.id);

		if(contatoModel.errors.length > 0){
			req.flash('errors', contatoModel.errors);
			req.session.save(() => res.redirect('back'));
			return;
		};

		req.flash('success', 'Contato Editado com sucesso!');
		req.session.save(() => res.redirect(`/`));
		return;
	}catch(error){
		res.render('error', { error });
	}
	
};

exports.delete = async (req, res) => {
	if(!req.params.id) return res.render('error', { error: {code: '400',message: 'Bad Request'} });

	const contact = await Model.delete(req.params.id);
	if (!contact) return res.render('error', { error: {code: '404',message: 'Not found'} });

	req.flash('success', 'Contato apagado com sucesso!');
	req.session.save(() => res.redirect('back'));
	return;	
};