const Model = require('../models/ContatoModel');

exports.index = (req, res) => {
	res.render('contato', { contato: {} });
	console.log(req.flash['errors']);
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
		req.session.save(() => res.redirect(`/contato/${contatoModel.contato._id}`));
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