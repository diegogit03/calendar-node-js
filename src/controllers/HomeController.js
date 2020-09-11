const Model = require('../models/ContatoModel');

exports.index = async (req, res) => {
	const contacts = await Model.findAll();
  	res.render('index', { contatos: contacts });
};